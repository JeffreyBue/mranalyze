const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');
const { url } = require('inspector');

puppeteer.use(StealthPlugin());

class WebScraper {
    constructor(options = {}) {
        // We'll create the date folder using the utility instead
        // during initialization to ensure consistency
        this.dateFolder = null;
        
        this.options = {
            headless: 'new',
            timeout: 30000,
            baseOutputDir: null,  // Will be set during initialization
            concurrent: 2,
            urlFile: './urls.txt',
            useIndexedFolders: true,  // Whether to use indexed folders (1_analyze_...)
            ...options
        };
        
        this.browser = null;
        this.results = [];
        this.outputDir = null;
        this.urls = [];
    }

    async initialize() {
        // Parse command line arguments
        this.parseCommandLineArgs();
        
        // Create a single date-based root folder
        const folderName = this.options.folderName || `analyze_${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
        const AnalysisFolderFinder = require('../utilities/folder_finder');
        const analysisFolderPath = await AnalysisFolderFinder.createAnalysisFolder('.', folderName);
        
        // Get just the folder name (not the full path)
        this.dateFolder = path.basename(analysisFolderPath);
        this.options.baseOutputDir = path.join(analysisFolderPath, 'scraped_sites');
        
        // Create the scraped_sites subfolder
        await fs.mkdir(this.options.baseOutputDir, { recursive: true });
        
        // Load URLs first to determine domain
        this.urls = await this.loadUrlsFromFile(this.options.urlFile);
        
        if (this.urls.length === 0) {
            throw new Error('No valid URLs found in the file');
        }

        // Create domain-based output directory
        this.outputDir = this.createOutputDirectoryName(this.options.urlFile);
        await fs.mkdir(this.outputDir, { recursive: true });
        
        console.log(`📁 Analysis folder: ${this.dateFolder}`);
        console.log(`📁 Output directory: ${this.outputDir}`);
        
        // Launch browser
        this.browser = await puppeteer.launch({
            headless: this.options.headless,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });
        
        console.log('🚀 Browser initialized');
    }

    parseCommandLineArgs() {
        const args = process.argv.slice(2);
        
        // Look for URL file argument and folder name option
        for (let i = 0; i < args.length; i++) {
            if (args[i].startsWith('--') && args[i].includes('.txt')) {
                this.options.urlFile = args[i].substring(2);
            } else if (args[i].endsWith('.txt')) {
                this.options.urlFile = args[i];
            } else if (args[i].startsWith('--folder=')) {
                this.options.folderName = args[i].split('=')[1];
            }
        }
        
        console.log(`📝 Using URL file: ${this.options.urlFile}`);
        if (this.options.folderName) {
            console.log(`📁 Using specified folder: ${this.options.folderName}`);
        }
    }

    createOutputDirectoryName(urlFileName) {
        try {
            const basename = path.basename(urlFileName, '.txt');
            // Sanitize filename for directory use
            const cleanName = basename.replace(/[^a-zA-Z0-9_-]/g, '_');
            const datetime = new Date().toISOString().split('T')[0].replace(/-/g, '') + 
                '_' + new Date().toTimeString().slice(0,5).replace(':', '');
            const dirName = `${cleanName}_${datetime}`;

            return path.join(this.options.baseOutputDir, dirName);
        } catch (error) {
            // Fallback if URL parsing fails
            const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
            return path.join(this.options.baseOutputDir, `unknown_domain_${timestamp}`);
        }
    }

    async loadUrlsFromFile(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const urls = content
                .split('\n')
                .map(url => url.trim())
                .filter(url => url && url.startsWith('http'));
            
            console.log(`📋 Loaded ${urls.length} URLs from ${filePath}`);
            return urls;
        } catch (error) {
            console.error('❌ Error loading URLs:', error.message);
            return [];
        }
    }

    getPageIdentifier(url, index) {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter(p => p);
            
            // Create readable path identifier
            let pathIdentifier;
            if (pathParts.length > 0) {
                pathIdentifier = pathParts.join('_');
            } else {
                pathIdentifier = 'homepage';
            }
            
            // Clean up the identifier
            pathIdentifier = pathIdentifier.replace(/[^a-zA-Z0-9_-]/g, '_');
            
            // Format: 001_people_john-smith (index + path)
            const paddedIndex = String(index + 1).padStart(3, '0');
            return `${paddedIndex}_${pathIdentifier}`;
            
        } catch (error) {
            const paddedIndex = String(index + 1).padStart(3, '0');
            return `${paddedIndex}_unknown_page`;
        }
    }

    async createPageDirectory(pageId) {
        const pageDir = path.join(this.outputDir, pageId);  
        await fs.mkdir(pageDir, { recursive: true });
        return pageDir;
    }

    async scrapePage(url, index) {
        const page = await this.browser.newPage();
        const pageId = this.getPageIdentifier(url, index);
        
        try {
            console.log(`🔍 [${index + 1}/${this.urls.length}] Scraping: ${url} → ${pageId}`);
            
            // Set viewport and user agent
            await page.setViewport({ width: 1200, height: 800 });
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
            
            // Navigate to page with retries
            try {
                await page.goto(url, { 
                    waitUntil: 'domcontentloaded', 
                    timeout: this.options.timeout 
                });
            } catch (navError) {
                console.warn(`⚠️ Navigation timeout for ${url}, trying with reduced timeout...`);
                await page.goto(url, { 
                    waitUntil: 'domcontentloaded', 
                    timeout: 15000 
                });
            }

            // Wait for content to load
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Create directory for this page
            const pageDir = await this.createPageDirectory(pageId);

            // Extract and save all data
            const pageData = {
                url,
                pageId,
                urlIndex: index + 1,
                scrapedAt: new Date().toISOString(),
                content: await this.extractContent(page),
                visual: await this.extractVisualData(page),
                technical: await this.extractTechnicalData(page)
            };

            // Save individual data files
            await this.savePageData(pageDir, pageData);

            // Take screenshot
            const screenshot = await page.screenshot({ fullPage: true });
            await fs.writeFile(path.join(pageDir, 'screenshot.png'), screenshot);

            if (this.options.captureViewports !== false) {
                console.log(`    📱 Capturing responsive views...`);
                pageData.visual.viewportData = await this.captureMultiViewport(page, pageDir);
            }

            console.log(`✅ Successfully scraped: ${pageId}`);
            return { pageId, url, urlIndex: index + 1, status: 'success', directory: pageDir };

        } catch (error) {
            console.error(`❌ Error scraping ${url}:`, error.message);
            return { pageId, url, urlIndex: index + 1, status: 'error', error: error.message };
        } finally {
            await page.close();
        }
    }

    async extractContent(page) {
        return await page.evaluate(() => {
            const cleanText = (text) => text ? text.replace(/\s+/g, ' ').trim() : '';

            // Meta information
            const title = document.querySelector('title')?.textContent || '';
            const description = document.querySelector('meta[name="description"]')?.content || '';
            const keywords = document.querySelector('meta[name="keywords"]')?.content || '';

            // Headings
            const h1 = Array.from(document.querySelectorAll('h1')).map(h => cleanText(h.textContent));
            const h2 = Array.from(document.querySelectorAll('h2')).map(h => cleanText(h.textContent));
            const h3 = Array.from(document.querySelectorAll('h3')).map(h => cleanText(h.textContent));

            // Main content
            const paragraphs = Array.from(document.querySelectorAll('p'))
                .map(p => cleanText(p.textContent))
                .filter(text => text.length > 10);

            // Navigation
            const navLinks = Array.from(document.querySelectorAll('nav a, .nav a, .navigation a'))
                .map(a => ({
                    text: cleanText(a.textContent),
                    href: a.href
                }));

            // Forms
            const formElements = Array.from(document.querySelectorAll('label, input[placeholder], button'))
                .map(el => cleanText(el.textContent || el.placeholder || ''))
                .filter(text => text.length > 0);

            // Full text content
            const bodyText = cleanText(document.body.innerText);

            return {
                url: location.href,
                meta: { title, description, keywords },
                headings: { h1, h2, h3 },
                paragraphs,
                navigation: navLinks,
                forms: formElements,
                fullText: bodyText,
                stats: {
                    wordCount: bodyText.split(/\s+/).length,
                    charCount: bodyText.length,
                    imageCount: document.querySelectorAll('img').length,
                    linkCount: document.querySelectorAll('a').length
                }
            };
        });
    }

    async extractVisualData(page) {
        // Get visual data for current viewport (desktop by default)
        const currentViewportData = await page.evaluate(() => {
            const getComputedStyles = (selector) => {
                const element = document.querySelector(selector);
                if (!element) return null;
                
                const styles = window.getComputedStyle(element);
                return {
                    backgroundColor: styles.backgroundColor,
                    color: styles.color,
                    fontSize: styles.fontSize,
                    fontFamily: styles.fontFamily,
                    fontWeight: styles.fontWeight
                };
            };

            // Key element styles
            const elementStyles = {
                body: getComputedStyles('body'),
                h1: getComputedStyles('h1'),
                h2: getComputedStyles('h2'),
                nav: getComputedStyles('nav'),
                button: getComputedStyles('button')
            };

            // Layout detection
            const layout = {
                hasHeader: !!document.querySelector('header, .header'),
                hasNav: !!document.querySelector('nav, .nav, .navigation'),
                hasSidebar: !!document.querySelector('.sidebar, .side-nav, aside'),
                hasFooter: !!document.querySelector('footer, .footer'),
                containerWidth: document.body.offsetWidth,
                containerHeight: document.body.offsetHeight
            };

            // CSS classes (sample)
            const cssClasses = [];
            document.querySelectorAll('*').forEach(el => {
                if (el.className && typeof el.className === 'string') {
                    el.className.split(' ').forEach(cls => {
                        if (cls.trim() && !cssClasses.includes(cls.trim())) {
                            cssClasses.push(cls.trim());
                        }
                    });
                }
            });

            return {
                url: location.href,
                elementStyles,
                layout,
                cssClasses: cssClasses.slice(0, 50) // Limit to first 50 classes
            };
        });
        
        return currentViewportData;
    }

    async captureMultiViewport(page, pageDir) {
        const viewports = {
            desktop: { width: 1200, height: 800 },
            tablet: { width: 768, height: 1024 },
            mobile: { width: 375, height: 667 }
        };
        
        const viewportData = {};
        
        for (const [viewportName, dimensions] of Object.entries(viewports)) {
            console.log(`      📱 Capturing ${viewportName} view...`);
            
            // Set viewport
            await page.setViewport(dimensions);
            
            // Wait for any responsive changes to settle
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Extract visual data for this viewport
            const visualData = await this.extractVisualDataForViewport(page, viewportName);
            viewportData[viewportName] = visualData;
            
            // Save viewport-specific visual data
            await fs.writeFile(
                path.join(pageDir, `visual_${viewportName}.json`),
                JSON.stringify(visualData, null, 2)
            );
            
            // Take screenshot
            const screenshot = await page.screenshot({ fullPage: true });
            await fs.writeFile(
                path.join(pageDir, `screenshot_${viewportName}.png`),
                screenshot
            );
        }
        
        return viewportData;
    }   
    
    async extractVisualDataForViewport(page, viewportName) {
        return await page.evaluate((viewport) => {
            // Get viewport-specific layout info
            const layout = {
                viewport: viewport,
                hasHamburgerMenu: !!document.querySelector('.hamburger, .menu-toggle, .mobile-menu'),
                isStacked: window.innerWidth < 768, // Simple check for stacked layout
                columnCount: document.querySelectorAll('.col, [class*="col-"]').length,
                hasStickyHeader: !!document.querySelector('.sticky, .fixed-top, [style*="position: sticky"], [style*="position: fixed"]')
            };
            
            // Element visibility
            const visibility = {
                visible: [],
                hidden: []
            };
            
            // Check common responsive elements
            const elementsToCheck = [
                'nav', 'header', '.sidebar', '.mobile-only', '.desktop-only',
                '.tablet-only', 'aside', '.menu', '.search'
            ];
            
            elementsToCheck.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    const styles = window.getComputedStyle(el);
                    if (styles.display !== 'none' && styles.visibility !== 'hidden') {
                        visibility.visible.push(selector);
                    } else {
                        visibility.hidden.push(selector);
                    }
                });
            });
            
            // Navigation adaptation
            const navigation = {
                type: 'standard',
                position: 'top'
            };
            
            if (document.querySelector('.hamburger, .menu-toggle')) {
                navigation.type = 'hamburger';
            } else if (document.querySelector('select.nav, .dropdown-nav')) {
                navigation.type = 'dropdown';
            }
            
            // Typography changes
            const typography = {
                baseFontSize: window.getComputedStyle(document.body).fontSize,
                h1Size: window.getComputedStyle(document.querySelector('h1') || document.body).fontSize,
                lineHeight: window.getComputedStyle(document.body).lineHeight
            };
            
            // Images
            const images = Array.from(document.querySelectorAll('img')).slice(0, 5).map(img => ({
                src: img.src,
                srcset: img.srcset,
                sizes: img.sizes,
                responsiveLoading: img.loading === 'lazy'
            }));
            
            return {
                url: location.href,
                layout,
                visibility,
                navigation,
                typography,
                images,
                timestamp: new Date().toISOString()
            };
        }, viewportName);
    }    

    async extractTechnicalData(page) {
        return await page.evaluate(() => {
            // Meta tags
            const metaTags = {};
            document.querySelectorAll('meta').forEach(meta => {
                const name = meta.getAttribute('name') || meta.getAttribute('property');
                const content = meta.getAttribute('content');
                if (name && content) {
                    metaTags[name] = content;
                }
            });

            // Schema markup
            const schemas = [];
            document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
                try {
                    schemas.push(JSON.parse(script.textContent));
                } catch (e) {
                    // Skip invalid JSON
                }
            });

            // External resources
            const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
                .map(link => link.href);
            
            const scripts = Array.from(document.querySelectorAll('script[src]'))
                .map(script => script.src);

            // Framework detection
            const frameworks = {
                jquery: typeof window.jQuery !== 'undefined',
                react: !!(window.React || document.querySelector('[data-reactroot]')),
                angular: !!(window.angular || document.querySelector('[ng-app]')),
                vue: !!window.Vue,
                bootstrap: !!document.querySelector('.container, .row, .col-')
            };

            // Basic HTML structure
            const structure = {
                doctype: document.doctype ? document.doctype.name : null,
                lang: document.documentElement.lang,
                charset: document.characterSet,
                headElementCount: document.head.children.length,
                bodyElementCount: document.body.children.length
            };

            return {
                url: location.href,
                metaTags,
                schemas,
                resources: { stylesheets, scripts },
                frameworks,
                structure
            };
        });
    }

    async savePageData(pageDir, data) {
        // Save main page data
        await fs.writeFile(
            path.join(pageDir, 'page_data.json'),
            JSON.stringify(data, null, 2)
        );

        // Save content for similarity analysis
        await fs.writeFile(
            path.join(pageDir, 'content.json'),
            JSON.stringify(data.content, null, 2)
        );

        // Save visual data
        await fs.writeFile(
            path.join(pageDir, 'visual.json'),
            JSON.stringify(data.visual, null, 2)
        );

        // Save technical data
        await fs.writeFile(
            path.join(pageDir, 'technical.json'),
            JSON.stringify(data.technical, null, 2)
        );

        // Save simplified text file for quick reference
        const simpleText = [
            `URL: ${data.url}`,
            `Page ID: ${data.pageId}`,
            `URL Index: ${data.urlIndex}`,              // Add this line
            `Title: ${data.content.meta.title}`,
            `Description: ${data.content.meta.description}`,
            `Word Count: ${data.content.stats.wordCount}`,
            `Scraped: ${data.scrapedAt}`,
            '',
            'FULL TEXT:',
            data.content.fullText
        ].join('\n');

        await fs.writeFile(
            path.join(pageDir, 'content.txt'),
            simpleText
        );
    }

    async scrapeUrls() {
        const chunks = this.chunkArray(this.urls, this.options.concurrent);
        let urlIndex = 0;
        
        for (let i = 0; i < chunks.length; i++) {
            console.log(`\n📦 Processing batch ${i + 1}/${chunks.length}`);
            
            const promises = chunks[i].map(url => {
                const currentIndex = urlIndex++;
                return this.scrapePage(url, currentIndex);
            });
            
            const results = await Promise.allSettled(promises);
            
            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    this.results.push(result.value);
                } else {
                    console.error('❌ Batch error:', result.reason);
                }
            });

            // Delay between batches
            if (i < chunks.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    async generateSummary() {
        const summary = {
            scrapedAt: new Date().toISOString(),
            urlFile: this.options.urlFile,
            outputDirectory: this.outputDir,
            dateFolder: this.dateFolder,
            totalUrls: this.results.length,
            successful: this.results.filter(r => r.status === 'success').length,
            failed: this.results.filter(r => r.status === 'error').length,
            pages: this.results.map(r => ({
                pageId: r.pageId,
                url: r.url,
                urlIndex: r.urlIndex,
                status: r.status,
                directory: r.directory || null,
                error: r.error || null
            }))
        };

        // Save individual summary in the output directory
        await fs.writeFile(
            path.join(this.outputDir, 'scraping_summary.json'),
            JSON.stringify(summary, null, 2)
        );
        
        // Update the master summary at the analysis folder root - this keeps track of all scraping operations
        const masterSummaryPath = path.join(path.dirname(this.options.baseOutputDir), 'master_scraping_summary.json');
        let masterSummary = { 
            dateFolder: this.dateFolder,
            lastUpdated: new Date().toISOString(),
            scraped_sites: []
        };
        
        // Try to load existing master summary if it exists
        try {
            const existingData = await fs.readFile(masterSummaryPath, 'utf8');
            masterSummary = JSON.parse(existingData);
            console.log('📊 Updating existing master scraping summary');
        } catch (err) {
            // No existing summary, create new one
            console.log('📊 Creating new master scraping summary');
        }
        
        // Add this scrape operation to the master summary
        const siteSummary = {
            urlFile: this.options.urlFile,
            directory: path.basename(this.outputDir),
            scrapedAt: summary.scrapedAt,
            totalUrls: summary.totalUrls,
            successful: summary.successful,
            pages: summary.pages,
            failed: summary.failed
        };
        
        // Avoid duplicate entries by removing any previous entry for the same URL file
        masterSummary.scraped_sites = masterSummary.scraped_sites.filter(
            site => site.directory !== siteSummary.directory
        );
        
        // Add the new summary
        masterSummary.scraped_sites.push(siteSummary);
        masterSummary.lastUpdated = new Date().toISOString();
        
        // Save master summary at the root level
        await fs.writeFile(
            masterSummaryPath,
            JSON.stringify(masterSummary, null, 2)
        );

        console.log('\n📊 SCRAPING COMPLETE:');
        console.log(`   📁 Analysis Folder: ${this.dateFolder}`);
        console.log(`   📁 Output Directory: ${this.outputDir}`);
        console.log(`   📝 URL File: ${this.options.urlFile}`);    
        console.log(`   ✅ Successful: ${summary.successful}`);
        console.log(`   ❌ Failed: ${summary.failed}`);
        console.log(`   📄 Summary: scraping_summary.json`);
        
        summary.pages.forEach(page => {
            if (page.status === 'success') {
                console.log(`   📂 ${page.pageId}/ (${page.url})`);
            }
        });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔒 Browser closed');
        }
    }
}

// Main execution
async function main() {
    const scraper = new WebScraper({
        headless: true,
        concurrent: 2,
        captureViewports: true  // Enable multi-viewport capture
    });

    try {
        await scraper.initialize();
        
        if (scraper.urls.length === 0) {                    // Change from urls
            console.log('❌ No URLs found. Check your URL file.');
            return;
        }

        console.log(`🎯 Scraping ${scraper.urls.length} URLs...\n`);   // Change from urls
        await scraper.scrapeUrls();                         // Remove urls parameter
        await scraper.generateSummary();
        
    } catch (error) {
        console.error('💥 Error:', error);
    } finally {
        await scraper.close();
    }
}

// Export for module use
module.exports = WebScraper;

// Run if executed directly
if (require.main === module) {
    main();
}