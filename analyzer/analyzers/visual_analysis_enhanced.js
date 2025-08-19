const fs = require('fs').promises;
const path = require('path');
const EnhancedVisualAnalyzer = require('./visual_analyzer_enhanced');
const AnalysisFolderFinder = require('../utilities/folder_finder');
const { url } = require('inspector');

class EnhancedVisualAnalysisRunner {
    constructor(options = {}) {
        this.options = {
            baseDir: './scraped_sites', // Will be updated dynamically
            outputDir: './reports/analysis_cache', // Will be updated dynamically
            batchSize: 5,
            enableScreenshots: true,
            compareViewports: true,
            specificFolder: null, // Can be set to use a specific analysis folder
            viewports: {
                desktop: { width: 1200, height: 800, enabled: true },
                tablet: { width: 768, height: 1024, enabled: true },
                mobile: { width: 375, height: 667, enabled: true }
            },
            ...options
        };

        this.visualAnalyzer = new EnhancedVisualAnalyzer(this.options);
        this.analysisDir = null;
    }

    async initialize() {
        // First check if we have a session folder already set in the AnalysisFolderFinder
        // This ensures consistency across pipeline steps
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
        
        console.log('🎨 Enhanced Visual Analysis Runner Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Using scraped data from: ${this.options.baseDir}`);
        console.log(`📱 Viewports: ${Object.keys(this.options.viewports).filter(v => this.options.viewports[v].enabled).join(', ')}`);
        console.log(`📸 Screenshots: ${this.options.enableScreenshots ? 'ENABLED' : 'DISABLED'}`);
        console.log(`🔄 Responsive Analysis: ${this.options.compareViewports ? 'ENABLED' : 'DISABLED'}`);
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
        
        // Load base visual data
        const pageData = {
            folderName,
            pageIndex,
            pageId: targetFolder,
            path: pagePath,
            visual: JSON.parse(await fs.readFile(path.join(pagePath, 'visual.json'), 'utf8'))
        };

        // Check for multiple viewport data
        if (this.options.compareViewports) {
            pageData.visual.viewportData = await this.loadViewportData(pagePath);
        }

        // Load screenshots for different viewports
        pageData.screenshots = await this.loadScreenshots(pagePath);
        
        // Enhance visual data with additional metrics
        await this.enhanceVisualData(pageData);
        
        return pageData;
    }

    async loadViewportData(pagePath) {
        const viewportData = {};
        
        for (const viewport of Object.keys(this.options.viewports)) {
            const viewportFile = path.join(pagePath, `visual_${viewport}.json`);
            try {
                const data = await fs.readFile(viewportFile, 'utf8');
                viewportData[viewport] = JSON.parse(data);
            } catch (error) {
                // Viewport-specific file doesn't exist, use default
                console.log(`    ℹ️ No ${viewport} visual data found, using default`);
            }
        }
        
        return viewportData;
    }

    async loadScreenshots(pagePath) {
        const screenshots = {};
        
        // Try to load viewport-specific screenshots
        for (const viewport of Object.keys(this.options.viewports)) {
            const screenshotPath = path.join(pagePath, `screenshot_${viewport}.png`);
            try {
                await fs.access(screenshotPath);
                screenshots[viewport] = screenshotPath;
            } catch {
                // Try default screenshot
                const defaultPath = path.join(pagePath, 'screenshot.png');
                try {
                    await fs.access(defaultPath);
                    if (viewport === 'desktop') {
                        screenshots[viewport] = defaultPath;
                    }
                } catch {
                    // No screenshot available
                }
            }
        }
        
        return screenshots;
    }

    async enhanceVisualData(pageData) {
        const visual = pageData.visual;
        
        // Detect design system patterns
        visual.detectedFrameworks = this.detectFrameworks(visual.cssClasses || []);
        visual.componentPatterns = this.extractComponentPatterns(visual);
        
        // Extract color palette
        visual.colorPalette = this.extractColorPalette(visual.elementStyles);
        
        // Detect spacing system
        visual.spacingSystem = this.detectSpacingSystem(visual);
        
        // Add responsive breakpoints if detected
        visual.detectedBreakpoints = this.detectBreakpoints(visual.cssClasses || []);
    }

    detectFrameworks(cssClasses) {
        const frameworks = {
            bootstrap: false,
            tailwind: false,
            material: false,
            foundation: false,
            bulma: false
        };
        
        if (cssClasses.some(c => c.match(/^(btn|col-|container|row)/))) {
            frameworks.bootstrap = true;
        }
        if (cssClasses.some(c => c.match(/^(bg-|text-|p-|m-|flex|grid)/))) {
            frameworks.tailwind = true;
        }
        if (cssClasses.some(c => c.match(/^(mat-|md-|mdc-)/))) {
            frameworks.material = true;
        }
        
        return frameworks;
    }

    extractComponentPatterns(visual) {
        const patterns = {};
        const styles = visual.elementStyles || {};
        
        // Extract button patterns
        if (styles.button) {
            patterns.buttons = {
                borderRadius: styles.button.borderRadius,
                boxShadow: styles.button.boxShadow,
                padding: styles.button.padding,
                typography: {
                    fontWeight: styles.button.fontWeight,
                    textTransform: styles.button.textTransform
                }
            };
        }
        
        // Extract card patterns (if detected)
        const cardClasses = (visual.cssClasses || []).filter(c => c.includes('card'));
        if (cardClasses.length > 0) {
            patterns.cards = {
                hasCards: true,
                cardClasses: cardClasses.slice(0, 5)
            };
        }
        
        return patterns;
    }

    extractColorPalette(elementStyles) {
        const palette = {
            primary: null,
            secondary: null,
            accent: null,
            neutral: null,
            background: null,
            text: null
        };
        
        // Extract primary from headings or buttons
        if (elementStyles.h1?.color) {
            palette.primary = elementStyles.h1.color;
        } else if (elementStyles.button?.backgroundColor) {
            palette.primary = elementStyles.button.backgroundColor;
        }
        
        // Extract background and text
        if (elementStyles.body) {
            palette.background = elementStyles.body.backgroundColor;
            palette.text = elementStyles.body.color;
        }
        
        return palette;
    }

    detectSpacingSystem(visual) {
        const spacingSystem = {
            baseUnit: null,
            scale: [],
            spacingConsistency: 0
        };
        
        // Simple spacing detection from CSS classes
        const spacingClasses = (visual.cssClasses || []).filter(c => 
            c.match(/^(p|m|gap|space)-([\d]+)/)
        );
        
        if (spacingClasses.length > 0) {
            const values = spacingClasses.map(c => {
                const match = c.match(/-([\d]+)/);
                return match ? parseInt(match[1]) : 0;
            }).filter(v => v > 0);
            
            if (values.length > 0) {
                spacingSystem.baseUnit = Math.min(...values);
                spacingSystem.scale = [...new Set(values)].sort((a, b) => a - b);
                spacingSystem.spacingConsistency = 0.8; // Placeholder
            }
        }
        
        return spacingSystem;
    }

    detectBreakpoints(cssClasses) {
        const breakpoints = new Set();
        
        // Common breakpoint patterns
        const patterns = [
            /sm:/, /md:/, /lg:/, /xl:/, // Tailwind
            /-sm-/, /-md-/, /-lg-/, /-xl-/, // Bootstrap
            /small-/, /medium-/, /large-/ // Foundation
        ];
        
        patterns.forEach(pattern => {
            if (cssClasses.some(c => pattern.test(c))) {
                // Map to common breakpoint values
                if (pattern.toString().includes('sm')) breakpoints.add(640);
                if (pattern.toString().includes('md')) breakpoints.add(768);
                if (pattern.toString().includes('lg')) breakpoints.add(1024);
                if (pattern.toString().includes('xl')) breakpoints.add(1280);
            }
        });
        
        return Array.from(breakpoints).sort((a, b) => a - b);
    }

    async analyzeVisualPair(folder1, folder2, pageIndex) {
        try {
            console.log(`    🔍 Page ${pageIndex}: Enhanced visual analysis...`);
            
            const page1 = await this.loadPageData(folder1, pageIndex);
            const page2 = await this.loadPageData(folder2, pageIndex);
            
            const visualResult = await this.visualAnalyzer.compare(page1, page2);
            
            const result = {
                comparison: `${folder1}_vs_${folder2}`,
                pageIndex,
                page1: { folder: folder1, pageId: page1.pageId, url: page1.visual.url },
                page2: { folder: folder2, pageId: page2.pageId, url: page2.visual.url },
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
            delete page1.screenshots;
            delete page2.screenshots;
            
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
        
        console.log(`🎨 Running enhanced visual analysis for ${folders.length} sites\n`);
        
        const allResults = [];
        
        for (let i = 0; i < folders.length; i++) {
            for (let j = i + 1; j < folders.length; j++) {
                const folder1 = folders[i];
                const folder2 = folders[j];
                
                console.log(`📊 Visual Analysis: ${folder1} vs ${folder2}`);
                
                const folder1Pages = await fs.readdir(path.join(this.options.baseDir, folder1));
                const folder2Pages = await fs.readdir(path.join(this.options.baseDir, folder2));
                
                const pageCount1 = folder1Pages.filter(f => f.match(/^\d{3}_/)).length;
                const pageCount2 = folder2Pages.filter(f => f.match(/^\d{3}_/)).length;
                const maxPages = Math.min(pageCount1, pageCount2);
                
                console.log(`  📄 Processing ${maxPages} pages with responsive analysis...`);
                
                const pairResults = [];
                
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
                    
                    if (global.gc) {
                        global.gc();
                    }
                    
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                // Calculate enhanced metrics summary
                const summary = this.calculateEnhancedSummary(pairResults);
                
                const aggregated = {
                    comparison: `${folder1}_vs_${folder2}`,
                    analysisType: 'visual_enhanced',
                    totalPages: pairResults.length,
                    avgScore: summary.overall,
                    metrics: summary.metrics,
                    insights: summary.insights,
                    timestamp: new Date().toISOString()
                };
                
                await fs.writeFile(
                    path.join(this.options.outputDir, `${folder1}_vs_${folder2}_visual_summary.json`),
                    JSON.stringify(aggregated, null, 2)
                );
                
                allResults.push(aggregated);
                console.log(`  ✅ Visual analysis complete: ${(summary.overall * 100).toFixed(1)}% similarity`);
                console.log(`     🎨 Design System: ${(summary.metrics?.designSystem || 0).toFixed(2)} | Responsive: ${(summary.metrics?.responsive || 0).toFixed(2)}`);
                console.log(`     📐 Layout: ${(summary.metrics?.layout || 0).toFixed(2)} | Visual Hierarchy: ${(summary.metrics?.hierarchy || 0).toFixed(2)}\n`);
            }
        }
        
        await this.saveMasterSummary(allResults);
        
        console.log('🎨 ENHANCED VISUAL ANALYSIS COMPLETE!');
        console.log(`   📁 Cache Directory: ${this.options.outputDir}`);
        
        return allResults;
    }

    calculateEnhancedSummary(results) {
        if (!results || results.length === 0) {
            return {
                overall: 0,
                metrics: {
                    overall: 0,
                    layout: 0,
                    colors: 0,
                    typography: 0,
                    responsive: 0,
                    designSystem: 0,
                    hierarchy: 0,
                    spacing: 0
                },
                viewportMetrics: {},
                insights: ['⚠️ No valid analysis results available']
            };
        }

        const metrics = {
            overall: 0,
            layout: 0,
            colors: 0,
            typography: 0,
            responsive: 0,
            designSystem: 0,
            hierarchy: 0,
            spacing: 0
        };

        let screenshotScores = {
            desktop: 0,
            tablet: 0,
            mobile: 0
        };
        let screenshotCounts = {
            desktop: 0,
            tablet: 0,
            mobile: 0
        };

        let validResults = 0;

        results.forEach(result => {
            if (!result || !result.visual) return;
            
            const visual = result.visual;
            if (visual.overallScore !== undefined) {
                metrics.overall += visual.overallScore;
                validResults++;
            }
            
            // Safely add each metric
            if (visual.layout?.score !== undefined) metrics.layout += visual.layout.score;
            if (visual.colors?.score !== undefined) metrics.colors += visual.colors.score;
            if (visual.typography?.score !== undefined) metrics.typography += visual.typography.score;
            if (visual.responsiveDesign?.score !== undefined) metrics.responsive += visual.responsiveDesign.score;
            if (visual.designSystem?.score !== undefined) metrics.designSystem += visual.designSystem.score;
            if (visual.visualHierarchy?.score !== undefined) metrics.hierarchy += visual.visualHierarchy.score;
            if (visual.spacingGrid?.score !== undefined) metrics.spacing += visual.spacingGrid.score;
            
            // Track viewport-specific scores
            if (visual.screenshots?.viewports) {
                Object.entries(visual.screenshots.viewports).forEach(([viewport, data]) => {
                    if (data && data.score !== undefined) {
                        screenshotScores[viewport] += data.score;
                        screenshotCounts[viewport]++;
                    }
                });
            }
        });

        // Calculate averages only if we have valid results
        if (validResults > 0) {
            Object.keys(metrics).forEach(key => {
                metrics[key] = metrics[key] / validResults;
            });
        }

        // Calculate viewport averages
        const viewportMetrics = {};
        Object.keys(screenshotScores).forEach(viewport => {
            if (screenshotCounts[viewport] > 0) {
                viewportMetrics[viewport] = screenshotScores[viewport] / screenshotCounts[viewport];
            }
        });

        // Generate insights
        const insights = this.generateVisualInsights(metrics, viewportMetrics);

        return {
            overall: metrics.overall,
            metrics,
            viewportMetrics,
            insights
        };
    }

    generateVisualInsights(metrics, viewportMetrics) {
        const insights = [];

        // Design system insights
        if (metrics.designSystem > 0.8) {
            insights.push("🎨 Strong design system consistency detected");
        } else if (metrics.designSystem < 0.4) {
            insights.push("⚠️ Low design system consistency - different frameworks or custom implementations");
        }

        // Responsive design insights
        if (metrics.responsive > 0.7) {
            insights.push("📱 Good responsive design consistency across viewports");
        }
        
        // Viewport-specific insights
        if (viewportMetrics.mobile && viewportMetrics.desktop) {
            const responsiveDiff = Math.abs(viewportMetrics.desktop - viewportMetrics.mobile);
            if (responsiveDiff > 0.3) {
                insights.push("📊 Significant differences between desktop and mobile designs");
            }
        }

        // Visual hierarchy
        if (metrics.hierarchy > 0.8) {
            insights.push("👁️ Similar visual hierarchy and emphasis patterns");
        }

        return insights;
    }

    async saveMasterSummary(allResults) {
        const masterSummary = {
            analysisType: 'visual_enhanced',
            timestamp: new Date().toISOString(),
            totalComparisons: allResults.length,
            features: {
                viewportsAnalyzed: Object.keys(this.options.viewports).filter(v => this.options.viewports[v].enabled),
                responsiveAnalysis: this.options.compareViewports,
                designSystemDetection: true,
                visualHierarchyAnalysis: true
            },
            results: allResults.map(r => ({
                comparison: r.comparison,
                avgScore: r.avgScore,
                metrics: r.metrics,
                totalPages: r.totalPages,
                topInsights: r.insights.slice(0, 3)
            })).sort((a, b) => b.avgScore - a.avgScore)
        };
        
        await fs.writeFile(
            path.join(this.options.outputDir, 'visual_master_summary.json'),
            JSON.stringify(masterSummary, null, 2)
        );
        
        console.log('📊 Comparisons:', masterSummary.totalComparisons);
        console.log('🏆 Top Visual Similarities:');
        
        masterSummary.results.slice(0, 3).forEach(r => {
            console.log(`   ${r.comparison}: ${(r.avgScore * 100).toFixed(1)}%`);
        });
    }
}

// Main execution
async function main() {
    // Parse command line arguments
    const specificFolder = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1];
    
    const runner = new EnhancedVisualAnalysisRunner({
        batchSize: parseInt(process.argv.find(arg => arg.startsWith('--batch='))?.split('=')[1]) || 5,
        enableScreenshots: !process.argv.includes('--no-screenshots'),
        compareViewports: !process.argv.includes('--no-responsive'),
        specificFolder: specificFolder
    });
    
    try {
        await runner.initialize();
        await runner.runVisualAnalysis();
        console.log('\n🎉 Enhanced Visual Analysis Complete!');
        console.log('Next: Run Step 2 (Content Analysis)');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = EnhancedVisualAnalysisRunner;