import { DataLoader } from './base.js';

export class PageDataLoader extends DataLoader {
    async load() {
        await this.loadBaseData();
        
        if (this.apiData.urlprops.pagetype !== 'report_page') return;

        const siteId = this.apiData.urlprops.params.find(param => param.site)?.site;
        const pageId = this.apiData.urlprops.params.find(param => param.page)?.page;


        // Load the report data
        const page_data = await this.readJsonFile(`${this.reportFolder}/${this.report}/scraped_sites/${siteId}/${pageId}/page_data.json`);
        const page_report = await this.readTextFile(`${this.reportFolder}/${this.report}/scraped_sites/${siteId}/${pageId}/content.txt`);
        if (!page_data) {
            console.warn(`No page data found for site: ${siteId}, page: ${pageId}`);
            this.apiData.page_data = {};
            this.apiData.page_report = '';
            throw new Error(`No page data found for site: ${siteId}, page: ${pageId}`);
        }
        this.apiData.page_data = page_data || {};
        this.apiData.page_report = page_report.replace(/\n/g, '<br/>');

        this.apiData.page_data.technical.schemas = this.apiData.page_data.technical.schemas.map(schema => {
            const asText = JSON.stringify(schema, null, 4);
            return {
                ...schema,
                asText: asText,
                asHtml: `<pre class="code-block">${asText}</pre>`
            };
        });

        this.apiData.page_data.site = siteId;
    }
}
