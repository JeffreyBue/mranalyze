const fs = require('fs').promises;
const path = require('path');
const VisualSimilarityAnalyzer = require('./visual_analyzer');
const AnalysisFolderFinder = require('../utilities/folder_finder');

class VisualAnalysisRunner {
    constructor(options = {}) {
        this.options = {
            baseDir: './scraped_sites', // Will be updated dynamically
            outputDir: './reports/analysis_cache',
            enableScreenshots: false, // Default off for memory safety
            batchSize: 5, // Process 5 pages at a time
            specificFolder: null, // Can be set to use a specific analysis folder
            ...options
        };

        this.visualAnalyzer = new VisualSimilarityAnalyzer(this.options);
        this.analysisDir = null;
    }

    async initialize() {
        // First check if we have a session folder already set in the AnalysisFolderFinder
        if (AnalysisFolderFinder.sessionFolderName) {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
            console.log(`🎨 Using pipeline session folder: ${AnalysisFolderFinder.sessionFolderName}`);
        }
        // Otherwise check if a specific folder was requested
        else if (this.options.specificFolder) {
            this.analysisDir = path.join('.', this.options.specificFolder);
            console.log(`🎨 Using specified analysis folder: ${this.options.specificFolder}`);
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
        await fs.mkdir(path.join(this.options.outputDir, 'visual'), { recursive: true });
        
        console.log('🎨 Visual Analysis Runner Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Using scraped data from: ${this.options.baseDir}`);
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
            visual: JSON.parse(await fs.readFile(path.join(pagePath, 'visual.json'), 'utf8')),
            screenshotPath: path.join(pagePath, 'screenshot.png')
        };
    }

    async analyzeVisualPair(folder1, folder2, pageIndex) {
        try {
            console.log(`    🔍 Page ${pageIndex}: Visual analysis...`);
            
            const page1 = await this.loadPageData(folder1, pageIndex);
            const page2 = await this.loadPageData(folder2, pageIndex);
            
            const visualResult = await this.visualAnalyzer.compare(page1, page2);
            
            const result = {
                comparison: `${folder1}_vs_${folder2}`,
                pageIndex,
                page1: { folder: folder1, pageId: page1.pageId },
                page2: { folder: folder2, pageId: page2.pageId },
                visual: visualResult,
                timestamp: new Date().toISOString()
            };

            // Save individual result
            const filename = `${folder1}_vs_${folder2}_page_${String(pageIndex).padStart(3, '0')}_visual.json`;
            await fs.writeFile(
                path.join(this.options.outputDir, 'visual', filename),
                JSON.stringify(result, null, 2)
            );

            // Clear memory
            delete page1.visual;
            delete page2.visual;
            
            return result;
            
        } catch (error) {
            console.warn(`    ⚠️ Visual analysis failed for page ${pageIndex}: ${error.message}`);
            return null;
        }
    }

    async runVisualAnalysis() {
        const folders = await this.findScrapedFolders();
        
        if (folders.length < 2) {
            throw new Error('Need at least 2 scraped folders to compare');
        }
        
        console.log(`🎨 Running visual analysis for ${folders.length} sites\n`);
        
        const allResults = [];
        
        // Compare each folder with every other folder
        for (let i = 0; i < folders.length; i++) {
            for (let j = i + 1; j < folders.length; j++) {
                const folder1 = folders[i];
                const folder2 = folders[j];
                
                console.log(`📊 Visual Analysis: ${folder1} vs ${folder2}`);
                
                // Get page counts
                const folder1Pages = await fs.readdir(path.join(this.options.baseDir, folder1));
                const folder2Pages = await fs.readdir(path.join(this.options.baseDir, folder2));
                
                const pageCount1 = folder1Pages.filter(f => f.match(/^\d{3}_/)).length;
                const pageCount2 = folder2Pages.filter(f => f.match(/^\d{3}_/)).length;
                const maxPages = Math.min(pageCount1, pageCount2);
                
                console.log(`  📄 Processing ${maxPages} pages...`);
                
                const pairResults = [];
                
                // Process in batches to manage memory
                for (let startPage = 1; startPage <= maxPages; startPage += this.options.batchSize) {
                    const endPage = Math.min(startPage + this.options.batchSize - 1, maxPages);
                    console.log(`  📦 Batch: pages ${startPage}-${endPage}`);
                    
                    const batchPromises = [];
                    for (let pageIndex = startPage; pageIndex <= endPage; pageIndex++) {
                        batchPromises.push(this.analyzeVisualPair(folder1, folder2, pageIndex));
                    }
                    
                    const batchResults = await Promise.allSettled(batchPromises);
                    batchResults.forEach(result => {
                        if (result.status === 'fulfilled' && result.value) {
                            pairResults.push(result.value);
                        }
                    });
                    
                    // Force garbage collection between batches
                    if (global.gc) {
                        global.gc();
                    }
                    
                    // Small delay to help with memory management
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                // Save aggregated results for this pair
                const aggregated = {
                    comparison: `${folder1}_vs_${folder2}`,
                    analysisType: 'visual',
                    totalPages: pairResults.length,
                    avgScore: pairResults.length > 0 ? 
                        pairResults.reduce((sum, r) => sum + r.visual.overallScore, 0) / pairResults.length : 0,
                    results: pairResults,
                    timestamp: new Date().toISOString()
                };
                
                await fs.writeFile(
                    path.join(this.options.outputDir, `${folder1}_vs_${folder2}_visual_summary.json`),
                    JSON.stringify(aggregated, null, 2)
                );
                
                allResults.push(aggregated);
                console.log(`  ✅ Visual analysis complete: ${(aggregated.avgScore * 100).toFixed(1)}% similarity\n`);
            }
        }
        
        // Save master visual summary
        const masterSummary = {
            analysisType: 'visual',
            timestamp: new Date().toISOString(),
            totalComparisons: allResults.length,
            results: allResults.map(r => ({
                comparison: r.comparison,
                avgScore: r.avgScore,
                totalPages: r.totalPages
            })).sort((a, b) => b.avgScore - a.avgScore)
        };
        
        await fs.writeFile(
            path.join(this.options.outputDir, 'visual_master_summary.json'),
            JSON.stringify(masterSummary, null, 2)
        );
        
        console.log('🎨 VISUAL ANALYSIS COMPLETE!');
        console.log(`   📁 Cache Directory: ${this.options.outputDir}`);
        console.log(`   📊 Comparisons: ${masterSummary.totalComparisons}`);
        console.log('   🏆 Top Visual Similarities:');
        
        masterSummary.results.slice(0, 3).forEach(r => {
            console.log(`      ${r.comparison}: ${(r.avgScore * 100).toFixed(1)}%`);
        });
        
        return allResults;
    }
}

// Main execution
async function main() {
    // Parse command line arguments
    const specificFolder = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1];
    
    const runner = new VisualAnalysisRunner({
        enableScreenshots: process.argv.includes('--screenshots'),
        batchSize: parseInt(process.argv.find(arg => arg.startsWith('--batch='))?.split('=')[1]) || 5,
        specificFolder: specificFolder
    });
    
    try {
        await runner.initialize();
        await runner.runVisualAnalysis();
        console.log('\n🎉 Step 1 (Visual Analysis) Complete!');
        console.log('Next: Run Step 2 (Content Analysis)');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = VisualAnalysisRunner;