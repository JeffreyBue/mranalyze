// /data-loaders/index.js - Main orchestrator
import { HomeDataLoader } from './data_loaders/home.js';
import { ReportDataLoader } from './data_loaders/report.js';
import { SeoDataLoader } from './data_loaders/seo.js'; // Loads all Three SEO page types
import { VisualDataLoader } from './data_loaders/visual.js'; // Loads all Three Visual page types
import { ContentDataLoader } from './data_loaders/content.js'; // Loads all Three Content page types
import { TechnicalDataLoader } from './data_loaders/technical.js'; // Loads all Three Technical page types
import { PageDataLoader } from './data_loaders/page.js';

// Define page types and their loaders
const dataLoaderConfig = {
    home: [HomeDataLoader],
    report: [ReportDataLoader],
    
    // // SEO pages
    report_seo: [SeoDataLoader],
    report_seo_page: [SeoDataLoader],
    report_seo_compare: [SeoDataLoader],
    
    // // Visual pages  
    report_visual: [VisualDataLoader],
    report_visual_compare: [VisualDataLoader], 
    report_visual_page: [VisualDataLoader],
    
    // // Content pages
    report_content: [ContentDataLoader],
    report_content_compare: [ContentDataLoader],
    report_content_page: [ContentDataLoader],
    
    // // Technical pages
    report_technical: [TechnicalDataLoader],
    report_technical_compare: [TechnicalDataLoader],
    report_technical_page: [TechnicalDataLoader],

    report_page: [PageDataLoader] // Specific page data loader
};

// Helper to get loaders for a page type
function getLoadersForPageType(pagetype, includeTypes = []) {
    const baseLoaders = dataLoaderConfig[pagetype] || [];
    
    // Add additional loaders if requested
    const additionalLoaders = includeTypes.reduce((acc, type) => {
        const typeLoaders = dataLoaderConfig[type] || [];
        return [...acc, ...typeLoaders];
    }, []);
    
    // Remove duplicates
    const allLoaders = [...baseLoaders, ...additionalLoaders];
    return [...new Set(allLoaders)];
}

export default async function apiDataTrx(apiData) {
    const pagetype = apiData.urlprops?.pagetype;
    const includeTypes = apiData.urlprops?.includeTypes || []; // Optional additional data types
    
    if (!pagetype) {
        console.warn('No pagetype specified');
        return apiData;
    }

    // Get all loaders needed for this page type
    const LoaderClasses = getLoadersForPageType(pagetype, includeTypes);
    
    if (LoaderClasses.length === 0) {
        console.warn(`No loaders found for pagetype: ${pagetype}`);
        return apiData;
    }

    // Load data from each relevant loader
    try {
        for (const LoaderClass of LoaderClasses) {
            const loader = new LoaderClass(apiData);
            await loader.load();
        }
    } catch (error) {
        console.error(`Error loading data for ${pagetype}:`, error);
        // Continue with partial data rather than failing completely
    }

    return apiData;
}

// Usage examples:
// 
// Basic usage:
// const enrichedApiData = await apiDataTrx(apiData);
//
// Include additional data types:
// apiData.urlprops.includeTypes = ['report_seo', 'report_visual'];
// const enrichedApiData = await apiDataTrx(apiData);
//
// Add new page types to config:
// dataLoaderConfig.custom_dashboard = [ReportDataLoader, SeoDataLoader, VisualDataLoader];