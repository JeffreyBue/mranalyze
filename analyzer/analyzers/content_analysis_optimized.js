const fs = require('fs').promises;
const path = require('path');
const OptimizedContentAnalyzer = require('./content_analyzer_optimized');
const AnalysisFolderFinder = require('../utilities/folder_finder');
const { url } = require('inspector');

class OptimizedContentAnalysisRunner {
    constructor(options = {}) {
        this.options = {
            baseDir: './scraped_sites', // Will be updated dynamically
            outputDir: './reports/analysis_cache',
            batchSize: 10,              // Process 10 pages at a time
            memoryCheckInterval: 5,     // Check memory every 5 pages
            memoryThreshold: 4096,      // 4GB warning threshold
            enableDeepAnalysis: false,  // Can be enabled for sample analysis
            specificFolder: null,       // Can be set to use a specific analysis folder
            ...options
        };

        this.contentAnalyzer = new OptimizedContentAnalyzer({
            enableLevenshtein: false,
            enableDeepAnalysis: this.options.enableDeepAnalysis
        });

        // Performance tracking
        this.stats = {
            processedPages: 0,
            totalProcessingTime: 0,
            averagePageTime: 0,
            startTime: null
        };
        
        this.analysisDir = null;
    }

    async initialize() {
        // First check if we have a session folder already set in the AnalysisFolderFinder
        // This ensures consistency across pipeline steps
        if (AnalysisFolderFinder.sessionFolderName) {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
            console.log(`📝 Using pipeline session folder: ${AnalysisFolderFinder.sessionFolderName}`);
        }
        // Otherwise check if a specific folder was requested
        else if (this.options.specificFolder) {
            this.analysisDir = path.join('.', this.options.specificFolder);
            console.log(`📝 Using specified analysis folder: ${this.options.specificFolder}`);
        }
        // Otherwise find the latest analysis folder
        else {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
        }
        
        // Update baseDir to point to scraped_sites inside the analysis directory
        this.options.baseDir = path.join(this.analysisDir, 'scraped_sites');
        
        // Create output directory in the analysis folder
        this.options.outputDir = path.join(this.analysisDir, 'reports/analysis_cache');
        
        await fs.mkdir(this.options.outputDir, { recursive: true });
        await fs.mkdir(path.join(this.options.outputDir, 'content'), { recursive: true });
        
        console.log('📝 Optimized Content Analysis Runner Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Using scraped data from: ${this.options.baseDir}`);
        console.log(`📁 Output directory: ${this.options.outputDir}`);
        console.log(`💾 Memory Threshold: ${this.options.memoryThreshold}MB`);
        console.log(`📦 Batch Size: ${this.options.batchSize} pages`);
        console.log(`🎯 Deep Analysis: ${this.options.enableDeepAnalysis ? 'ENABLED' : 'DISABLED'}`);
        
        // Check if the directory exists and has scraped sites
        try {
            const scraped = await fs.readdir(this.options.baseDir);
            const hasScrapedSites = scraped.length > 0;
            if (!hasScrapedSites) {
                console.warn(`⚠️ Warning: No scraped sites found in ${this.options.baseDir}`);
            } else {
                console.log(`✅ Found ${scraped.length} directories in scraped_sites folder`);
            }
        } catch (err) {
            console.error(`❌ Error accessing scraped sites directory: ${err.message}`);
        }
        
        this.stats.startTime = Date.now();
    }

    async findScrapedFolders() {
        const result = await AnalysisFolderFinder.findScrapedFolders(this.analysisDir);
        return result.folders;
    }

    async loadPageData(folderName, pageIndex) {
        const pageId = String(pageIndex).padStart(3, '0');
        const pageFolders = await fs.readdir(path.join(this.options.baseDir, folderName));
        const targetFolder = pageFolders.find(folder => folder.startsWith(pageId + '_'));
        
        if (!targetFolder) {
            throw new Error(`Page ${pageId} not found in ${folderName}`);
        }

        const pagePath = path.join(this.options.baseDir, folderName, targetFolder);
        
        return {
            folderName,
            pageIndex,
            pageId: targetFolder,
            path: pagePath,
            content: JSON.parse(await fs.readFile(path.join(pagePath, 'content.json'), 'utf8'))
        };
    }

    async analyzeContentPair(folder1, folder2, pageIndex) {
        try {
            const pageStartTime = Date.now();
            console.log(`    📖 Page ${pageIndex}: Analyzing content...`);
            
            const page1 = await this.loadPageData(folder1, pageIndex);
            const page2 = await this.loadPageData(folder2, pageIndex);
            
            const contentResult = await this.contentAnalyzer.compare(page1, page2);
            
            const pageTime = Date.now() - pageStartTime;
            this.updateStats(pageTime);
            
            const result = {
                comparison: `${folder1}_vs_${folder2}`,
                pageIndex,
                page1: { folder: folder1, pageId: page1.pageId, url: page1.content.url },
                page2: { folder: folder2, pageId: page2.pageId, url: page2.content.url },
                content: contentResult,
                performance: {
                    analysisTimeMs: pageTime,
                    memoryUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
                },
                timestamp: new Date().toISOString()
            };

            // Save individual result
            const filename = `${folder1}_vs_${folder2}_page_${String(pageIndex).padStart(3, '0')}_content.json`;
            await fs.writeFile(
                path.join(this.options.outputDir, 'content', filename),
                JSON.stringify(result, null, 2)
            );

            // Clear page data immediately
            page1.content = null;
            page2.content = null;
            
            console.log(`      ✅ Done in ${pageTime}ms (Overall: ${(contentResult.overallScore * 100).toFixed(1)}%)`);
            
            return result;
            
        } catch (error) {
            console.warn(`    ⚠️ Content analysis failed for page ${pageIndex}: ${error.message}`);
            return null;
        }
    }

    updateStats(pageTime) {
        this.stats.processedPages++;
        this.stats.totalProcessingTime += pageTime;
        this.stats.averagePageTime = this.stats.totalProcessingTime / this.stats.processedPages;
    }

    checkMemoryUsage() {
        const memUsage = process.memoryUsage();
        const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
        
        if (memUsedMB > this.options.memoryThreshold) {
            console.warn(`  ⚠️ High memory usage: ${memUsedMB}MB`);
            return true;
        }
        
        return false;
    }

    async runContentAnalysis() {
        const folders = await this.findScrapedFolders();
        
        if (folders.length < 2) {
            throw new Error('Need at least 2 scraped folders to compare');
        }
        
        console.log(`📝 Running optimized content analysis for ${folders.length} sites\n`);
        
        const allResults = [];
        
        // Compare each folder with every other folder
        for (let i = 0; i < folders.length; i++) {
            for (let j = i + 1; j < folders.length; j++) {
                const folder1 = folders[i];
                const folder2 = folders[j];
                
                console.log(`📊 Content Analysis: ${folder1} vs ${folder2}`);
                
                // Clear analyzer cache before each comparison
                this.contentAnalyzer.clearCache();
                
                // Get page counts
                const folder1Pages = await fs.readdir(path.join(this.options.baseDir, folder1));
                const folder2Pages = await fs.readdir(path.join(this.options.baseDir, folder2));
                
                const pageCount1 = folder1Pages.filter(f => f.match(/^\d{3}_/)).length;
                const pageCount2 = folder2Pages.filter(f => f.match(/^\d{3}_/)).length;
                const maxPages = Math.min(pageCount1, pageCount2);
                
                console.log(`  📄 Processing ${maxPages} pages...`);
                
                const pairResults = [];
                
                // Process in batches
                for (let startPage = 1; startPage <= maxPages; startPage += this.options.batchSize) {
                    const endPage = Math.min(startPage + this.options.batchSize - 1, maxPages);
                    console.log(`  📦 Batch: pages ${startPage}-${endPage}`);
                    
                    // Process pages in batch
                    for (let pageIndex = startPage; pageIndex <= endPage; pageIndex++) {
                        const result = await this.analyzeContentPair(folder1, folder2, pageIndex);
                        if (result) {
                            pairResults.push(result);
                        }
                        
                        // Memory check
                        if (pageIndex % this.options.memoryCheckInterval === 0) {
                            if (this.checkMemoryUsage()) {
                                this.contentAnalyzer.clearCache();
                                if (global.gc) global.gc();
                                await new Promise(resolve => setTimeout(resolve, 100));
                            }
                        }
                    }
                    
                    // Brief pause between batches
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                // Calculate summary metrics
                const summary = this.calculateSummaryMetrics(pairResults);
                
                // Save aggregated results
                const aggregated = {
                    comparison: `${folder1}_vs_${folder2}`,
                    analysisType: 'content_optimized',
                    totalPages: pairResults.length,
                    avgScore: summary.avgScore,
                    metrics: summary.metrics,
                    performance: summary.performance,
                    timestamp: new Date().toISOString()
                };
                
                await fs.writeFile(
                    path.join(this.options.outputDir, `${folder1}_vs_${folder2}_content_summary.json`),
                    JSON.stringify(aggregated, null, 2)
                );
                
                allResults.push(aggregated);
                
                console.log(`  ✅ Content analysis complete: ${(summary.avgScore * 100).toFixed(1)}% similarity`);
                console.log(`     📊 Key Metrics: Jaccard: ${(summary.metrics.jaccard * 100).toFixed(1)}% | Cosine: ${(summary.metrics.cosine * 100).toFixed(1)}% | Fingerprint: ${(summary.metrics.fingerprint * 100).toFixed(1)}%`);
                console.log(`     ⚡ Performance: ${Math.round(summary.performance.avgPageTime)}ms/page\n`);
            }
        }
        
        // Save master summary
        await this.saveMasterSummary(allResults);
        
        const totalTime = Date.now() - this.stats.startTime;
        console.log('📝 OPTIMIZED CONTENT ANALYSIS COMPLETE!');
        console.log(`   ⏱️ Total Time: ${Math.round(totalTime / 1000)}s`);
        console.log(`   📊 Pages Processed: ${this.stats.processedPages}`);
        console.log(`   ⚡ Average Speed: ${Math.round(this.stats.averagePageTime)}ms/page`);
        
        return allResults;
    }

    calculateSummaryMetrics(results) {
        if (results.length === 0) {
            return {
                avgScore: 0,
                metrics: {},
                performance: { avgPageTime: 0 }
            };
        }

        const metrics = {
            overall: 0,
            jaccard: 0,
            cosine: 0,
            fingerprint: 0,
            semantic: 0,
            topic: 0
        };

        let totalPageTime = 0;

        results.forEach(result => {
            const content = result.content;
            metrics.overall += content.overallScore || 0;
            metrics.jaccard += content.jaccard?.score || 0;
            metrics.cosine += content.cosine?.score || 0;
            metrics.fingerprint += content.contentFingerprint?.score || 0;
            metrics.semantic += content.semantic?.score || 0;
            metrics.topic += content.topicSimilarity?.score || 0;
            
            totalPageTime += result.performance?.analysisTimeMs || 0;
        });

        const count = results.length;
        Object.keys(metrics).forEach(key => {
            metrics[key] = metrics[key] / count;
        });

        return {
            avgScore: metrics.overall,
            metrics: {
                jaccard: metrics.jaccard,
                cosine: metrics.cosine,
                fingerprint: metrics.fingerprint,
                semantic: metrics.semantic,
                topic: metrics.topic
            },
            performance: {
                avgPageTime: totalPageTime / count,
                totalPages: count
            }
        };
    }

    async saveMasterSummary(allResults) {
        const masterSummary = {
            analysisType: 'content_optimized',
            timestamp: new Date().toISOString(),
            totalComparisons: allResults.length,
            globalStats: {
                totalPagesProcessed: this.stats.processedPages,
                totalProcessingTime: this.stats.totalProcessingTime,
                averagePageTime: this.stats.averagePageTime,
                processingSpeed: this.stats.processedPages / (this.stats.totalProcessingTime / 1000) // pages per second
            },
            results: allResults.map(r => ({
                comparison: r.comparison,
                avgScore: r.avgScore,
                metrics: r.metrics,
                totalPages: r.totalPages,
                performance: r.performance
            })).sort((a, b) => b.avgScore - a.avgScore)
        };
        
        await fs.writeFile(
            path.join(this.options.outputDir, 'content_master_summary.json'),
            JSON.stringify(masterSummary, null, 2)
        );
        
        console.log('📁 Cache Directory:', this.options.outputDir);
        console.log('🏆 Top Content Similarities:');
        
        masterSummary.results.slice(0, 3).forEach(r => {
            console.log(`   ${r.comparison}: ${(r.avgScore * 100).toFixed(1)}%`);
        });
    }
}

// Main execution
async function main() {
    // Parse command line arguments
    const specificFolder = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1];
    
    const runner = new OptimizedContentAnalysisRunner({
        batchSize: parseInt(process.argv.find(arg => arg.startsWith('--batch='))?.split('=')[1]) || 10,
        enableDeepAnalysis: process.argv.includes('--deep'),
        specificFolder: specificFolder
    });
    
    try {
        await runner.initialize();
        await runner.runContentAnalysis();
        console.log('\n🎉 Step 2 (Optimized Content Analysis) Complete!');
        console.log('Next: Run Step 3 (Technical Analysis)');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = OptimizedContentAnalysisRunner;