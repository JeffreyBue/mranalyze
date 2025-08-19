const fs = require('fs').promises;
const path = require('path');
const LightContentAnalyzer = require('./content_analyzer_light');
const AnalysisFolderFinder = require('../utilities/folder_finder');

class LightContentAnalysisRunner {
    constructor(options = {}) {
        this.options = {
            baseDir: './scraped_sites', // Will be updated dynamically
            outputDir: './reports/analysis_cache',
            batchSize: 15,              // Process 15 pages at a time (light is faster)
            specificFolder: null,       // Can be set to use a specific analysis folder
            ...options
        };

        this.contentAnalyzer = new LightContentAnalyzer();
        this.analysisDir = null;
    }

    async initialize() {
        // First check if we have a session folder already set in the AnalysisFolderFinder
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
        
        console.log('📝 Light Content Analysis Runner Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Using scraped data from: ${this.options.baseDir}`);
        console.log(`📁 Output directory: ${this.options.outputDir}`);
        console.log(`📦 Batch Size: ${this.options.batchSize} pages`);
    }

    async findScrapedFolders() {
        const entries = await fs.readdir(this.options.baseDir, { withFileTypes: true });
        const folders = entries
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name)
            .sort();
        
        console.log(`📁 Found ${folders.length} scraped folders:`, folders);
        return folders;
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
            console.log(`    📖 Page ${pageIndex}: Light content analysis...`);
            
            let page1 = await this.loadPageData(folder1, pageIndex);
            let page2 = await this.loadPageData(folder2, pageIndex);
            
            const contentResult = await this.contentAnalyzer.compare(page1, page2);
            
            const result = {
                comparison: `${folder1}_vs_${folder2}`,
                pageIndex,
                page1: { folder: folder1, pageId: page1.pageId, url: page1.content.url },
                page2: { folder: folder2, pageId: page2.pageId, url: page2.content.url },
                content: contentResult,
                timestamp: new Date().toISOString()
            };

            // Save individual result
            const filename = `${folder1}_vs_${folder2}_page_${String(pageIndex).padStart(3, '0')}_content.json`;
            await fs.writeFile(
                path.join(this.options.outputDir, 'content', filename),
                JSON.stringify(result, null, 2)
            );

            // Clear memory aggressively
            delete page1.content;
            delete page2.content;
            page1 = null;
            page2 = null;
            
            // Force garbage collection
            if (global.gc) {
                global.gc();
            }
            
            return result;
            
        } catch (error) {
            console.warn(`    ⚠️ Content analysis failed for page ${pageIndex}: ${error.message}`);
            return null;
        }
    }

    async runContentAnalysis() {
        const folders = await this.findScrapedFolders();
        
        if (folders.length < 2) {
            throw new Error('Need at least 2 scraped folders to compare');
        }
        
        console.log(`📝 Running LIGHT content analysis for ${folders.length} sites\n`);
        
        const allResults = [];
        
        // Compare each folder with every other folder
        for (let i = 0; i < folders.length; i++) {
            for (let j = i + 1; j < folders.length; j++) {
                const folder1 = folders[i];
                const folder2 = folders[j];
                
                console.log(`📊 Content Analysis: ${folder1} vs ${folder2}`);
                
                // Get page counts
                const folder1Pages = await fs.readdir(path.join(this.options.baseDir, folder1));
                const folder2Pages = await fs.readdir(path.join(this.options.baseDir, folder2));
                
                const pageCount1 = folder1Pages.filter(f => f.match(/^\d{3}_/)).length;
                const pageCount2 = folder2Pages.filter(f => f.match(/^\d{3}_/)).length;
                const maxPages = Math.min(pageCount1, pageCount2);
                
                console.log(`  📄 Processing ${maxPages} pages (1 at a time)...`);
                
                const pairResults = [];
                
                // Process ONE page at a time
                for (let pageIndex = 1; pageIndex <= maxPages; pageIndex++) {
                    const result = await this.analyzeContentPair(folder1, folder2, pageIndex);
                    if (result) {
                        pairResults.push(result);
                    }
                    
                    // Longer delay between pages for memory recovery
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                
                // Calculate averages
                const avgScore = pairResults.length > 0 ? 
                    pairResults.reduce((sum, r) => sum + r.content.overallScore, 0) / pairResults.length : 0;
                
                // Save aggregated results for this pair
                const aggregated = {
                    comparison: `${folder1}_vs_${folder2}`,
                    analysisType: 'content_light',
                    totalPages: pairResults.length,
                    avgScore: avgScore,
                    results: pairResults,
                    timestamp: new Date().toISOString()
                };
                
                await fs.writeFile(
                    path.join(this.options.outputDir, `${folder1}_vs_${folder2}_content_summary.json`),
                    JSON.stringify(aggregated, null, 2)
                );
                
                allResults.push(aggregated);
                console.log(`  ✅ Content analysis complete: ${(avgScore * 100).toFixed(1)}% similarity\n`);
            }
        }
        
        // Save master content summary
        const masterSummary = {
            analysisType: 'content_light',
            timestamp: new Date().toISOString(),
            totalComparisons: allResults.length,
            results: allResults.map(r => ({
                comparison: r.comparison,
                avgScore: r.avgScore,
                totalPages: r.totalPages
            })).sort((a, b) => b.avgScore - a.avgScore)
        };
        
        await fs.writeFile(
            path.join(this.options.outputDir, 'content_master_summary.json'),
            JSON.stringify(masterSummary, null, 2)
        );
        
        console.log('📝 LIGHT CONTENT ANALYSIS COMPLETE!');
        console.log(`   📁 Cache Directory: ${this.options.outputDir}`);
        console.log(`   📊 Comparisons: ${masterSummary.totalComparisons}`);
        console.log('   🏆 Top Content Similarities:');
        
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
    
    const runner = new LightContentAnalysisRunner({
        batchSize: parseInt(process.argv.find(arg => arg.startsWith('--batch='))?.split('=')[1]) || 15,
        specificFolder: specificFolder
    });
    
    try {
        await runner.initialize();
        await runner.runContentAnalysis();
        console.log('\n🎉 Step 2 Light (Content Analysis) Complete!');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = LightContentAnalysisRunner;