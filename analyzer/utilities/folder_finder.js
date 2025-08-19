const fs = require('fs').promises;
const path = require('path');

/**
 * Utility class to find the most recent date-based analysis folder
 */
class AnalysisFolderFinder {
    // Cached session folder name to ensure consistency across all steps
    static sessionFolderName = null;
    
    /**
     * Find the most recent date-based analysis folder containing scraped data
     * @param {string} basePath - Base path to search from (default: current directory)
     * @returns {Promise<string>} - The path to the most recent analysis folder
     */
    static async findLatestAnalysisFolder(basePath = '.') {
        try {
            // If we already have a session folder, use that
            if (this.sessionFolderName) {
                const sessionPath = path.join(basePath, this.sessionFolderName);
                console.log(`📁 Using session analysis folder: ${this.sessionFolderName}`);
                return sessionPath;
            }
            
            const entries = await fs.readdir(basePath, { withFileTypes: true });
            
            // Filter for analyze_ date folders
            const dateFolders = entries
                .filter(entry => entry.isDirectory() && entry.name.startsWith('analyze_'))
                .map(entry => entry.name)
                .sort((a, b) => b.localeCompare(a)); // Simple reverse sort for newest first
            
            if (dateFolders.length === 0) {
                // Fall back to looking for a scraped_sites folder directly
                const hasScrapedSites = entries.some(entry => 
                    entry.isDirectory() && entry.name === 'scraped_sites');
                    
                if (hasScrapedSites) {
                    console.log('⚠️ No date folders found. Using legacy ./scraped_sites directory');
                    return basePath;
                }
                
                throw new Error('No analysis folders found');
            }
            
            const latestFolder = dateFolders[0];
            console.log(`📁 Using latest analysis folder: ${latestFolder}`);
            
            // Cache this folder as our session folder
            this.sessionFolderName = latestFolder;
            
            return path.join(basePath, latestFolder);
        } catch (error) {
            console.error('❌ Error finding analysis folder:', error.message);
            throw error;
        }
    }
    
    /**
     * Find scraped site folders within the analysis directory
     * @param {string} analysisDir - The analysis directory path
     * @returns {Promise<Object>} - Object containing folders array and paths
     */
    static async findScrapedFolders(analysisDir) {
        const scrapedSitesPath = path.join(analysisDir, 'scraped_sites');
        
        try {
            const entries = await fs.readdir(scrapedSitesPath, { withFileTypes: true });
            const folders = entries
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name)
                .sort();
            
            console.log(`📁 Found ${folders.length} scraped folders in ${scrapedSitesPath}`);
            return { 
                folders,
                basePath: scrapedSitesPath,
                analysisDir
            };
        } catch (error) {
            console.error(`❌ Error finding scraped folders: ${error.message}`);
            throw error;
        }
    }
    
    /**
     * Get the next available index number for indexed analysis folders
     * @param {string} basePath - Base path to search from
     * @returns {Promise<number>} - Next available index number
     */
    static async getNextAnalysisIndex(basePath = '.') {
        try {
            const entries = await fs.readdir(basePath, { withFileTypes: true });
            
            // Find the highest index of existing indexed folders
            let highestIndex = 0;
            
            entries
                .filter(entry => entry.isDirectory() && /^\d+_analyze_/.test(entry.name))
                .forEach(entry => {
                    const match = entry.name.match(/^(\d+)_analyze_/);
                    if (match) {
                        const index = parseInt(match[1]);
                        highestIndex = Math.max(highestIndex, index);
                    }
                });
            
            return highestIndex + 1;
        } catch (error) {
            console.error('❌ Error finding next analysis index:', error.message);
            return 1; // Start with index 1 if there's an error
        }
    }
    
    /**
     * Create or use an analysis folder for the current session
     * @param {string} basePath - Base path to create folder in
     * @param {string} folderName - Optional specific folder name to use/create
     * @returns {Promise<string>} - Path to the created folder
     */
    static async createAnalysisFolder(basePath = '.', folderName = null) {
        try {
            // If no folder name is provided, create a date-based folder
            if (!folderName) {
                // Generate date string (date only, no time)
                const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
                folderName = `analyze_${dateStr}`;
            }
            
            // Store this as our session folder
            this.sessionFolderName = folderName;
            
            // Create the folder
            const folderPath = path.join(basePath, folderName);
            await fs.mkdir(folderPath, { recursive: true });
            
            console.log(`📁 Using analysis folder: ${folderName}`);
            return folderPath;
        } catch (error) {
            console.error('❌ Error creating analysis folder:', error.message);
            throw error;
        }
    }
    
    /**
     * Set the current session folder name
     * @param {string} folderName - The folder name to use for this session
     */
    static setSessionFolder(folderName) {
        this.sessionFolderName = folderName;
        console.log(`📁 Session folder set to: ${folderName}`);
    }
}

module.exports = AnalysisFolderFinder;
