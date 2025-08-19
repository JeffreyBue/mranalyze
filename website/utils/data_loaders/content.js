// /data-loaders/content.js - Content analysis data loader
import { DataLoader } from './base.js';

export class ContentDataLoader extends DataLoader {
    async load() {
        await this.loadBaseData();
        
        const pagetype = this.apiData.urlprops.pagetype;

        if (pagetype === 'report_content') {
            await this.loadContentSummary();
        } else if (pagetype === 'report_content_compare') {
            await this.loadContentCompare();
        } else if (pagetype === 'report_content_page') {
            await this.loadContentPage();
        }
    }

    async loadContentSummary() {
        const contentSummary = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/content_master_summary.json`);
        this.apiData.contentSummary = contentSummary || {};
    }

    async loadContentCompare() {
        const comparison = this.apiData.urlprops.params.find(param => param.comparison)?.comparison;
        
        if (!comparison) {
            this.apiData.contentComparison = {};
            return;
        }

        const contentComparison = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/${comparison}_content_summary.json`);
        
        // Load content comparison files
        const contentComparisonFiles = this.apiData.files.contentFiles?.filter(file => 
            file.includes(comparison)
        ) || [];

        const contentCompareObjects = await Promise.all(
            contentComparisonFiles.map(async (item) => {
                return this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/content/${item}`);
            })
        );

        if (contentComparison) {
            contentComparison.contentFiles = contentComparisonFiles.map((file, index) => ({
                titles: {
                    page1: contentCompareObjects[index]?.page1?.pageId || '',
                    page2: contentCompareObjects[index]?.page2?.pageId || ''
                },
                url: file,
                overallSimilarity: parseFloat((contentCompareObjects[index]?.content?.overallScore * 100).toFixed(0)) || 0
            }));
        }

        this.apiData.contentComparison = contentComparison || {};
    }

    async loadContentPage() {
        const page = this.apiData.urlprops.params.find(param => param.page)?.page;
        
        if (!page) {
            this.apiData.contentPage = {};
            return;
        }

        const contentPage = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/content/${page}.json`);
        this.apiData.contentPage = contentPage || {};
    }
}
