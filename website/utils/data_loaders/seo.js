// /data-loaders/seo.js - SEO specific data loaders
import { DataLoader } from './base.js';

export class SeoDataLoader extends DataLoader {
    async load() {
        await this.loadBaseData();
        
        const pagetype = this.apiData.urlprops.pagetype;

        if (pagetype === 'report_seo') {
            await this.loadSeoSummary();
        } else if (pagetype === 'report_seo_page') {
            await this.loadSeoPage();
        } else if (pagetype === 'report_seo_compare') {
            await this.loadSeoCompare();
        }
    }

    async loadSeoSummary() {
        const [seoSummaries, seoMasterSummary] = await Promise.all([
            Promise.all(
                this.apiData.compares.map(comparison => 
                    this.readJsonFile(`${this.reportFolder}/${this.report}/reports/seo_analysis/comparison_reports/${comparison}_seo_comparison.json`)
                )
            ),
            this.readJsonFile(`${this.reportFolder}/${this.report}/reports/seo_analysis/seo_master_summary.json`)
        ]);

        // Transform siteSpecificSummaries object to array
        if (seoMasterSummary?.siteSpecificSummaries) {
            seoMasterSummary.siteSpecificSummaries = this.objectToArray(seoMasterSummary.siteSpecificSummaries);
        }

        this.apiData.seo_summaries = seoSummaries.filter(Boolean);
        this.apiData.seo_master_summary = seoMasterSummary;
    }

    async loadSeoPage() {
        const pageReport = this.apiData.urlprops.params.find(param => param.page_report)?.page_report;
        
        if (!pageReport) {
            this.apiData.seoAnalysis = {};
            return;
        }

        const seoAnalysis = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/seo_analysis/page_reports/${pageReport}_seo.json`);
        
        if (seoAnalysis?.seoAnalysis) {
            // Transform keyword density object to array
            if (seoAnalysis.seoAnalysis.contentQuality?.keywordDensity) {
                seoAnalysis.seoAnalysis.contentQuality.keywordDensity = this.objectToArray(
                    seoAnalysis.seoAnalysis.contentQuality.keywordDensity, 'word'
                ).map(item => ({
                    word: item.word,
                    density: item.value
                }));
            }

            // Transform keyword placement object to array
            if (seoAnalysis.seoAnalysis.keywordOptimization?.keywordPlacement) {
                seoAnalysis.seoAnalysis.keywordOptimization.keywordPlacement = this.objectToArray(
                    seoAnalysis.seoAnalysis.keywordOptimization.keywordPlacement, 'keyword'
                ).map(item => ({
                    keyword: item.keyword,
                    score: item.score,
                    inTitle: item.inTitle,
                    inMetaDesc: item.inMetaDesc,
                    inHeadings: item.inHeadings,
                    density: item.density
                }));
            }
        }

        this.apiData.seoAnalysis = seoAnalysis || {};
    }

    async loadSeoCompare() {
        const comparison = this.apiData.urlprops.params.find(param => param.comparison)?.comparison;
        
        if (!comparison) {
            this.apiData.seoComparison = {};
            return;
        }

        const seoComparison = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/seo_analysis/comparison_reports/${comparison}_seo_comparison.json`);
        
        if (seoComparison?.detailedResults) {
            seoComparison.siteSpecificSummaries = this.objectToArray(seoComparison.detailedResults);
        }

        this.apiData.seoComparison = seoComparison || {};
    }
}
