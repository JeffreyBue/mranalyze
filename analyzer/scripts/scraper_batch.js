const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

class BatchScraper {
    constructor() {
        this.urlsDirectory = process.argv[2] || './urls';
        this.scraperScript = './scripts/scraper.js';
        
        // Get the folder name if specified
        this.folderName = process.argv.find(arg => arg.startsWith('--folder='))?.split('=')[1] 
            || `analyze_${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
        
        console.log(`📁 Using analysis folder: ${this.folderName}`);
    }

    async findUrlFiles() {
        try {
            const entries = await fs.readdir(this.urlsDirectory);
            const txtFiles = entries
                .filter(file => file.endsWith('.txt'))
                .map(file => path.join(this.urlsDirectory, file));
            
            console.log(`📂 Found ${txtFiles.length} URL files in ${this.urlsDirectory}:`);
            txtFiles.forEach(file => console.log(`   📄 ${path.basename(file)}`));
            
            return txtFiles;
        } catch (error) {
            throw new Error(`Could not read directory ${this.urlsDirectory}: ${error.message}`);
        }
    }

    async scrapeFile(filePath) {
        return new Promise((resolve, reject) => {
            const fileName = path.basename(filePath, '.txt');
            console.log(`\n🚀 Starting scrape for: ${fileName}`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            
            // Pass the folder name to ensure consistency
            const scraper = spawn('node', [
                this.scraperScript, 
                filePath, 
                `--folder=${this.folderName}`
            ], {
                stdio: 'inherit'
            });
            
            scraper.on('close', (code) => {
                if (code === 0) {
                    console.log(`✅ Successfully scraped: ${fileName}`);
                    resolve(fileName);
                } else {
                    console.error(`❌ Failed to scrape: ${fileName} (exit code: ${code})`);
                    reject(new Error(`Scraper failed for ${fileName}`));
                }
            });
            
            scraper.on('error', (error) => {
                console.error(`💥 Error running scraper for ${fileName}:`, error);
                reject(error);
            });
        });
    }

    async run() {
        console.log('🔄 BATCH SCRAPER STARTING');
        console.log(`📂 URLs Directory: ${this.urlsDirectory}`);
        
        try {
            const urlFiles = await this.findUrlFiles();
            
            if (urlFiles.length === 0) {
                console.log('⚠️ No .txt files found in the specified directory');
                return;
            }
            
            const results = {
                successful: [],
                failed: []
            };
            
            console.log(`\n🎯 Processing ${urlFiles.length} URL file(s)...\n`);
            
            // Process files sequentially to avoid overwhelming the system
            for (const filePath of urlFiles) {
                try {
                    const fileName = await this.scrapeFile(filePath);
                    results.successful.push(fileName);
                } catch (error) {
                    results.failed.push({
                        file: path.basename(filePath),
                        error: error.message
                    });
                }
                
                // Brief pause between files
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            // Summary
            console.log(`\n🎊 BATCH SCRAPING COMPLETE!`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`✅ Successful: ${results.successful.length}`);
            console.log(`❌ Failed: ${results.failed.length}`);
            
            if (results.successful.length > 0) {
                console.log(`\n📁 Successfully scraped folders:`);
                results.successful.forEach(name => console.log(`   🗂️ ${name}`));
            }
            
            if (results.failed.length > 0) {
                console.log(`\n💥 Failed files:`);
                results.failed.forEach(item => console.log(`   ❌ ${item.file}: ${item.error}`));
            }
            
        } catch (error) {
            console.error('💥 Batch scraper error:', error.message);
            process.exit(1);
        }
    }
}

// Usage help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
🔄 BATCH SCRAPER USAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npm run scrape-all [directory]

Examples:
  npm run scrape-all ./urls          # Scrape all .txt files in ./urls
  npm run scrape-all ./my-projects   # Scrape all .txt files in ./my-projects
  npm run scrape-all                 # Defaults to ./urls

This will:
1. Find all .txt files in the specified directory
2. Run the scraper on each file sequentially
3. Create separate folders for each scraped site set
4. Provide a summary of successes and failures
    `);
    process.exit(0);
}

// Run the batch scraper
const batchScraper = new BatchScraper();
batchScraper.run();