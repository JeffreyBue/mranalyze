const fs = require('fs').promises;
const path = require('path');
const SEOAnalyzer = require('./seo_analyzer');
const AnalysisFolderFinder = require('../utilities/folder_finder');

class SEOAnalysisRunner {
    constructor(options = {}) {
        this.options = {
            baseDir: './scraped_sites', // Will be updated dynamically
            outputDir: './reports/analysis_cache', // Will be updated dynamically
            seoOutputDir: './reports/seo_analysis', // Will be updated dynamically
            batchSize: 10,
            specificFolder: null, // Can be set to use a specific analysis folder
            ...options
        };

        this.seoAnalyzer = new SEOAnalyzer();
        this.analysisDir = null;
        
        this.stats = {
            processedPages: 0,
            totalProcessingTime: 0,
            startTime: null,
            criticalIssues: 0,
            highPriorityActions: 0
        };
    }

    async initialize() {
        // First check if we have a session folder already set in the AnalysisFolderFinder
        if (AnalysisFolderFinder.sessionFolderName) {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
            console.log(`🔍 Using pipeline session folder: ${AnalysisFolderFinder.sessionFolderName}`);
        }
        // Otherwise check if a specific folder was requested
        else if (this.options.specificFolder) {
            this.analysisDir = path.join('.', this.options.specificFolder);
            console.log(`🔍 Using specified analysis folder: ${this.options.specificFolder}`);
        }
        // Otherwise find the latest analysis folder
        else {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
        }
        
        // Update baseDir to point to scraped_sites inside the analysis directory
        this.options.baseDir = path.join(this.analysisDir, 'scraped_sites');
        
        // Create output directories in the analysis folder
        this.options.outputDir = path.join(this.analysisDir, 'reports/analysis_cache');
        this.options.seoOutputDir = path.join(this.analysisDir, 'reports/seo_analysis');
        
        await fs.mkdir(this.options.seoOutputDir, { recursive: true });
        await fs.mkdir(path.join(this.options.seoOutputDir, 'page_reports'), { recursive: true });
        await fs.mkdir(path.join(this.options.seoOutputDir, 'comparison_reports'), { recursive: true });
        
        console.log('🔍 SEO Analysis Runner Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Using scraped data from: ${this.options.baseDir}`);
        console.log(`📁 Output Directory: ${this.options.seoOutputDir}`);
        
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
        
        const pageData = {
            folderName,
            pageIndex,
            pageId: targetFolder,
            path: pagePath,
            content: JSON.parse(await fs.readFile(path.join(pagePath, 'content.json'), 'utf8')),
            technical: JSON.parse(await fs.readFile(path.join(pagePath, 'technical.json'), 'utf8')),
            url: ''
        };

        // Try to get URL from page_data.json
        try {
            const pageDataFile = JSON.parse(await fs.readFile(path.join(pagePath, 'page_data.json'), 'utf8'));
            pageData.url = pageDataFile.url || 'Unknown URL';
        } catch (error) {
            pageData.url = 'Unknown URL';
        }

        return pageData;
    }

    async runSEOAnalysis() {
        const folders = await this.findScrapedFolders();
        
        if (folders.length === 0) {
            throw new Error('No scraped folders found for SEO analysis');
        }
        
        console.log(`🔍 Running SEO analysis for ${folders.length} sites\n`);
        
        const allResults = [];
        const allPageReports = [];
        
        // First, analyze individual pages for baseline SEO metrics
        for (const folder of folders) {
            console.log(`📊 Analyzing individual pages for: ${folder}`);
            const pageReports = await this.analyzeIndividualPages(folder);
            allPageReports.push(...pageReports);
        }
        
        // Then compare pairs for duplicate content and opportunities
        for (let i = 0; i < folders.length; i++) {
            for (let j = i + 1; j < folders.length; j++) {
                const folder1 = folders[i];
                const folder2 = folders[j];
                
                console.log(`🔍 SEO Comparison: ${folder1} vs ${folder2}`);
                
                const comparisonResult = await this.analyzePairComparison(folder1, folder2);
                allResults.push(comparisonResult);
            }
        }
        
        // Generate master SEO summary
        await this.generateMasterSEOSummary(allResults, allPageReports);
        
        const totalTime = Date.now() - this.stats.startTime;
        console.log('\n🔍 SEO ANALYSIS COMPLETE!');
        console.log(`   ⏱️ Total Time: ${Math.round(totalTime / 1000)}s`);
        console.log(`   📊 Pages Analyzed: ${this.stats.processedPages}`);
        console.log(`   🚨 Critical Issues: ${this.stats.criticalIssues}`);
        console.log(`   ⚡ High Priority Actions: ${this.stats.highPriorityActions}`);
        
        return { comparisons: allResults, pages: allPageReports };
    }

    async analyzeIndividualPages(folderName) {
        const folder1Pages = await fs.readdir(path.join(this.options.baseDir, folderName));
        const pageCount = folder1Pages.filter(f => f.match(/^\d{3}_/)).length;
        
        const pageReports = [];
        
        for (let pageIndex = 1; pageIndex <= pageCount; pageIndex++) {
            try {
                const pageData = await this.loadPageData(folderName, pageIndex);
                const seoReport = await this.seoAnalyzer.analyzeIndividualPage(pageData);
                
                // Count critical issues
                if (seoReport.overallScore < 0.4) this.stats.criticalIssues++;
                this.stats.highPriorityActions += seoReport.actionableItems.filter(item => item.priority === 'CRITICAL' || item.priority === 'HIGH').length;
                
                const report = {
                    site: folderName,
                    pageIndex,
                    pageId: pageData.pageId,
                    url: pageData.url,
                    seoAnalysis: seoReport,
                    timestamp: new Date().toISOString()
                };
                
                pageReports.push(report);
                this.stats.processedPages++;
                
                // Save individual page report
                await fs.writeFile(
                    path.join(this.options.seoOutputDir, 'page_reports', `${folderName}_page_${String(pageIndex).padStart(3, '0')}_seo.json`),
                    JSON.stringify(report, null, 2)
                );
                
                console.log(`    ✅ Page ${pageIndex}: Score ${(seoReport.overallScore * 100).toFixed(1)}% (${seoReport.actionableItems.length} actions)`);
                
            } catch (error) {
                console.warn(`    ⚠️ SEO analysis failed for page ${pageIndex}: ${error.message}`);
            }
        }
        
        return pageReports;
    }

    async analyzePairComparison(folder1, folder2) {
        const folder1Pages = await fs.readdir(path.join(this.options.baseDir, folder1));
        const folder2Pages = await fs.readdir(path.join(this.options.baseDir, folder2));
        
        const pageCount1 = folder1Pages.filter(f => f.match(/^\d{3}_/)).length;
        const pageCount2 = folder2Pages.filter(f => f.match(/^\d{3}_/)).length;
        const maxPages = Math.min(pageCount1, pageCount2);
        
        const pairResults = [];
        
        for (let pageIndex = 1; pageIndex <= maxPages; pageIndex++) {
            try {
                const page1 = await this.loadPageData(folder1, pageIndex);
                const page2 = await this.loadPageData(folder2, pageIndex);
                
                const comparisonResult = await this.seoAnalyzer.comparePages(page1, page2);
                pairResults.push({
                    pageIndex,
                    comparison: comparisonResult,
                    page1: { site: folder1, pageId: page1.pageId, url: page1.url },
                    page2: { site: folder2, pageId: page2.pageId, url: page2.url }
                });
                
            } catch (error) {
                console.warn(`    ⚠️ Comparison failed for page ${pageIndex}: ${error.message}`);
            }
        }
        
        // Calculate summary metrics
        const summary = this.calculateComparisonSummary(pairResults);
        
        const aggregated = {
            comparison: `${folder1}_vs_${folder2}`,
            analysisType: 'seo_comparison',
            totalPages: pairResults.length,
            summary,
            detailedResults: pairResults,
            timestamp: new Date().toISOString()
        };
        
        // Save comparison report
        await fs.writeFile(
            path.join(this.options.seoOutputDir, 'comparison_reports', `${folder1}_vs_${folder2}_seo_comparison.json`),
            JSON.stringify(aggregated, null, 2)
        );
        
        console.log(`  ✅ Comparison complete: ${summary.duplicateRisk.level} duplicate risk, ${summary.totalActionableItems} total actions`);
        
        return aggregated;
    }

    calculateComparisonSummary(pairResults) {
        if (pairResults.length === 0) {
            return {
                duplicateRisk: { score: 0, level: 'UNKNOWN' },
                totalActionableItems: 0,
                averageUniquenessGap: 0
            };
        }

        let totalDuplicateScore = 0;
        let totalActionableItems = 0;
        let totalUniquenessGap = 0;

        pairResults.forEach(result => {
            const comp = result.comparison;
            totalDuplicateScore += comp.duplicateContentRisk.riskScore || 0;
            totalActionableItems += comp.actionableItems.length;
            totalUniquenessGap += comp.uniquenessGap.score || 0;
        });

        const avgDuplicateScore = totalDuplicateScore / pairResults.length;
        const avgUniquenessGap = totalUniquenessGap / pairResults.length;

        return {
            duplicateRisk: {
                score: avgDuplicateScore,
                level: this.getDuplicateRiskLevel(avgDuplicateScore)
            },
            totalActionableItems,
            averageUniquenessGap: avgUniquenessGap,
            criticalPages: pairResults.filter(r => r.comparison.duplicateContentRisk.riskScore > 0.8).length,
            highRiskPages: pairResults.filter(r => r.comparison.duplicateContentRisk.riskScore > 0.6).length
        };
    }

    getDuplicateRiskLevel(score) {
        if (score >= 0.8) return 'CRITICAL';
        if (score >= 0.6) return 'HIGH';
        if (score >= 0.4) return 'MEDIUM';
        return 'LOW';
    }

    async generateMasterSEOSummary(comparisons, pageReports) {
        // Aggregate all actionable items
        const allActionableItems = [];
        
        // From page reports
        pageReports.forEach(report => {
            report.seoAnalysis.actionableItems.forEach(item => {
                allActionableItems.push({
                    ...item,
                    source: 'individual_page',
                    site: report.site,
                    pageId: report.pageId,
                    url: report.url
                });
            });
        });
        
        // From comparisons
        comparisons.forEach(comparison => {
            comparison.detailedResults.forEach(result => {
                result.comparison.actionableItems.forEach(item => {
                    allActionableItems.push({
                        ...item,
                        source: 'comparison',
                        comparisonPair: comparison.comparison,
                        page1: result.page1,
                        page2: result.page2
                    });
                });
            });
        });
        
        // Prioritize and deduplicate
        const prioritizedActions = this.prioritizeActionableItems(allActionableItems);
        
        const masterSummary = {
            analysisType: 'seo_master_summary',
            timestamp: new Date().toISOString(),
            overview: {
                totalSites: new Set(pageReports.map(r => r.site)).size,
                totalPagesAnalyzed: pageReports.length,
                totalComparisons: comparisons.length,
                totalActionableItems: allActionableItems.length,
                criticalIssues: allActionableItems.filter(item => item.priority === 'CRITICAL').length,
                highPriorityIssues: allActionableItems.filter(item => item.priority === 'HIGH').length
            },
            duplicateContentRisks: this.summarizeDuplicateRisks(comparisons),
            topPriorityActions: prioritizedActions.slice(0, 20),
            actionsByCategory: this.categorizeActions(prioritizedActions),
            siteSpecificSummaries: this.generateSiteSpecificSummaries(pageReports),
            implementationRoadmap: this.generateImplementationRoadmap(prioritizedActions)
        };
        
        // Save master summary
        await fs.writeFile(
            path.join(this.options.seoOutputDir, 'seo_master_summary.json'),
            JSON.stringify(masterSummary, null, 2)
        );
        
        // Generate human-readable action plan
        await this.generateActionPlan(masterSummary);
        
        console.log('\n📋 SEO Master Summary Generated');
        console.log(`   🚨 Critical Issues: ${masterSummary.overview.criticalIssues}`);
        console.log(`   ⚡ High Priority: ${masterSummary.overview.highPriorityIssues}`);
        console.log(`   📊 Total Actions: ${masterSummary.overview.totalActionableItems}`);
    }

    prioritizeActionableItems(items) {
        // Weight by priority and potential impact
        const priorityWeights = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        const impactWeights = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        
        return items
            .map(item => ({
                ...item,
                score: (priorityWeights[item.priority] || 1) * (impactWeights[item.impact] || 1)
            }))
            .sort((a, b) => b.score - a.score);
    }

    categorizeActions(actions) {
        const categories = {};
        
        actions.forEach(action => {
            if (!categories[action.category]) {
                categories[action.category] = [];
            }
            categories[action.category].push(action);
        });
        
        // Sort categories by total impact
        const sortedCategories = {};
        Object.keys(categories)
            .sort((a, b) => categories[b].length - categories[a].length)
            .forEach(key => {
                sortedCategories[key] = categories[key];
            });
        
        return sortedCategories;
    }

    generateSiteSpecificSummaries(pageReports) {
        const siteGroups = {};
        
        pageReports.forEach(report => {
            if (!siteGroups[report.site]) {
                siteGroups[report.site] = [];
            }
            siteGroups[report.site].push(report);
        });
        
        const summaries = {};
        
        Object.keys(siteGroups).forEach(site => {
            const reports = siteGroups[site];
            const avgScore = reports.reduce((sum, r) => sum + r.seoAnalysis.overallScore, 0) / reports.length;
            const totalActions = reports.reduce((sum, r) => sum + r.seoAnalysis.actionableItems.length, 0);
            
            summaries[site] = {
                averageSEOScore: avgScore,
                totalPages: reports.length,
                totalActionableItems: totalActions,
                criticalIssues: reports.filter(r => r.seoAnalysis.overallScore < 0.4).length,
                topIssues: this.getTopIssuesForSite(reports)
            };
        });
        
        return summaries;
    }

    getTopIssuesForSite(reports) {
        const allIssues = [];
        reports.forEach(report => {
            report.seoAnalysis.actionableItems.forEach(item => {
                allIssues.push(item);
            });
        });
        
        // Group by category and return top 3
        const categoryGroups = {};
        allIssues.forEach(issue => {
            if (!categoryGroups[issue.category]) {
                categoryGroups[issue.category] = 0;
            }
            categoryGroups[issue.category]++;
        });
        
        return Object.entries(categoryGroups)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([category, count]) => ({ category, count }));
    }

    generateImplementationRoadmap(actions) {
        const criticalActions = actions.filter(a => a.priority === 'CRITICAL');
        const highActions = actions.filter(a => a.priority === 'HIGH');
        const mediumActions = actions.filter(a => a.priority === 'MEDIUM');
        
        return {
            phase1_immediate: {
                timeframe: '1-2 weeks',
                actions: criticalActions.slice(0, 10),
                description: 'Critical duplicate content and SEO violations'
            },
            phase2_high_impact: {
                timeframe: '2-4 weeks',
                actions: highActions.slice(0, 15),
                description: 'High-impact SEO improvements and uniqueness enhancements'
            },
            phase3_optimization: {
                timeframe: '1-2 months',
                actions: mediumActions.slice(0, 20),
                description: 'Content optimization and additional SEO enhancements'
            }
        };
    }

    summarizeDuplicateRisks(comparisons) {
        const risks = comparisons.map(comp => ({
            comparison: comp.comparison,
            riskLevel: comp.summary.duplicateRisk.level,
            riskScore: comp.summary.duplicateRisk.score,
            criticalPages: comp.summary.criticalPages
        }));
        
        return risks.sort((a, b) => b.riskScore - a.riskScore);
    }

    async generateActionPlan(summary) {
        const actionPlan = this.formatActionPlan(summary);
        
        await fs.writeFile(
            path.join(this.options.seoOutputDir, 'SEO_ACTION_PLAN.txt'),
            actionPlan
        );
        
        // Also generate CSV for easy tracking
        const csvContent = this.generateActionCSV(summary.topPriorityActions);
        await fs.writeFile(
            path.join(this.options.seoOutputDir, 'SEO_ACTION_ITEMS.csv'),
            csvContent
        );
        
        console.log(`   📋 Action Plan: SEO_ACTION_PLAN.txt`);
        console.log(`   📊 Action Items CSV: SEO_ACTION_ITEMS.csv`);
    }

    formatActionPlan(summary) {
        return `
SEO OPTIMIZATION ACTION PLAN
Generated: ${new Date().toLocaleString()}

EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 Critical Issues Requiring Immediate Attention: ${summary.overview.criticalIssues}
⚡ High Priority Optimizations: ${summary.overview.highPriorityIssues}
📊 Total Actionable Items: ${summary.overview.totalActionableItems}
🌐 Sites Analyzed: ${summary.overview.totalSites}
📄 Pages Reviewed: ${summary.overview.totalPagesAnalyzed}

IMPLEMENTATION ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1: IMMEDIATE ACTIONS (1-2 weeks)
${summary.implementationRoadmap.phase1_immediate.actions.map((action, i) => 
`${i+1}. [${action.priority}] ${action.title}
   Page: ${action.pageId || 'Multiple'}
   Impact: ${action.impact}
   Action: ${action.description}
   Specific: ${action.specificAction || 'See detailed report'}
`).join('\n')}

PHASE 2: HIGH IMPACT IMPROVEMENTS (2-4 weeks)
${summary.implementationRoadmap.phase2_high_impact.actions.slice(0, 10).map((action, i) => 
`${i+1}. [${action.priority}] ${action.title}
   Impact: ${action.impact}
   Action: ${action.description}
   Specific: ${action.specificAction || 'See detailed report'}
`).join('\n')}

TOP DUPLICATE CONTENT RISKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${summary.duplicateContentRisks.slice(0, 5).map(risk => 
`🚨 ${risk.comparison}: ${risk.riskLevel} Risk (${(risk.riskScore * 100).toFixed(1)}%)
   Critical Pages: ${risk.criticalPages}`
).join('\n\n')}

PRIORITY ACTIONS BY CATEGORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${Object.entries(summary.actionsByCategory).slice(0, 5).map(([category, actions]) => 
`📋 ${category.toUpperCase()} (${actions.length} items)
${actions.slice(0, 3).map(action => `   • ${action.title} - ${action.description}`).join('\n')}`
).join('\n\n')}

SITE-SPECIFIC PRIORITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${Object.entries(summary.siteSpecificSummaries).map(([site, siteSummary]) => 
`🌐 ${site.toUpperCase()}
   SEO Score: ${(siteSummary.averageSEOScore * 100).toFixed(1)}%
   Action Items: ${siteSummary.totalActionableItems}
   Critical Issues: ${siteSummary.criticalIssues}
   Top Issues: ${siteSummary.topIssues.map(issue => issue.category).join(', ')}`
).join('\n\n')}
        `.trim();
    }

    generateActionCSV(actions) {
        const header = 'Priority,Category,Title,Description,Impact,Page/Site,URL,Specific Action,Target Completion\n';
        const rows = actions.slice(0, 50).map(action => {
            const targetDate = this.calculateTargetDate(action.priority);
            return `"${action.priority}","${action.category}","${action.title}","${action.description}","${action.impact}","${action.pageId || action.site || 'Multiple'}","${action.url || ''}","${action.specificAction || 'See detailed report'}","${targetDate}"`;
        }).join('\n');
        
        return header + rows;
    }

    calculateTargetDate(priority) {
        const today = new Date();
        let daysToAdd = 7; // Default 1 week
        
        if (priority === 'CRITICAL') daysToAdd = 3;
        else if (priority === 'HIGH') daysToAdd = 7;
        else if (priority === 'MEDIUM') daysToAdd = 14;
        else daysToAdd = 30;
        
        const targetDate = new Date(today.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
        return targetDate.toISOString().split('T')[0];
    }
}

// Main execution
async function main() {
    // Parse command line arguments
    const specificFolder = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1];
    
    const runner = new SEOAnalysisRunner({
        batchSize: parseInt(process.argv.find(arg => arg.startsWith('--batch='))?.split('=')[1]) || 10,
        specificFolder: specificFolder
    });
    
    try {
        await runner.initialize();
        await runner.runSEOAnalysis();
        console.log('\n🎉 SEO Analysis Complete!');
        console.log('📁 Check ./reports/seo_analysis/ for detailed reports');
        console.log('📋 Review SEO_ACTION_PLAN.txt for immediate actions');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = SEOAnalysisRunner;