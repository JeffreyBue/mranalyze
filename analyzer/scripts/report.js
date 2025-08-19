const fs = require('fs').promises;
const path = require('path');
const AnalysisFolderFinder = require('../utilities/folder_finder');

class FinalReportGenerator {
    constructor(options = {}) {
        this.options = {
            cacheDir: './reports/analysis_cache', // Will be updated dynamically
            seoDir: './reports/seo_analysis',     // Will be updated dynamically
            outputDir: './reports/final_reports',  // Will be updated dynamically
            specificFolder: null,  // Can be set to use a specific analysis folder
            ...options
        };
        
        this.analysisDir = null;
    }

    async initialize() {
        // First check if we have a session folder already set in the AnalysisFolderFinder
        if (AnalysisFolderFinder.sessionFolderName) {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
            console.log(`📊 Using pipeline session folder: ${AnalysisFolderFinder.sessionFolderName}`);
        }
        // Otherwise check if a specific folder was requested
        else if (this.options.specificFolder) {
            this.analysisDir = path.join('.', this.options.specificFolder);
            console.log(`📊 Using specified analysis folder: ${this.options.specificFolder}`);
        }
        // Otherwise find the latest analysis folder
        else {
            this.analysisDir = await AnalysisFolderFinder.findLatestAnalysisFolder();
        }
        
        // Update all directories to use the analysis folder
        this.options.cacheDir = path.join(this.analysisDir, 'reports/analysis_cache');
        this.options.seoDir = path.join(this.analysisDir, 'reports/seo_analysis');
        this.options.outputDir = path.join(this.analysisDir, 'reports/final_reports');
        
        await fs.mkdir(this.options.outputDir, { recursive: true });
        
        console.log('📊 Final Report Generator Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Reading from cache: ${this.options.cacheDir}`);
        console.log(`📁 Reading from SEO: ${this.options.seoDir}`);
        console.log(`📁 Output directory: ${this.options.outputDir}`);
    }

    async loadAnalysisResults() {
        const results = {
            visual: null,
            content: null,
            technical: null,
            seo: null
        };

        try {
            // Load master summaries
            const visualPath = path.join(this.options.cacheDir, 'visual_master_summary.json');
            const contentPath = path.join(this.options.cacheDir, 'content_master_summary.json');
            const technicalPath = path.join(this.options.cacheDir, 'technical_master_summary.json');
            const seoPath = path.join(this.options.seoDir, 'seo_master_summary.json');

            if (await this.fileExists(visualPath)) {
                results.visual = JSON.parse(await fs.readFile(visualPath, 'utf8'));
            }

            if (await this.fileExists(contentPath)) {
                results.content = JSON.parse(await fs.readFile(contentPath, 'utf8'));
            }

            if (await this.fileExists(technicalPath)) {
                results.technical = JSON.parse(await fs.readFile(technicalPath, 'utf8'));
            }

            if (await this.fileExists(seoPath)) {
                results.seo = JSON.parse(await fs.readFile(seoPath, 'utf8'));
            }

            console.log(`📈 Loaded analysis results:`);
            console.log(`   🎨 Visual: ${results.visual ? '✅' : '❌'}`);
            console.log(`   📝 Content: ${results.content ? '✅' : '❌'}`);
            console.log(`   ⚙️ Technical: ${results.technical ? '✅' : '❌'}`);
            console.log(`   🔍 SEO: ${results.seo ? '✅' : '❌'}`);

            return results;
        } catch (error) {
            throw new Error(`Failed to load analysis results: ${error.message}`);
        }
    }

    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    async generateFinalReports() {
        const analysisResults = await this.loadAnalysisResults();
        
        // Get all unique comparisons
        const allComparisons = this.extractAllComparisons(analysisResults);
        
        console.log(`📊 Generating final reports for ${allComparisons.length} comparisons...`);
        
        const finalReports = [];
        
        for (const comparison of allComparisons) {
            const report = await this.generateComparisonReport(comparison, analysisResults);
            finalReports.push(report);
            
            // Save individual comparison report
            await this.saveComparisonReport(report);
        }
        
        // Generate master summary
        await this.generateMasterSummary(finalReports, analysisResults);
        
        // Generate actionable items summary if SEO data available
        if (analysisResults.seo) {
            await this.generateActionableItemsSummary(analysisResults.seo);
        }
        
        return finalReports;
    }

    extractAllComparisons(analysisResults) {
        const comparisons = new Set();
        
        Object.values(analysisResults).forEach(analysis => {
            if (analysis && analysis.results) {
                analysis.results.forEach(result => {
                    comparisons.add(result.comparison);
                });
            }
        });
        
        return Array.from(comparisons).sort();
    }

    async generateComparisonReport(comparisonName, analysisResults) {
        const report = {
            comparison: comparisonName,
            timestamp: new Date().toISOString(),
            analysis: {
                visual: this.findAnalysisResult(analysisResults.visual, comparisonName),
                content: this.findAnalysisResult(analysisResults.content, comparisonName),
                technical: this.findAnalysisResult(analysisResults.technical, comparisonName),
                seo: this.findSEOAnalysisResult(analysisResults.seo, comparisonName)
            }
        };

        // Calculate overall similarity
        report.overallSimilarity = this.calculateOverallSimilarity(report.analysis);
        
        // Generate insights
        report.insights = this.generateInsights(report);
        
        // Add actionable items for this comparison
        report.actionableItems = this.extractActionableItemsForComparison(analysisResults.seo, comparisonName);
        
        return report;
    }

    findAnalysisResult(analysisData, comparisonName) {
        if (!analysisData || !analysisData.results) {
            return { available: false, message: 'Analysis not completed' };
        }

        const result = analysisData.results.find(r => r.comparison === comparisonName);
        if (!result) {
            return { available: false, message: 'Comparison not found' };
        }

        return {
            available: true,
            avgScore: result.avgScore,
            totalPages: result.totalPages,
            detailedScores: result.detailedScores || null
        };
    }

    findSEOAnalysisResult(seoData, comparisonName) {
        if (!seoData) {
            return { available: false, message: 'SEO analysis not completed' };
        }

        // Look for comparison in duplicate content risks
        const duplicateRisk = seoData.duplicateContentRisks?.find(risk => 
            risk.comparison === comparisonName
        );

        if (!duplicateRisk) {
            return { available: false, message: 'SEO comparison not found' };
        }

        return {
            available: true,
            duplicateRisk: duplicateRisk.riskLevel,
            riskScore: duplicateRisk.riskScore,
            criticalPages: duplicateRisk.criticalPages
        };
    }

    extractActionableItemsForComparison(seoData, comparisonName) {
        if (!seoData || !seoData.topPriorityActions) return [];
        
        return seoData.topPriorityActions.filter(action => 
            action.comparisonPair === comparisonName ||
            (action.source === 'comparison' && action.comparisonPair === comparisonName)
        ).slice(0, 5); // Top 5 items for this comparison
    }

    calculateOverallSimilarity(analysis) {
        // Include SEO in similarity calculation
        const weights = analysis.seo.available 
            ? { visual: 0.25, content: 0.4, technical: 0.15, seo: 0.2 }
            : { visual: 0.3, content: 0.5, technical: 0.2 };
            
        let totalWeight = 0;
        let weightedScore = 0;

        Object.entries(weights).forEach(([dimension, weight]) => {
            if (analysis[dimension].available) {
                let score = 0;
                
                if (dimension === 'seo') {
                    // For SEO, use risk score (high risk = high similarity)
                    score = analysis[dimension].riskScore || 0;
                } else {
                    score = analysis[dimension].avgScore || 0;
                }
                
                totalWeight += weight;
                weightedScore += score * weight;
            }
        });

        if (totalWeight === 0) {
            return { score: 0, classification: 'UNKNOWN', message: 'No analysis available' };
        }

        const normalizedScore = weightedScore / totalWeight;
        
        return {
            score: Math.round(normalizedScore * 100) / 100,
            classification: this.classifySimilarity(normalizedScore),
            breakdown: {
                visual: analysis.visual.available ? analysis.visual.avgScore : null,
                content: analysis.content.available ? analysis.content.avgScore : null,
                technical: analysis.technical.available ? analysis.technical.avgScore : null,
                seo: analysis.seo.available ? analysis.seo.riskScore : null
            },
            weightsUsed: Object.fromEntries(
                Object.entries(weights).filter(([dim]) => analysis[dim].available)
            )
        };
    }

    classifySimilarity(score) {
        if (score >= 0.9) return 'IDENTICAL';
        if (score >= 0.7) return 'VERY_SIMILAR';
        if (score >= 0.5) return 'SIMILAR';
        if (score >= 0.3) return 'SOMEWHAT_SIMILAR';
        return 'DIFFERENT';
    }

    generateInsights(report) {
        const insights = [];
        const { analysis, overallSimilarity } = report;

        // Overall insights
        if (overallSimilarity.score >= 0.9) {
            insights.push("🚨 CRITICAL: Extremely high similarity detected - potential duplicate sites");
        } else if (overallSimilarity.score >= 0.8) {
            insights.push("⚠️ HIGH: Very similar sites - likely template-based or copied content");
        } else if (overallSimilarity.score >= 0.6) {
            insights.push("📊 MODERATE: Sites share significant similarities");
        } else {
            insights.push("✅ LOW: Sites appear sufficiently different");
        }

        // Dimension-specific insights
        if (analysis.visual.available && analysis.visual.avgScore >= 0.8) {
            insights.push("🎨 Visual design is very similar - possible template usage");
        }

        if (analysis.content.available && analysis.content.avgScore >= 0.85) {
            insights.push("📝 Content shows high similarity - potential content copying");
        }

        if (analysis.technical.available && analysis.technical.avgScore >= 0.9) {
            insights.push("⚙️ Technical implementation nearly identical - same framework/codebase");
        }

        // SEO-specific insights
        if (analysis.seo.available) {
            if (analysis.seo.riskScore >= 0.8) {
                insights.push("🔍 CRITICAL SEO RISK: High duplicate content risk - immediate action needed");
            } else if (analysis.seo.riskScore >= 0.6) {
                insights.push("🔍 HIGH SEO RISK: Significant duplicate content risk - optimization needed");
            } else if (analysis.seo.riskScore >= 0.4) {
                insights.push("🔍 MODERATE SEO RISK: Some duplicate content concerns");
            } else {
                insights.push("🔍 LOW SEO RISK: Acceptable content differentiation");
            }

            if (analysis.seo.criticalPages > 0) {
                insights.push(`🚨 ${analysis.seo.criticalPages} page(s) have critical duplicate content issues`);
            }
        }

        // Pattern insights
        const scores = [
            analysis.visual.available ? analysis.visual.avgScore : 0,
            analysis.content.available ? analysis.content.avgScore : 0,
            analysis.technical.available ? analysis.technical.avgScore : 0
        ];

        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores.filter(s => s > 0));
        
        if (maxScore - minScore > 0.4) {
            insights.push("📈 Uneven similarity across dimensions - selective copying detected");
        }

        return insights;
    }

    async saveComparisonReport(report) {
        // Save JSON report
        const jsonPath = path.join(this.options.outputDir, `${report.comparison}_final_report.json`);
        await fs.writeFile(jsonPath, JSON.stringify(report, null, 2));

        // Save human-readable summary
        const summaryPath = path.join(this.options.outputDir, `${report.comparison}_summary.txt`);
        const summary = this.generateTextSummary(report);
        await fs.writeFile(summaryPath, summary);

        console.log(`  📄 Saved: ${report.comparison} (${(report.overallSimilarity.score * 100).toFixed(1)}% - ${report.overallSimilarity.classification})`);
    }

    generateTextSummary(report) {
        const { comparison, overallSimilarity, analysis, insights, actionableItems } = report;
        
        const actionableSection = actionableItems && actionableItems.length > 0 ? `

TOP ACTIONABLE ITEMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${actionableItems.map((item, idx) => 
`${idx + 1}. [${item.priority}] ${item.title}
   Category: ${item.category}
   Action: ${item.description}
   ${item.specificAction ? `Specific: ${item.specificAction}` : ''}`
).join('\n\n')}` : '';

        return `
FINAL COMPARISON REPORT
${comparison}
Generated: ${new Date().toLocaleString()}

OVERALL SIMILARITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score: ${(overallSimilarity.score * 100).toFixed(1)}%
Classification: ${overallSimilarity.classification}

DIMENSIONAL BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Visual Similarity:    ${analysis.visual.available ? (analysis.visual.avgScore * 100).toFixed(1) + '%' : 'Not Available'}
📝 Content Similarity:   ${analysis.content.available ? (analysis.content.avgScore * 100).toFixed(1) + '%' : 'Not Available'}
⚙️ Technical Similarity: ${analysis.technical.available ? (analysis.technical.avgScore * 100).toFixed(1) + '%' : 'Not Available'}
🔍 SEO Duplicate Risk:   ${analysis.seo.available ? (analysis.seo.riskScore * 100).toFixed(1) + '% (' + analysis.seo.duplicateRisk + ')' : 'Not Available'}

ANALYSIS COVERAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Visual Analysis:    ${analysis.visual.available ? `✅ (${analysis.visual.totalPages} pages)` : '❌ Not completed'}
📝 Content Analysis:   ${analysis.content.available ? `✅ (${analysis.content.totalPages} pages)` : '❌ Not completed'}
⚙️ Technical Analysis: ${analysis.technical.available ? `✅ (${analysis.technical.totalPages} pages)` : '❌ Not completed'}
🔍 SEO Analysis:       ${analysis.seo.available ? `✅ (${analysis.seo.duplicateRisk} risk)` : '❌ Not completed'}

KEY INSIGHTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${insights.map(insight => `• ${insight}`).join('\n')}
${actionableSection}

${this.generateDetailedBreakdown(report)}
        `.trim();
    }

    generateDetailedBreakdown(report) {
        const { analysis } = report;
        let breakdown = '\nDETAILED METRICS\n' + '━'.repeat(50) + '\n';

        if (analysis.content.available && analysis.content.detailedScores) {
            const scores = analysis.content.detailedScores;
            breakdown += '📝 Content Metrics:\n';
            breakdown += `   Jaccard Similarity:      ${(scores.jaccard * 100).toFixed(1)}%\n`;
            breakdown += `   Cosine Similarity:       ${(scores.cosine * 100).toFixed(1)}%\n`;
            breakdown += `   Semantic Similarity:     ${(scores.semantic * 100).toFixed(1)}%\n`;
            breakdown += `   Topic Modeling:          ${(scores.topicModeling * 100).toFixed(1)}%\n`;
            breakdown += `   Readability Match:       ${(scores.readability * 100).toFixed(1)}%\n`;
            breakdown += '\n';
        }

        if (analysis.technical.available && analysis.technical.detailedScores) {
            const scores = analysis.technical.detailedScores;
            breakdown += '⚙️ Technical Metrics:\n';
            breakdown += `   HTML Structure:          ${(scores.htmlStructure * 100).toFixed(1)}%\n`;
            breakdown += `   Meta Tags:               ${(scores.metaTags * 100).toFixed(1)}%\n`;
            breakdown += `   Frameworks:              ${(scores.frameworks * 100).toFixed(1)}%\n`;
            breakdown += `   Schema Markup:           ${(scores.schemaMarkup * 100).toFixed(1)}%\n`;
            breakdown += '\n';
        }

        if (analysis.seo.available) {
            breakdown += '🔍 SEO Risk Analysis:\n';
            breakdown += `   Duplicate Content Risk:  ${(analysis.seo.riskScore * 100).toFixed(1)}% (${analysis.seo.duplicateRisk})\n`;
            breakdown += `   Critical Pages:          ${analysis.seo.criticalPages}\n`;
            breakdown += '\n';
        }

        return breakdown;
    }

    async generateMasterSummary(finalReports, analysisResults) {
        const masterSummary = {
            timestamp: new Date().toISOString(),
            totalComparisons: finalReports.length,
            highSimilarity: finalReports.filter(r => r.overallSimilarity.score >= 0.8).length,
            moderateSimilarity: finalReports.filter(r => r.overallSimilarity.score >= 0.5 && r.overallSimilarity.score < 0.8).length,
            lowSimilarity: finalReports.filter(r => r.overallSimilarity.score < 0.5).length,
            topSimilarities: finalReports
                .sort((a, b) => b.overallSimilarity.score - a.overallSimilarity.score)
                .map(r => ({
                    comparison: r.comparison,
                    score: r.overallSimilarity.score,
                    classification: r.overallSimilarity.classification,
                    seoRisk: r.analysis.seo.available ? r.analysis.seo.duplicateRisk : 'Unknown'
                })),
            analysisCompleteness: {
                visual: finalReports.filter(r => r.analysis.visual.available).length,
                content: finalReports.filter(r => r.analysis.content.available).length,
                technical: finalReports.filter(r => r.analysis.technical.available).length,
                seo: finalReports.filter(r => r.analysis.seo.available).length
            },
            seoSummary: analysisResults.seo ? {
                criticalIssues: analysisResults.seo.overview?.criticalIssues || 0,
                highPriorityActions: analysisResults.seo.overview?.highPriorityIssues || 0,
                totalActionableItems: analysisResults.seo.overview?.totalActionableItems || 0,
                duplicateContentRisks: {
                    critical: finalReports.filter(r => r.analysis.seo.available && r.analysis.seo.riskScore >= 0.8).length,
                    high: finalReports.filter(r => r.analysis.seo.available && r.analysis.seo.riskScore >= 0.6 && r.analysis.seo.riskScore < 0.8).length,
                    medium: finalReports.filter(r => r.analysis.seo.available && r.analysis.seo.riskScore >= 0.4 && r.analysis.seo.riskScore < 0.6).length,
                    low: finalReports.filter(r => r.analysis.seo.available && r.analysis.seo.riskScore < 0.4).length
                }
            } : null
        };

        // Save master summary
        await fs.writeFile(
            path.join(this.options.outputDir, 'master_final_summary.json'),
            JSON.stringify(masterSummary, null, 2)
        );

        // Generate text version
        const textSummary = this.generateMasterTextSummary(masterSummary);
        await fs.writeFile(
            path.join(this.options.outputDir, 'MASTER_SUMMARY.txt'),
            textSummary
        );

        console.log('\n🎊 FINAL REPORTS COMPLETE!');
        console.log(`   📁 Reports Directory: ${this.options.outputDir}`);
        console.log(`   📊 Total Comparisons: ${masterSummary.totalComparisons}`);
        console.log(`   🚨 High Similarity: ${masterSummary.highSimilarity}`);
        console.log(`   📈 Moderate Similarity: ${masterSummary.moderateSimilarity}`);
        console.log(`   ✅ Low Similarity: ${masterSummary.lowSimilarity}`);
        if (masterSummary.seoSummary) {
            console.log(`   🔍 Critical SEO Issues: ${masterSummary.seoSummary.criticalIssues}`);
            console.log(`   ⚡ High Priority SEO Actions: ${masterSummary.seoSummary.highPriorityActions}`);
        }
    }

    generateMasterTextSummary(summary) {
        const seoSection = summary.seoSummary ? `

SEO ANALYSIS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 Critical Issues: ${summary.seoSummary.criticalIssues}
⚡ High Priority Actions: ${summary.seoSummary.highPriorityActions}
📊 Total Actionable Items: ${summary.seoSummary.totalActionableItems}

DUPLICATE CONTENT RISK DISTRIBUTION
🚨 Critical Risk: ${summary.seoSummary.duplicateContentRisks.critical} comparisons
⚠️ High Risk: ${summary.seoSummary.duplicateContentRisks.high} comparisons
📊 Medium Risk: ${summary.seoSummary.duplicateContentRisks.medium} comparisons
✅ Low Risk: ${summary.seoSummary.duplicateContentRisks.low} comparisons` : '';

        return `
MASTER ANALYSIS SUMMARY
Generated: ${new Date().toLocaleString()}

OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Comparisons: ${summary.totalComparisons}
🚨 High Similarity (≥80%):     ${summary.highSimilarity}
📈 Moderate Similarity (50-80%): ${summary.moderateSimilarity}
✅ Low Similarity (<50%):       ${summary.lowSimilarity}

ANALYSIS COMPLETENESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Visual Analysis:    ${summary.analysisCompleteness.visual}/${summary.totalComparisons} completed
📝 Content Analysis:   ${summary.analysisCompleteness.content}/${summary.totalComparisons} completed
⚙️ Technical Analysis: ${summary.analysisCompleteness.technical}/${summary.totalComparisons} completed
🔍 SEO Analysis:       ${summary.analysisCompleteness.seo}/${summary.totalComparisons} completed

TOP SIMILARITIES WITH SEO RISK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${summary.topSimilarities.map((item, idx) => 
`${idx + 1}. ${item.comparison}
   Similarity: ${(item.score * 100).toFixed(1)}% (${item.classification})
   SEO Risk: ${item.seoRisk}`
).join('\n\n')}
${seoSection}

${summary.highSimilarity > 0 || (summary.seoSummary && summary.seoSummary.duplicateContentRisks.critical > 0) ? 
`⚠️ WARNING: High similarity or critical SEO issues detected!
${summary.highSimilarity > 0 ? `• ${summary.highSimilarity} comparison(s) show high similarity (≥80%)` : ''}
${summary.seoSummary && summary.seoSummary.duplicateContentRisks.critical > 0 ? `• ${summary.seoSummary.duplicateContentRisks.critical} comparison(s) have critical duplicate content risk` : ''}
${summary.seoSummary && summary.seoSummary.criticalIssues > 0 ? `• ${summary.seoSummary.criticalIssues} critical SEO issues require immediate attention` : ''}

RECOMMENDED ACTIONS:
1. Review SEO_ACTION_PLAN.txt for immediate actions
2. Address critical duplicate content issues first
3. Implement high-priority SEO optimizations
4. Differentiate similar content across sites` : 
'✅ No critical similarity or SEO issues detected.'}
        `.trim();
    }

    async generateActionableItemsSummary(seoData) {
        if (!seoData.topPriorityActions) return;

        const actionsSummary = {
            timestamp: new Date().toISOString(),
            totalActions: seoData.topPriorityActions.length,
            criticalActions: seoData.topPriorityActions.filter(a => a.priority === 'CRITICAL'),
            highPriorityActions: seoData.topPriorityActions.filter(a => a.priority === 'HIGH'),
            actionsByCategory: this.categorizeActions(seoData.topPriorityActions)
        };

        // Save actionable items summary
        await fs.writeFile(
            path.join(this.options.outputDir, 'actionable_items_summary.json'),
            JSON.stringify(actionsSummary, null, 2)
        );

        // Generate readable summary
        const readableSummary = `
ACTIONABLE ITEMS SUMMARY
Generated: ${new Date().toLocaleString()}

PRIORITY BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 Critical Actions: ${actionsSummary.criticalActions.length}
⚡ High Priority Actions: ${actionsSummary.highPriorityActions.length}
📊 Total Actions: ${actionsSummary.totalActions}

IMMEDIATE ACTIONS (Critical Priority)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${actionsSummary.criticalActions.slice(0, 5).map((action, idx) => 
`${idx + 1}. ${action.title}
   Category: ${action.category}
   Page: ${action.pageId || action.site}
   Action: ${action.description}
`).join('\n')}

HIGH PRIORITY ACTIONS (Next 7 Days)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${actionsSummary.highPriorityActions.slice(0, 10).map((action, idx) => 
`${idx + 1}. ${action.title}
   Category: ${action.category}
   Action: ${action.description}
`).join('\n')}

ACTIONS BY CATEGORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${Object.entries(actionsSummary.actionsByCategory).map(([category, actions]) => 
`📋 ${category} (${actions.length} items)`
).join('\n')}
        `.trim();

        await fs.writeFile(
            path.join(this.options.outputDir, 'ACTIONABLE_ITEMS_SUMMARY.txt'),
            readableSummary
        );

        console.log(`   📋 Actionable Items Summary: actionable_items_summary.json`);
        console.log(`   📄 Readable Summary: ACTIONABLE_ITEMS_SUMMARY.txt`);
    }

    categorizeActions(actions) {
        const categories = {};
        actions.forEach(action => {
            if (!categories[action.category]) {
                categories[action.category] = [];
            }
            categories[action.category].push(action);
        });
        return categories;
    }
}

// Main execution
async function main() {
    // Parse command line arguments
    const specificFolder = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1];
    
    const generator = new FinalReportGenerator({
        specificFolder: specificFolder
    });
    
    try {
        await generator.initialize();
        await generator.generateFinalReports();
        console.log('\n🎉 All reports generated successfully!');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = FinalReportGenerator;