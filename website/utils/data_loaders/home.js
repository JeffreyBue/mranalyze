// /data-loaders/home.js - Home page specific data
import { DataLoader } from './base.js';

export class HomeDataLoader extends DataLoader {
    async load() {
        await this.loadBaseData();
        
        if (this.apiData.urlprops.pagetype !== 'home') return;

        // Load master summaries for home preview
        const [visualSummary, contentSummary, technicalSummary, seoSummary] = await Promise.all([
            this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/visual_master_summary.json`),
            this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/content_master_summary.json`),
            this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/technical_master_summary.json`),
            this.readJsonFile(`${this.reportFolder}/${this.report}/reports/seo_analysis/seo_master_summary.json`)
        ]);

        const masterSummaries = {
            visual_master_summary: visualSummary,
            content_master_summary: contentSummary,
            technical_master_summary: technicalSummary,
            seo_master_summary: seoSummary
        };

        this.apiData.homePreview = this.buildHomePreviewData(masterSummaries);
        this.apiData.homePreview.report = this.report;
    }

    buildHomePreviewData(masterSummaries) {
        const { 
            visual_master_summary, 
            content_master_summary, 
            technical_master_summary, 
            seo_master_summary 
        } = masterSummaries;
        
        // Get the latest/first comparison from each summary
        const latestVisual = visual_master_summary?.results?.[0];
        const latestContent = content_master_summary?.results?.[0];
        const latestTechnical = technical_master_summary?.results?.[0];
        const latestSEO = seo_master_summary?.duplicateContentRisks?.[0];
        
        // Use the most recent timestamp
        const latestTimestamp = [
            visual_master_summary?.timestamp,
            content_master_summary?.timestamp,
            technical_master_summary?.timestamp,
            seo_master_summary?.timestamp
        ].filter(Boolean).sort().reverse()[0] || new Date().toISOString();
        
        // Get the latest report comparison name
        const latestReport = latestVisual?.comparison || 
                            latestContent?.comparison || 
                            latestTechnical?.comparison || 
                            'unknown_comparison';
        
        // Build the homePreview data structure
        const homePreview = {
            latestReport: latestReport,
            reportTimestamp: latestTimestamp,
            analysisTypes: [
                // Visual Analysis
                {
                    id: 'visual',
                    name: 'Visual Analysis',
                    overallScore: latestVisual?.avgScore || 0,
                    metrics: [
                        {
                            label: 'Color Similarity',
                            score: latestVisual?.metrics?.colors || 0,
                            description: 'Overall color scheme matching across pages'
                        },
                        {
                            label: 'Typography',
                            score: latestVisual?.metrics?.typography || 0,
                            description: 'Font families and text styling consistency'
                        },
                        {
                            label: 'Layout Structure',
                            score: latestVisual?.metrics?.layout || 0,
                            description: 'Page layout and element positioning'
                        }
                    ],
                    insights: this.generateVisualInsights(latestVisual)
                },
                
                // Content Analysis
                {
                    id: 'content',
                    name: 'Content Analysis',
                    overallScore: latestContent?.avgScore || 0,
                    metrics: [
                        {
                            label: 'Jaccard Similarity',
                            score: latestContent?.metrics?.jaccard || 0,
                            description: 'Content overlap and duplicate text analysis'
                        },
                        {
                            label: 'Cosine Similarity',
                            score: latestContent?.metrics?.cosine || 0,
                            description: 'Semantic content meaning and context matching'
                        },
                        {
                            label: 'Topic Modeling',
                            score: latestContent?.metrics?.topic || 0,
                            description: 'Thematic content analysis and subject matter'
                        }
                    ],
                    insights: this.generateContentInsights(latestContent)
                },
                
                // Technical Analysis
                {
                    id: 'technical',
                    name: 'Technical Analysis',
                    overallScore: latestTechnical?.avgScore || 0,
                    metrics: [
                        {
                            label: 'HTML Structure',
                            score: latestTechnical?.detailedScores?.htmlStructure || 0,
                            description: 'Page markup structure and DOM hierarchy'
                        },
                        {
                            label: 'Meta Tags',
                            score: latestTechnical?.detailedScores?.metaTags || 0,
                            description: 'Meta information and head tag matching'
                        },
                        {
                            label: 'Frameworks',
                            score: latestTechnical?.detailedScores?.frameworks || 0,
                            description: 'JavaScript frameworks and library usage'
                        }
                    ],
                    insights: this.generateTechnicalInsights(latestTechnical)
                },
                
                // SEO Analysis
                {
                    id: 'seo',
                    name: 'SEO Analysis',
                    overallScore: latestSEO?.riskScore || 0,
                    metrics: [
                        {
                            label: 'Duplicate Content Risk',
                            score: latestSEO?.riskScore || 0,
                            description: 'Risk of search engine duplicate content penalties'
                        },
                        {
                            label: 'Keyword Cannibalization',
                            score: this.calculateKeywordCannibalizationRisk(seo_master_summary),
                            description: 'Pages competing for the same search terms'
                        },
                        {
                            label: 'Technical SEO Issues',
                            score: this.calculateTechnicalSEORisk(seo_master_summary),
                            description: 'Missing meta tags and technical SEO problems'
                        }
                    ],
                    insights: this.generateSEOInsights(seo_master_summary, latestSEO)
                }
            ]
        };
        
        // Add isFirst flag to analysis types for Mustache templating
        for (var i = 0; i < homePreview.analysisTypes.length; i++) {
            homePreview.analysisTypes[i].isFirst = (i === 0);
        }
        
        return homePreview;
    }

    // Generate visual analysis insights
    generateVisualInsights(visualData) {
        if (!visualData) return ['No visual analysis data available'];
        
        const insights = [];
        const metrics = visualData.metrics || {};
        
        if (metrics.layout > 0.95) {
            insights.push('🚨 Extremely high layout similarity - potential design copying');
        } else if (metrics.layout > 0.8) {
            insights.push('⚠️ High layout similarity detected');
        } else {
            insights.push('✅ Good layout differentiation maintained');
        }
        
        if (metrics.typography > 0.9) {
            insights.push('📝 Typography patterns show high similarity');
        } else {
            insights.push('📝 Typography analysis completed');
        }
        
        if (metrics.colors > 0.85) {
            insights.push('🎨 Color schemes are very similar');
        } else {
            insights.push('🎨 Color palette analysis completed');
        }
        
        return insights.slice(0, 3);
    }

    // Generate content analysis insights
    generateContentInsights(contentData) {
        if (!contentData) return ['No content analysis data available'];
        
        const insights = [];
        const metrics = contentData.metrics || {};
        
        if (metrics.cosine > 0.95) {
            insights.push('🔍 Extremely high semantic similarity detected');
        } else if (metrics.cosine > 0.9) {
            insights.push('🔍 High semantic similarity detected');
        } else {
            insights.push('📄 Semantic content analysis completed');
        }
        
        if (metrics.jaccard > 0.8) {
            insights.push('📄 Significant content overlap patterns found');
        } else if (metrics.jaccard > 0.6) {
            insights.push('📄 Moderate content overlap detected');
        } else {
            insights.push('✅ Content uniqueness maintained');
        }
        
        if (metrics.fingerprint > 0.05) {
            insights.push('🔗 Exact content matches found');
        }
        
        return insights.slice(0, 3);
    }

    // Generate technical analysis insights
    generateTechnicalInsights(technicalData) {
        if (!technicalData) return ['No technical analysis data available'];
        
        const insights = [];
        const scores = technicalData.detailedScores || {};
        
        if (scores.htmlStructure > 0.99) {
            insights.push('🚨 Extremely high HTML structure similarity - potential template copying');
        } else if (scores.htmlStructure > 0.95) {
            insights.push('🏗️ Very high HTML structure similarity detected');
        } else {
            insights.push('🏗️ HTML structure analysis completed');
        }
        
        if (scores.frameworks === 1) {
            insights.push('⚡ Perfect framework match - identical technical stack');
        } else if (scores.frameworks > 0.8) {
            insights.push('⚡ High framework similarity detected');
        } else {
            insights.push('⚡ Framework analysis completed');
        }
        
        if (scores.metaTags > 0.8) {
            insights.push('🏷️ High meta tag similarity found');
        } else {
            insights.push('🏷️ Meta tag analysis completed');
        }
        
        return insights.slice(0, 3);
    }

    // Generate SEO analysis insights
    generateSEOInsights(seoData, latestRisk) {
        if (!seoData) return ['No SEO analysis data available'];
        
        const insights = [];
        const overview = seoData.overview || {};
        
        if (latestRisk?.riskLevel === 'HIGH') {
            insights.push(`⚠️ HIGH duplicate content risk detected (${Math.round(latestRisk.riskScore * 100)}%)`);
        } else if (latestRisk?.riskLevel === 'MEDIUM') {
            insights.push(`🔶 MEDIUM duplicate content risk detected (${Math.round(latestRisk.riskScore * 100)}%)`);
        } else {
            insights.push('✅ Low duplicate content risk');
        }
        
        if (overview.criticalIssues > 0) {
            insights.push(`🚨 ${overview.criticalIssues} critical SEO issue${overview.criticalIssues > 1 ? 's' : ''} found`);
        }
        
        if (overview.highPriorityIssues > 0) {
            insights.push(`🔑 ${overview.highPriorityIssues} high-priority SEO issue${overview.highPriorityIssues > 1 ? 's' : ''} identified`);
        }
        
        return insights.slice(0, 3);
    }

    // Calculate keyword cannibalization risk
    calculateKeywordCannibalizationRisk(seoData) {
        if (!seoData?.actionsByCategory) return 0;
        
        const keywordActions = seoData.actionsByCategory['Keyword Strategy'] || [];
        const totalActions = seoData.overview?.totalActionableItems || 1;
        
        return Math.min(keywordActions.length / totalActions, 1);
    }

    // Calculate technical SEO risk
    calculateTechnicalSEORisk(seoData) {
        if (!seoData?.actionsByCategory) return 0;
        
        const technicalActions = seoData.actionsByCategory['Technical SEO'] || [];
        const totalActions = seoData.overview?.totalActionableItems || 1;
        
        return Math.min(technicalActions.length / totalActions, 1);
    }
}
