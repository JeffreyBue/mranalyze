const { spawn } = require('child_process');
const fs = require('fs').promises;

class FullPipeline {
    constructor() {
        // Parse command line arguments
        this.parseCommandLineArgs();
        
        this.startTime = Date.now();
        
        // Store this folder name in the utility for consistency across all steps
        const AnalysisFolderFinder = require('../utilities/folder_finder');
        AnalysisFolderFinder.setSessionFolder(this.destFolder);
        
        this.steps = [
            { name: 'Scraping', command: 'npm run scrape-all' },
            { name: 'Visual Analysis', command: 'npm run visual' },
            { name: 'Content Analysis', command: 'npm run content' },
            { name: 'Technical Analysis', command: 'npm run technical' },
            { name: 'SEO Analysis', command: 'npm run seo' },
            { name: 'Final Report', command: 'npm run final' }
        ];
    }
    
    parseCommandLineArgs() {
        // Parse input URLs directory
        // First check for --input parameter
        const inputParam = process.argv.find(arg => arg.startsWith('--input='));
        if (inputParam) {
            this.urlsDirectory = inputParam.split('=')[1];
        } 
        // Otherwise check for positional parameter
        else if (process.argv[2] && !process.argv[2].startsWith('--')) {
            this.urlsDirectory = process.argv[2];
        } 
        // Default to ./urls if not specified
        else {
            this.urlsDirectory = './urls';
        }
        
        // Parse destination folder parameter
        const destParam = process.argv.find(arg => arg.startsWith('--dest='));
        if (destParam) {
            this.destFolder = destParam.split('=')[1];
            console.log(`📁 Using custom destination folder: ${this.destFolder}`);
        } else {
            const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
            this.destFolder = `analyze_${dateStr}`;
            console.log(`📁 Using date-based destination folder: ${this.destFolder}`);
        }
        
        console.log(`📂 Using URLs directory: ${this.urlsDirectory}`);
    }

    async runCommand(stepName, command, args = []) {
        return new Promise((resolve, reject) => {
            console.log(`\n🔄 STEP: ${stepName}`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            
            // Pass the folder name to ensure consistency
            let finalArgs = [...args];
            // For all steps, pass both the input directory and the destination folder
            // The scraper will use the input directory for URLs and the folder param for the output
            finalArgs.push(`--folder=${this.destFolder}`);
            console.log(`⚡ Running: ${command} ${finalArgs.join(' ')}`);
            
            const stepStartTime = Date.now();
            
            // Parse npm commands vs direct node commands
            let cmd, cmdArgs;
            if (command.startsWith('npm run')) {
                cmd = 'npm';
                // Add the double dash separator for npm commands to ensure arguments are passed correctly
                cmdArgs = ['run', ...command.split(' ').slice(2), '--', ...finalArgs];
                console.log(`  🔄 Using npm with double dash pattern: npm ${cmdArgs.join(' ')}`);
            } else {
                cmd = command.split(' ')[0];
                cmdArgs = [...command.split(' ').slice(1), ...finalArgs];
            }
            
            const process = spawn(cmd, cmdArgs, {
                stdio: 'inherit'
            });
            
            process.on('close', (code) => {
                const duration = ((Date.now() - stepStartTime) / 1000).toFixed(1);
                
                if (code === 0) {
                    console.log(`✅ ${stepName} completed successfully (${duration}s)`);
                    resolve({ stepName, success: true, duration: parseFloat(duration) });
                } else {
                    console.error(`❌ ${stepName} failed (exit code: ${code})`);
                    reject(new Error(`${stepName} failed with exit code ${code}`));
                }
            });
            
            process.on('error', (error) => {
                console.error(`💥 Error in ${stepName}:`, error);
                reject(error);
            });
        });
    }

    async checkPrerequisites() {
        console.log('🔍 Checking prerequisites...');
        
        // Check if URLs directory exists
        try {
            await fs.access(this.urlsDirectory);
            const files = await fs.readdir(this.urlsDirectory);
            const txtFiles = files.filter(f => f.endsWith('.txt'));
            
            if (txtFiles.length === 0) {
                throw new Error(`No .txt files found in ${this.urlsDirectory}`);
            }
            
            console.log(`✅ Found ${txtFiles.length} URL file(s) in ${this.urlsDirectory}`);
            return true;
        } catch (error) {
            console.error(`❌ Prerequisites failed: ${error.message}`);
            return false;
        }
    }

    formatDuration(seconds) {
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    }

    async run() {
        console.log('🚀 FULL PIPELINE: SCRAPE → ANALYZE → SEO → REPORT');
        console.log(`📂 URLs Directory: ${this.urlsDirectory}`);
        console.log(`📁 Destination Folder: ${this.destFolder}`);
        console.log(`⏰ Started: ${new Date().toLocaleString()}`);
        
        // Check prerequisites
        if (!(await this.checkPrerequisites())) {
            process.exit(1);
        }
        
        const results = [];
        let totalSteps = this.steps.length;
        
        try {
            // Step 1: Scraping with directory argument
            const scrapingResult = await this.runCommand(
                this.steps[0].name, 
                this.steps[0].command,
                [this.urlsDirectory]
            );
            results.push(scrapingResult);
            
            // Steps 2-6: Analysis, SEO, and reporting
            for (let i = 1; i < this.steps.length; i++) {
                const step = this.steps[i];
                const result = await this.runCommand(step.name, step.command);
                results.push(result);
            }
            
            // Success summary
            const totalDuration = (Date.now() - this.startTime) / 1000;
            
            console.log(`\n🎉 PIPELINE COMPLETE!`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`⏰ Total Time: ${this.formatDuration(totalDuration)}`);
            console.log(`✅ All ${totalSteps} steps completed successfully`);
            
            console.log(`\n📊 Step Breakdown:`);
            results.forEach((result, index) => {
                console.log(`   ${index + 1}. ${result.stepName}: ${this.formatDuration(result.duration)}`);
            });
            
            console.log(`\n📁 Output Locations:`);
            console.log(`   🗂️ Scraped Data: ./scraped_sites/`);
            console.log(`   📊 Analysis Cache: ./reports/analysis_cache/`);
            console.log(`   🔍 SEO Analysis: ./reports/seo_analysis/`);
            console.log(`   📋 Final Reports: ./reports/final_reports/`);
            
            console.log(`\n🎯 Key Files to Review:`);
            console.log(`   📄 MASTER_SUMMARY.txt - Overall analysis summary`);
            console.log(`   📋 SEO_ACTION_PLAN.txt - SEO optimization roadmap`);
            console.log(`   📊 SEO_ACTION_ITEMS.csv - Trackable action items`);
            console.log(`   📄 ACTIONABLE_ITEMS_SUMMARY.txt - Priority actions`);
            console.log(`🤘 SAR FINISHED!`)
            
        } catch (error) {
            const totalDuration = (Date.now() - this.startTime) / 1000;
            
            console.log(`\n💥 PIPELINE FAILED!`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`❌ Error: ${error.message}`);
            console.log(`⏰ Runtime: ${this.formatDuration(totalDuration)}`);
            
            if (results.length > 0) {
                console.log(`\n✅ Completed Steps:`);
                results.forEach((result, index) => {
                    console.log(`   ${index + 1}. ${result.stepName}: ${this.formatDuration(result.duration)}`);
                });
            }
            
            process.exit(1);
        }
    }
}

// Usage help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
🚀 FULL PIPELINE USAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npm run SAR [urls-directory] [options]
npm run scrape-analysis-report [urls-directory] [options]

Examples:
  npm run SAR ./urls                     # Default: URLs from ./urls, output to date-based folder
  npm run SAR ./my-projects              # URLs from ./my-projects, output to date-based folder
  npm run SAR ./urls --dest=scrape_2     # URLs from ./urls, output to "scrape_2" folder
  npm run SAR --input=./urls --dest=test # Same as above but using named parameters
  npm run SAR                            # URLs from ./urls, output to date-based folder

Options:
  --input=DIRECTORY     Directory containing URL files (alternative to positional argument)
  --dest=FOLDER_NAME    Set custom destination folder name instead of date-based folder

This will run the complete pipeline:
1. 🔄 Scrape all .txt files in the input directory
2. 🎨 Visual analysis of all scraped sites
3. 📝 Content analysis of all scraped sites  
4. ⚙️ Technical analysis of all scraped sites
5. 🔍 SEO analysis of all scraped sites
6. 📋 Generate final comparison reports

The entire process is automated and will provide:
- Progress updates for each step
- Timing information
- Final summary with output locations
- SEO optimization recommendations
- Actionable items for improving uniqueness and SEO value
    `);
    process.exit(0);
}

// Run the full pipeline
const pipeline = new FullPipeline();
pipeline.run();