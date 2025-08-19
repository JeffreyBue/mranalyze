const fs = require('fs').promises;
const path = require('path');
const TechnicalAnalyzer = require('./technical_analyzer');
const AnalysisFolderFinder = require('../utilities/folder_finder');
const { url } = require('inspector');

class TechnicalAnalysisRunner {
    constructor(options = {}) {
        this.options = {
            baseDir: './scraped_sites', // Will be updated dynamically
            outputDir: './reports/analysis_cache',
            batchSize: 10,
            specificFolder: null, // Can be set to use a specific analysis folder
            ...options
        };

        this.technicalAnalyzer = new TechnicalAnalyzer();
        this.analysisDir = null;
    }

    async initialize() {
        // First check if we have a session folder already set in the AnalysisFolderFinder
        if (AnalysisFolderFinder.sessionFolderName) {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
            console.log(`⚙️ Using pipeline session folder: ${AnalysisFolderFinder.sessionFolderName}`);
        }
        // Otherwise check if a specific folder was requested
        else if (this.options.specificFolder) {
            this.analysisDir = path.join('.', this.options.specificFolder);
            console.log(`⚙️ Using specified analysis folder: ${this.options.specificFolder}`);
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
        await fs.mkdir(path.join(this.options.outputDir, 'technical'), { recursive: true });
        
        console.log('⚙️ Technical Analysis Runner Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Using scraped data from: ${this.options.baseDir}`);
        console.log(`📁 Output directory: ${this.options.outputDir}`);
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
            technical: JSON.parse(await fs.readFile(path.join(pagePath, 'technical.json'), 'utf8'))
        };
    }

async analyzeTechnicalPair(folder1, folder2, pageIndex) {
        let page1 = null;
        let page2 = null;
        let tech1 = null;
        let tech2 = null;
        let pagePath1 = null;
        let pagePath2 = null;
        let page1Url = null;
        let page2Url = null;
        
        try {
            console.log(`    🔧 Page ${pageIndex}: Technical analysis...`);
            
            // 🧹 Load pages one at a time and extract only what we need
            page1 = await this.loadPageData(folder1, pageIndex);
            tech1 = page1.technical; // Extract technical data
            pagePath1 = page1.pageId; // Save path for later use
            page1Url = page1.technical.url; // Extract URL for later use
            page1.technical = null;  // Clear immediately
            page1 = null;           // Clear page object
            
            page2 = await this.loadPageData(folder2, pageIndex);
            tech2 = page2.technical; // Extract technical data
            pagePath2 = page2.pageId; // Save path for later use
            page2Url = page2.technical.url; // Extract URL for later use
            page2.technical = null;  // Clear immediately
            page2 = null;           // Clear page object
            
            // 🧹 Create minimal page objects for comparison
            const minimalPage1 = { technical: tech1 };
            const minimalPage2 = { technical: tech2 };
            
            const technicalResult = await this.technicalAnalyzer.compare(minimalPage1, minimalPage2);
            
            // 🧹 Clear technical data immediately after comparison
            tech1 = null;
            tech2 = null;
            minimalPage1.technical = null;
            minimalPage2.technical = null;
            
            // 🧹 Create ultra-minimal result (only essential data)
            const result = {
                comparison: `${folder1}_vs_${folder2}`,
                pageIndex,
                page1: { folder: folder1, pageId: pagePath1, url: page1Url },
                page2: { folder: folder2, pageId: pagePath2, url: page2Url },
                technical: {
                    overallScore: technicalResult.overallScore,
                    htmlStructure: { score: technicalResult.htmlStructure.score },
                    metaTags: { score: technicalResult.metaTags.score },
                    frameworks: { score: technicalResult.frameworks.score }
                    // 🧹 Remove all detailed data to save memory
                },
                timestamp: new Date().toISOString()
            };

            // 🧹 Save individual result to disk immediately and clear from memory
            const filename = `${folder1}_vs_${folder2}_page_${String(pageIndex).padStart(3, '0')}_technical.json`;
            await fs.writeFile(
                path.join(this.options.outputDir, 'technical', filename),
                JSON.stringify({
                    ...result,
                    technical: technicalResult // Save full details to disk
                }, null, 2)
            );

            // 🧹 Clear the full technical result from memory (keep only minimal version)
            technicalResult.htmlStructure = null;
            technicalResult.metaTags = null;
            technicalResult.schemaMarkup = null;
            technicalResult.frameworks = null;
            technicalResult.resources = null;
            technicalResult.performance = null;
            technicalResult.seoTechnical = null;
            page1Url = null;
            page2Url = null;
            pagePath1 = null;
            pagePath2 = null;
            
            // 🧹 Force garbage collection every 2 pages
            if (global.gc && pageIndex % 2 === 0) {
                global.gc();
            }
            
            return result;
            
        } catch (error) {
            console.warn(`    ⚠️ Technical analysis failed for page ${pageIndex}: ${error.message}`);
            
            // 🧹 Nuclear cleanup on error
            if (page1) {
                if (page1.technical) page1.technical = null;
                page1 = null;
            }
            if (page2) {
                if (page2.technical) page2.technical = null;
                page2 = null;
            }
            if (tech1) tech1 = null;
            if (tech2) tech2 = null;
            
            // Force GC on error
            if (global.gc) global.gc();
            
            return null;
        }
    }
    
    async runTechnicalAnalysis() {
        const folders = await this.findScrapedFolders();
        
        if (folders.length < 2) {
            throw new Error('Need at least 2 scraped folders to compare');
        }
        
        console.log(`⚙️ Running technical analysis for ${folders.length} sites\n`);
        
        const allResults = [];
        
        // Compare each folder with every other folder
        for (let i = 0; i < folders.length; i++) {
            for (let j = i + 1; j < folders.length; j++) {
                const folder1 = folders[i];
                const folder2 = folders[j];
                
                console.log(`📊 Technical Analysis: ${folder1} vs ${folder2}`);
                
                // 🧹 NUCLEAR CLEANUP: Clear everything before starting
                this.clearAnalysisMemory();
                
                // 🧹 Force aggressive GC before starting each site comparison
                if (global.gc) {
                    for (let gcRound = 0; gcRound < 5; gcRound++) {
                        global.gc();
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }
                
                // Get page counts
                let folder1Pages = await fs.readdir(path.join(this.options.baseDir, folder1));
                let folder2Pages = await fs.readdir(path.join(this.options.baseDir, folder2));
                
                const pageCount1 = folder1Pages.filter(f => f.match(/^\d{3}_/)).length;
                const pageCount2 = folder2Pages.filter(f => f.match(/^\d{3}_/)).length;
                const maxPages = Math.min(pageCount1, pageCount2);
                
                // 🧹 Clear page arrays immediately after use
                folder1Pages = null;
                folder2Pages = null;
                
                console.log(`  📄 Processing ${maxPages} pages...`);
                
                let pairResults = [];
                
                // 🔥 ULTRA-SMALL BATCHES: Process 2 pages at a time instead of 8
                const ultraSmallBatch = 2;
                
                for (let startPage = 1; startPage <= maxPages; startPage += ultraSmallBatch) {
                    const endPage = Math.min(startPage + ultraSmallBatch - 1, maxPages);
                    console.log(`  📦 Micro-batch: pages ${startPage}-${endPage}`);
                    
                    // 🧹 Process pages ONE BY ONE to minimize memory usage
                    for (let pageIndex = startPage; pageIndex <= endPage; pageIndex++) {
                        const result = await this.analyzeTechnicalPair(folder1, folder2, pageIndex);
                        
                        if (result) {
                            // 🧹 Only keep the absolute minimum data
                            const ultraLightResult = {
                                pageIndex: result.pageIndex,
                                overallScore: result.technical.overallScore,
                                htmlScore: result.technical.htmlStructure.score,
                                metaScore: result.technical.metaTags.score,
                                frameworkScore: result.technical.frameworks.score
                            };
                            pairResults.push(ultraLightResult);
                        }
                        
                        // 🧹 Clear result immediately
                        if (result) {
                            result.technical = null;
                            result.page1 = null;
                            result.page2 = null;
                        }
                        
                        // 🧹 Force GC after every single page
                        if (global.gc) {
                            global.gc();
                        }
                    }
                    
                    // 🧹 Extra cleanup between micro-batches
                    if (global.gc) {
                        global.gc();
                        await new Promise(resolve => setTimeout(resolve, 200));
                        global.gc();
                    }
                    
                    // Memory check after each micro-batch
                    const memUsage = process.memoryUsage();
                    const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
                    console.log(`    💾 After batch: ${memUsedMB}MB used`);
                    
                    // If memory is getting high, be extra aggressive
                    if (memUsedMB > 3000) { // 3GB warning for default 4GB limit
                        console.warn(`    🚨 HIGH MEMORY: ${memUsedMB}MB - Extra cleanup!`);
                        
                        // Nuclear cleanup
                        this.clearAnalysisMemory();
                        
                        // Multiple aggressive GCs
                        for (let gcRound = 0; gcRound < 10; gcRound++) {
                            if (global.gc) global.gc();
                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                        
                        // Check if it helped
                        const afterCleanup = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
                        console.log(`    🧹 After cleanup: ${afterCleanup}MB used`);
                    }
                }
                
                // Calculate ultra-lightweight scores
                const avgScores = this.calculateUltraLightScores(pairResults);
                
                // 🧹 Create minimal aggregated result
                const aggregated = {
                    comparison: `${folder1}_vs_${folder2}`,
                    analysisType: 'technical',
                    totalPages: pairResults.length,
                    avgScore: avgScores.overall,
                    detailedScores: avgScores,
                    timestamp: new Date().toISOString()
                    // 🧹 NO detailed results array - save space!
                };
                
                // Save only the summary
                await fs.writeFile(
                    path.join(this.options.outputDir, `${folder1}_vs_${folder2}_technical_summary.json`),
                    JSON.stringify(aggregated, null, 2)
                );
                
                // 🧹 NUCLEAR CLEANUP AFTER EACH SITE COMPARISON
                console.log(`  🧹 NUCLEAR cleanup after ${folder1} vs ${folder2}...`);
                
                // Add ultra-light result to master list
                const ultraLightResult = {
                    comparison: aggregated.comparison,
                    avgScore: aggregated.avgScore,
                    detailedScores: aggregated.detailedScores,
                    totalPages: aggregated.totalPages
                };
                allResults.push(ultraLightResult);
                
                // 🧹 DESTROY everything
                aggregated.detailedScores = null;
                pairResults.length = 0;
                pairResults = null;
                
                // 🧹 Clear analyzer internal state
                this.technicalAnalyzer.clearCache();
                this.clearAnalysisMemory();
                
                // 🧹 MASSIVE garbage collection session
                if (global.gc) {
                    for (let gcRound = 0; gcRound < 15; gcRound++) {
                        global.gc();
                        if (gcRound % 3 === 0) {
                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                    }
                }
                
                // Final memory check
                const finalMemUsage = process.memoryUsage();
                const finalMemUsedMB = Math.round(finalMemUsage.heapUsed / 1024 / 1024);
                const finalMemTotalMB = Math.round(finalMemUsage.heapTotal / 1024 / 1024);
                console.log(`  💾 Final memory: ${finalMemUsedMB}MB used, ${finalMemTotalMB}MB allocated`);
                
                // Emergency brake if memory is still too high
                if (finalMemUsedMB > 3500) {
                    console.error(`  🚨 MEMORY CRITICAL: ${finalMemUsedMB}MB - Consider using --max-old-space-size=8192`);
                }
                
                // Longer recovery pause
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                console.log(`  ✅ Technical analysis complete: ${(aggregated.avgScore * 100).toFixed(1)}% similarity`);
                console.log(`     🔧 Breakdown: HTML: ${(avgScores.htmlStructure * 100).toFixed(1)}% | Frameworks: ${(avgScores.frameworks * 100).toFixed(1)}% | Meta: ${(avgScores.metaTags * 100).toFixed(1)}%\n`);
            }
        }
        
        // Save ultra-light master summary
        const masterSummary = {
            analysisType: 'technical',
            timestamp: new Date().toISOString(),
            totalComparisons: allResults.length,
            results: allResults.sort((a, b) => b.avgScore - a.avgScore)
        };
        
        await fs.writeFile(
            path.join(this.options.outputDir, 'technical_master_summary.json'),
            JSON.stringify(masterSummary, null, 2)
        );
        
        console.log('⚙️ TECHNICAL ANALYSIS COMPLETE!');
        console.log(`   📁 Cache Directory: ${this.options.outputDir}`);
        console.log(`   📊 Comparisons: ${masterSummary.totalComparisons}`);
        console.log('   🏆 Top Technical Similarities:');
        
        masterSummary.results.slice(0, 3).forEach(r => {
            console.log(`      ${r.comparison}: ${(r.avgScore * 100).toFixed(1)}%`);
        });
        
        // 🧹 Final cleanup
        allResults.length = 0;
        
        return masterSummary.results;
    }

    // 🧹 NEW ULTRA-LIGHT SCORING METHOD
    calculateUltraLightScores(results) {
        if (results.length === 0) {
            return {
                overall: 0,
                htmlStructure: 0,
                metaTags: 0,
                frameworks: 0
            };
        }

        const totals = results.reduce((acc, result) => {
            return {
                overall: acc.overall + (result.overallScore || 0),
                htmlStructure: acc.htmlStructure + (result.htmlScore || 0),
                metaTags: acc.metaTags + (result.metaScore || 0),
                frameworks: acc.frameworks + (result.frameworkScore || 0)
            };
        }, {
            overall: 0, htmlStructure: 0, metaTags: 0, frameworks: 0
        });

        const count = results.length;
        const scores = {
            overall: totals.overall / count,
            htmlStructure: totals.htmlStructure / count,
            metaTags: totals.metaTags / count,
            frameworks: totals.frameworks / count
        };

        // 🧹 Clear totals
        Object.keys(totals).forEach(key => totals[key] = null);

        return scores;
    }

    // 🧹 ENHANCED MEMORY CLEANUP
    clearAnalysisMemory() {
        // Clear any cached analyzer data
        if (this.technicalAnalyzer && this.technicalAnalyzer.clearCache) {
            this.technicalAnalyzer.clearCache();
        }
        
        // Clear any internal caches or temporary data
        this.tempResults = null;
        this.cachedData = null;
        this.pageCache = null;
        this.comparisonData = null;
        
        // Force garbage collection
        if (global.gc) {
            global.gc();
        }
    }

    calculateAverageScores(results) {
        if (results.length === 0) {
            return {
                overall: 0,
                htmlStructure: 0,
                metaTags: 0,
                schemaMarkup: 0,
                frameworks: 0,
                resources: 0,
                performance: 0,
                seoTechnical: 0
            };
        }

        const totals = results.reduce((acc, result) => {
            const tech = result.technical;
            return {
                overall: acc.overall + (tech.overallScore || 0),
                htmlStructure: acc.htmlStructure + (tech.htmlStructure?.score || 0),
                metaTags: acc.metaTags + (tech.metaTags?.score || 0),
                schemaMarkup: acc.schemaMarkup + (tech.schemaMarkup?.score || 0),
                frameworks: acc.frameworks + (tech.frameworks?.score || 0),
                resources: acc.resources + (tech.resources?.score || 0),
                performance: acc.performance + (tech.performance?.score || 0),
                seoTechnical: acc.seoTechnical + (tech.seoTechnical?.score || 0)
            };
        }, {
            overall: 0, htmlStructure: 0, metaTags: 0, schemaMarkup: 0,
            frameworks: 0, resources: 0, performance: 0, seoTechnical: 0
        });

        const count = results.length;
        return {
            overall: totals.overall / count,
            htmlStructure: totals.htmlStructure / count,
            metaTags: totals.metaTags / count,
            schemaMarkup: totals.schemaMarkup / count,
            frameworks: totals.frameworks / count,
            resources: totals.resources / count,
            performance: totals.performance / count,
            seoTechnical: totals.seoTechnical / count
        };
    }
}

// Main execution
async function main() {
    // Parse command line arguments
    const specificFolder = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1];
    
    const runner = new TechnicalAnalysisRunner({
        batchSize: parseInt(process.argv.find(arg => arg.startsWith('--batch='))?.split('=')[1]) || 10,
        specificFolder: specificFolder
    });
    
    try {
        await runner.initialize();
        await runner.runTechnicalAnalysis();
        console.log('\n🎉 Step 3 (Technical Analysis) Complete!');
        console.log('Next: Run Final Report Generator');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = TechnicalAnalysisRunner;