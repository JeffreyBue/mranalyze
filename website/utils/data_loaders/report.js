// /data-loaders/report.js - Main report page data
import { DataLoader } from './base.js';

export class ReportDataLoader extends DataLoader {
    async load() {
        await this.loadBaseData();
        
        if (this.apiData.urlprops.pagetype !== 'report') return;

        const summaries = this.apiData.master_final_summary.topSimilarities.map(item => 
            `${item.comparison}_final_report.json`
        );

        let summariesJson = await Promise.all(
            summaries.map(async (item) => {
                return this.readJsonFile(`${this.reportFolder}/${this.report}/reports/final_reports/${item}`);
            })
        );

        // Transform and enrich summaries
        summariesJson = summariesJson.filter(Boolean).map(summary => ({
            ...summary,
            // Add boolean flags
            isCritical: summary.analysis?.seo?.duplicateRisk === 'HIGH',
            isVerySimilar: summary.overallSimilarity?.classification === 'VERY_SIMILAR',
            hasHighRisk: summary.overallSimilarity.score > 0.7,

            // Add computed content
            riskIcon: summary.analysis?.seo?.duplicateRisk === 'HIGH' ? '🚨' : '✅',
            classificationBadge: summary.overallSimilarity?.classification === 'VERY_SIMILAR' ? 'VERY SIMILAR' : 'SIMILAR',

            // Pre-filter arrays
            compareCriticalItems: summary.actionableItems?.filter(item => item.priority === 'CRITICAL') || [],
            compareHighItems: summary.actionableItems?.filter(item => item.priority === 'HIGH') || [],
            compareMediumItems: summary.actionableItems?.filter(item => item.priority === 'MEDIUM') || [],
            compareLowItems: summary.actionableItems?.filter(item => item.priority === 'LOW') || [],
            showCompare: summary.actionableItems?.length > 0
        }));

        this.apiData.summaries = summariesJson;
        this.apiData.summary = this.buildSummaryStats(summariesJson);
    }

    buildSummaryStats(summariesJson) {
        return {
            highRiskSites: summariesJson.filter(item => item.hasHighRisk).length,
            actionableItems: {
                criticalItems: summariesJson.reduce((acc, item) => acc + (item.criticalItems?.length || 0), 0),
                highItems: summariesJson.reduce((acc, item) => acc + (item.highItems?.length || 0), 0),
                mediumItems: summariesJson.reduce((acc, item) => acc + (item.mediumItems?.length || 0), 0),
                lowItems: summariesJson.reduce((acc, item) => acc + (item.lowItems?.length || 0), 0),
                totalItems: summariesJson.reduce((acc, item) => acc + (item.actionableItems?.length || 0), 0)
            }
        };
    }
}
