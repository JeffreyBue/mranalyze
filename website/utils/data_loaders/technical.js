// /data-loaders/technical.js - Technical analysis data loader
import { DataLoader } from './base.js';

export class TechnicalDataLoader extends DataLoader {
    async load() {
        await this.loadBaseData();
        
        const pagetype = this.apiData.urlprops.pagetype;

        if (pagetype === 'report_technical') {
            await this.loadTechnicalSummary();
        } else if (pagetype === 'report_technical_compare') {
            await this.loadTechnicalCompare();
        } else if (pagetype === 'report_technical_page') {
            await this.loadTechnicalPage();
        }
    }

    async loadTechnicalSummary() {
        const technicalSummary = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/technical_master_summary.json`);
        this.apiData.technicalSummary = technicalSummary || {};
    }

    async loadTechnicalCompare() {
        const comparison = this.apiData.urlprops.params.find(param => param.comparison)?.comparison;
        
        if (!comparison) {
            this.apiData.technicalComparison = {};
            return;
        }

        const technicalComparison = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/${comparison}_technical_summary.json`);
        
        // Load technical comparison files
        const technicalComparisonFiles = this.apiData.files.technicalFiles?.filter(file => 
            file.includes(comparison)
        ) || [];

        const technicalCompareObjects = await Promise.all(
            technicalComparisonFiles.map(async (item) => {
                return this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/technical/${item}`);
            })
        );

        if (technicalComparison) {
            technicalComparison.technicalFiles = technicalComparisonFiles.map((file, index) => ({
                titles: {
                    page1: technicalCompareObjects[index]?.page1?.pageId || '',
                    page2: technicalCompareObjects[index]?.page2?.pageId || ''
                },
                url: file,
                overallSimilarity: parseFloat((technicalCompareObjects[index]?.technical?.overallScore * 100).toFixed(0)) || 0
            }));
        }

        this.apiData.technicalComparison = technicalComparison || {};
    }

    async loadTechnicalPage() {
        const page = this.apiData.urlprops.params.find(param => param.page)?.page;
        
        if (!page) {
            this.apiData.technicalPage = {};
            return;
        }

        const technicalPage = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/technical/${page}.json`);
        this.apiData.technicalPage = technicalPage || {};
    }
}
