// /data-loaders/base.js - Common utilities and shared data
import readFromFile from '#APPROOT/readFromFile.js';

export class DataLoader {
    constructor(apiData) {
        this.reportFolder = `/shared-data/completed_reports`;
        this.apiData = apiData;
        this.report = apiData.urlprops?.params?.find(param => param.report)?.report || apiData.reports[0];
        this.cache = new Map(); // Cache for loaded files
    }

    // Common file reading with caching
    async readJsonFile(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }
        
        try {
            const content = await readFromFile(path);
            const json = JSON.parse(content);
            this.cache.set(path, json);
            return json;
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return null;
        }
    }

    async readTextFile(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }
        
        try {
            const content = await readFromFile(path);
            this.cache.set(path, content);
            return content;
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return '';
        }
    }

    // Load base/shared data that many pages need
    async loadBaseData() {
        if (this.apiData._baseDataLoaded) return;

        // Core report data
        this.apiData.report = this.report;
        
        // Master summaries (needed by multiple page types)
        const [masterFinalSummary, masterFinalText, masterActionableItems, masterScraping] = await Promise.all([
            this.readJsonFile(`${this.reportFolder}/${this.report}/reports/final_reports/master_final_summary.json`),
            this.readTextFile(`${this.reportFolder}/${this.report}/reports/final_reports/MASTER_SUMMARY.txt`),
            this.readJsonFile(`${this.reportFolder}/${this.report}/reports/final_reports/actionable_items_summary.json`),
            this.readJsonFile(`${this.reportFolder}/${this.report}/master_scraping_summary.json`)
        ]);

        this.apiData.master_final_summary = masterFinalSummary;
        this.apiData.master_final_text = masterFinalText?.replace(/\n/g, '<br/>') || '';
        this.apiData.master_actionable_items = masterActionableItems;
        this.apiData.master_scraping = masterScraping;

        // Map individual pages to their reports
        if (masterScraping?.scraped_sites) {
            this.apiData.files.page = masterScraping.scraped_sites.map((site) => {
                return site.pages.map((page) => ({
                    url: `${site.directory}_page_${page.pageId.split('_')[0]}`,
                    pageUrl: page.url
                }));
            }).flat();
        }

        // Get comparison strings
        if (masterFinalSummary?.topSimilarities) {
            this.apiData.compares = masterFinalSummary.topSimilarities.map(item => item.comparison);
        }

        this.apiData._baseDataLoaded = true;
    }

    // Transform objects to arrays for Mustache (common pattern)
    objectToArray(obj, keyName = 'key') {
        if (!obj) return [];
        return Object.entries(obj).map(([key, value]) => ({
            [keyName]: key,
            ...(typeof value === 'object' ? value : { value })
        }));
    }
}
