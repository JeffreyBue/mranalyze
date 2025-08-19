// /data-loaders/visual.js - Visual analysis data loader  
import { DataLoader } from './base.js';

export class VisualDataLoader extends DataLoader {
    async load() {
        await this.loadBaseData();
        
        const pagetype = this.apiData.urlprops.pagetype;

        if (pagetype === 'report_visual') {
            await this.loadVisualSummary();
        } else if (pagetype === 'report_visual_compare') {
            await this.loadVisualCompare();
        } else if (pagetype === 'report_visual_page') {
            await this.loadVisualPage();
        }
    }

    async loadVisualSummary() {
        const visualSummary = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/visual_master_summary.json`);
        
        if (visualSummary?.results) {
            visualSummary.summaries = await Promise.all(
                visualSummary.results.map(async (item) => {
                    return this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/${item.comparison}_visual_summary.json`);
                })
            );
        }

        this.apiData.visualSummary = visualSummary || {};
    }

    async loadVisualCompare() {
        const comparison = this.apiData.urlprops.params.find(param => param.comparison)?.comparison;
        
        if (!comparison) {
            this.apiData.visualComparison = {};
            return;
        }

        const visualComparison = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/${comparison}_visual_summary.json`);
        
        // Load visual comparison files
        const visualComparisonFiles = this.apiData.files.visualFiles?.filter(file => 
            file.includes(comparison)
        ) || [];

        const visualCompareObjects = await Promise.all(
            visualComparisonFiles.map(async (item) => {
                return this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/visual/${item}`);
            })
        );

        if (visualComparison) {
            visualComparison.visualFiles = visualComparisonFiles.map((file, index) => ({
                titles: {
                    page1: visualCompareObjects[index]?.page1?.pageId || '',
                    page2: visualCompareObjects[index]?.page2?.pageId || ''
                },
                url: file,
                overallSimilarity: parseFloat((visualCompareObjects[index]?.visual?.overallScore * 100).toFixed(0)) || 0
            }));
        }

        this.apiData.visualComparison = visualComparison || {};
    }

    async loadVisualPage() {
        const page = this.apiData.urlprops.params.find(param => param.page)?.page;
        
        if (!page) {
            this.apiData.visualPage = {};
            return;
        }

        const visualPage = await this.readJsonFile(`${this.reportFolder}/${this.report}/reports/analysis_cache/visual/${page}.json`);
        
        if (visualPage?.visual) {
            // Transform objects to arrays for Mustache
            if (visualPage.visual.layout?.details) {
                visualPage.visual.layout.details = this.objectToArray(visualPage.visual.layout.details, 'name');
            }

            if (visualPage.visual.colors?.elementComparisons) {
                visualPage.visual.colors.elementComparisons = this.objectToArray(visualPage.visual.colors.elementComparisons, 'elementName');
            }

            if (visualPage.visual.typography?.elementComparisons) {
                visualPage.visual.typography.elementComparisons = this.objectToArray(visualPage.visual.typography.elementComparisons, 'elementName');
            }

            if (visualPage.visual.responsiveDesign?.viewportScores) {
                visualPage.visual.responsiveDesign.viewportScores = this.objectToArray(visualPage.visual.responsiveDesign.viewportScores, 'viewportName');
            }

            if (visualPage.visual.screenshots?.viewports) {
                visualPage.visual.screenshots.viewports = this.objectToArray(visualPage.visual.screenshots.viewports, 'viewportName');
            }
        }

        this.apiData.visualPage = visualPage || {};
    }
}
