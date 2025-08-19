const fs = require('fs').promises;
const path = require('path');
const AnalysisFolderFinder = require('../utilities/folder_finder');

class LegacyReportGenerator {
    constructor(options = {}) {
        this.options = {
            cacheDir: './reports/analysis_cache', // Will be updated dynamically
            outputDir: './reports/legacy_reports', // Will be updated dynamically
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
        this.options.outputDir = path.join(this.analysisDir, 'reports/legacy_reports');
        
        await fs.mkdir(this.options.outputDir, { recursive: true });
        
        console.log('📊 Legacy Report Generator Initialized');
        console.log(`📁 Using analysis directory: ${this.analysisDir}`);
        console.log(`📁 Reading from cache: ${this.options.cacheDir}`);
        console.log(`📁 Output directory: ${this.options.outputDir}`);
    }
    
    async loadAnalysisResults() {
        const results = {
            visual: null,
            content: null,
            technical: null
        };

        try {
            // Load master summaries
            const visualPath = path.join(this.options.cacheDir, 'visual_master_summary.json');
            const contentPath = path.join(this.options.cacheDir, 'content_master_summary.json');
            const technicalPath = path.join(this.options.cacheDir, 'technical_master_summary.json');

            if (await this.fileExists(visualPath)) {
                results.visual = JSON.parse(await fs.readFile(visualPath, 'utf8'));
            }

            if (await this.fileExists(contentPath)) {
                results.content = JSON.parse(await fs.readFile(contentPath, 'utf8'));
            }

            if (await this.fileExists(technicalPath)) {
                results.technical = JSON.parse(await fs.readFile(technicalPath, 'utf8'));
            }

            console.log(`📈 Loaded analysis results:`);
            console.log(`   🎨 Visual: ${results.visual ? '✅' : '❌'}`);
            console.log(`   📝 Content: ${results.content ? '✅' : '❌'}`);
            console.log(`   ⚙️ Technical: ${results.technical ? '✅' : '❌'}`);

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

    async generateReports() {
        const analysisResults = await this.loadAnalysisResults();
        
        // Get all unique comparisons
        const allComparisons = this.extractAllComparisons(analysisResults);
        
        console.log(`📊 Generating reports for ${allComparisons.length} comparisons...`);
        
        const finalReports = [];
        
        for (const comparison of allComparisons) {
            const report = await this.generateComparisonReport(comparison, analysisResults);
            finalReports.push(report);
            
            // Save individual comparison report
            await this.saveComparisonReport(report);
        }
        
        // Generate master summary
        await this.generateMasterSummary(finalReports);
        
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
                technical: this.findAnalysisResult(analysisResults.technical, comparisonName)
            }
        };

        // Calculate overall similarity
        report.overallSimilarity = this.calculateOverallSimilarity(report.analysis);
        
        // Generate insights
        report.insights = this.generateInsights(report);
        
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

    calculateOverallSimilarity(analysis) {
        const weights = { visual: 0.3, content: 0.5, technical: 0.2 };
        let totalWeight = 0;
        let weightedScore = 0;

        Object.entries(weights).forEach(([dimension, weight]) => {
            if (analysis[dimension].available) {
                totalWeight += weight;
                weightedScore += analysis[dimension].avgScore * weight;
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
                technical: analysis.technical.available ? analysis.technical.avgScore : null
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
        const { comparison, overallSimilarity, analysis, insights } = report;
        
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

ANALYSIS COVERAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Visual Analysis:    ${analysis.visual.available ? `✅ (${analysis.visual.totalPages} pages)` : '❌ Not completed'}
📝 Content Analysis:   ${analysis.content.available ? `✅ (${analysis.content.totalPages} pages)` : '❌ Not completed'}
⚙️ Technical Analysis: ${analysis.technical.available ? `✅ (${analysis.technical.totalPages} pages)` : '❌ Not completed'}

KEY INSIGHTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${insights.map(insight => `• ${insight}`).join('\n')}

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

        return breakdown;
    }

    async generateMasterSummary(finalReports) {
        const masterSummary = {
            timestamp: new Date().toISOString(),
            totalComparisons: finalReports.length,
            highSimilarity: finalReports.filter(r => r.overallSimilarity.score >= 0.8).length,
            moderateSimilarity: finalReports.filter(r => r.overallSimilarity.score >= 0.5 && r.overallSimilarity.score < 0.8).length,
            lowSimilarity: finalReports.filter(r => r.overallSimilarity.score < 0.5).length,
            topSimilarities: finalReports
                .sort((a, b) => b.overallSimilarity.score - a.overallSimilarity.score)
                .slice(0, 5)
                .map(r => ({
                    comparison: r.comparison,
                    score: r.overallSimilarity.score,
                    classification: r.overallSimilarity.classification
                })),
            analysisCompleteness: {
                visual: finalReports.filter(r => r.analysis.visual.available).length,
                content: finalReports.filter(r => r.analysis.content.available).length,
                technical: finalReports.filter(r => r.analysis.technical.available).length
            }
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
    }

    generateMasterTextSummary(summary) {
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

TOP SIMILARITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${summary.topSimilarities.map((item, idx) => 
`${idx + 1}. ${item.comparison}
   Score: ${(item.score * 100).toFixed(1)}% (${item.classification})`
).join('\n\n')}

${summary.highSimilarity > 0 ? 
`⚠️ WARNING: ${summary.highSimilarity} comparison(s) show high similarity (≥80%)
These may indicate duplicate sites, template usage, or content copying.` : 
'✅ No high-similarity pairs detected.'}
        `.trim();
    }
}

// Main execution
async function main() {
    // Parse command line arguments
    const specificFolder = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1];
    
    const generator = new LegacyReportGenerator({
        specificFolder: specificFolder
    });
    
    try {
        await generator.initialize();
        await generator.generateReports();
        console.log('\n🎉 Legacy reports generated successfully!');
    } catch (error) {
        console.error('💥 Error:', error);
    }
}

if (require.main === module) {
    main();
}

module.exports = LegacyReportGenerator;