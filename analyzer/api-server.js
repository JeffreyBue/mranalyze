const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = 3001;

app.use(express.json());

// Apply compression but exclude SSE endpoints
app.use(compression({
    filter: (req, res) => {
        // Don't compress SSE endpoints
        if (req.path.includes('/progress') || req.headers.accept === 'text/event-stream') {
            return false;
        }
        // Compress everything else
        return compression.filter(req, res);
    }
}));

// Configuration
const LOCKS_DIR = process.env.LOCKS_DIR || './locks';
const ANALYSIS_LOCK = path.join(LOCKS_DIR, 'analysis.lock');
const COMPLETED_REPORTS_DIR = process.env.COMPLETED_REPORTS_DIR || '/app/shared-data/completed_reports';
const ARCHIVE_DIR = process.env.ARCHIVE_DIR || '/app/shared-data/archive';
const REPORTS_DIR = process.env.REPORTS_DIR || '/app/shared-data/reports';
const PARAMETER_FILES_DIR = process.env.PARAMETER_FILES_DIR || '/app/shared-data/parameter_files';
const URLS_DIR = process.env.URLS_DIR || '/app/shared-data/urls';

let currentProcess = null;
let progressClients = [];

console.log(LOCKS_DIR, ANALYSIS_LOCK, COMPLETED_REPORTS_DIR, PARAMETER_FILES_DIR);

// Lock file management
async function isAnalysisRunning() {
    console.log('Checking if analysis is running...');
    console.log(`Lock file path: ${ANALYSIS_LOCK}`);
    try {
        await fs.access(ANALYSIS_LOCK);
        console.log('Analysis is already running.');
        return true;
    } catch {
        return false;
    }
}

async function createLock() {
    console.log('Creating analysis lock...');
    await fs.mkdir(LOCKS_DIR, { recursive: true });
    await fs.writeFile(ANALYSIS_LOCK, JSON.stringify({
        startTime: new Date().toISOString(),
        pid: process.pid
    }));
}

async function removeLock() {
    console.log('Removing analysis lock...');
    try {
        await fs.unlink(ANALYSIS_LOCK);
    } catch (error) {
        console.error('Error removing lock file:', error);
    }
}

// Replace your broadcastProgress function with this version:
function broadcastProgress(data) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    
    progressClients.forEach((client, index) => {
        try {
            client.write(message);
            
            // CRITICAL: FLUSH IMMEDIATELY AFTER EACH WRITE
            client.flush();
            
        } catch (error) {
            console.error('Error broadcasting to client:', error);
            // Remove failed client
            progressClients.splice(index, 1);
        }
    });
}

// Parse terminal output and convert to frontend format
function parseTerminalOutput(output, reportDirectory) {
    const lines = output.split('\n');
    const results = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        // Step detection
        const stepMatch = trimmedLine.match(/🔄 STEP: (.+)/);
        if (stepMatch) {
            const stepName = stepMatch[1];
            const stepKey = stepName.toLowerCase().replace(/\s+/g, '-');
            
            results.push({
                type: 'step',
                step: stepKey,
                status: 'running',
                percentage: 0,
                timestamp: new Date().toISOString()
            });
        }

        // Success detection
        const successMatch = trimmedLine.match(/✅ (.+) completed successfully/);
        if (successMatch) {
            const completedStep = successMatch[1].toLowerCase().replace(/\s+/g, '-');
            
            results.push({
                type: 'step',
                step: completedStep,
                status: 'complete',
                percentage: 100,
                timestamp: new Date().toISOString()
            });
        }

        // Progress percentage (if any numeric patterns found)
        const progressMatch = trimmedLine.match(/(\d+\.?\d*)%/);
        if (progressMatch && !trimmedLine.includes('similarity')) {
            results.push({
                type: 'progress',
                percentage: parseFloat(progressMatch[1]),
                timestamp: new Date().toISOString()
            });
        }

        // Always send terminal output
        results.push({
            type: 'terminal',
            content: trimmedLine,
            lineType: trimmedLine.includes('✅') ? 'success' : 
                     trimmedLine.includes('❌') ? 'error' :
                     trimmedLine.includes('🔄') ? 'info' : 'info',
            timestamp: new Date().toISOString()
        });
    });

    return results;
}

// Helper function to ensure a directory exists and is empty
async function ensureDirectoryExistsAndEmpty(dirPath) {
    try {
        // Check if the directory exists
        await fs.access(dirPath);
        
        // If it exists, delete all files within it
        console.log(`Directory ${dirPath} exists. Clearing its contents...`);
        const files = await fs.readdir(dirPath);
        for (const file of files) {
            const fullPath = path.join(dirPath, file);
            // Use fs.rm for both files and directories
            await fs.rm(fullPath, { recursive: true, force: true });
        }
        console.log(`Cleared directory: ${dirPath}`);

    } catch (error) {
        // If the directory does not exist, create it
        if (error.code === 'ENOENT') {
            await fs.mkdir(dirPath, { recursive: true });
            console.log(`Created directory: ${dirPath}`);
        } else {
            // For other errors, log and re-throw
            console.error(`Error handling directory ${dirPath}:`, error);
            throw error;
        }
    }
}

// Start analysis endpoint
app.post('/analyze', async (req, res) => {
    try {
        if (await isAnalysisRunning()) {
            return res.status(409).json({ 
                error: 'Analysis already running',
                message: 'Please wait for current analysis to complete'
            });
        }

        // Create lock file
        await createLock();

        const { lists } = req.body;
        if (!lists || !Array.isArray(lists) || lists.length === 0) {
            await removeLock(); // Remove lock if validation fails
            return res.status(400).json({ 
                error: 'Invalid lists data',
                message: 'Please provide valid lists array'
            });
        }

        // Generate a unique report folder name for this analysis
        const destFolderDateStr = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14); // YYYYMMDDHHMMSS
        const reportFolder = `analyze_${destFolderDateStr}`;

        // Ensure the URLs directory exists
        await ensureDirectoryExistsAndEmpty(URLS_DIR);
        
        // Create URL files for each list item
        for (const list of lists) {
            if (!list.name || !list.routes || !Array.isArray(list.routes)) {
                continue;
            }
            
            const fileName = `${list.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase()}.txt`;
            const filePath = path.join(URLS_DIR, fileName);
            
            // Process routes and write each one on a separate line
            const routeContent = list.routes
                .filter(route => route && typeof route === 'string')
                .join('\n');
            
            await fs.writeFile(filePath, routeContent);
            console.log(`Created URL file: ${filePath} with ${list.routes.length} routes`);
        }

        // Broadcast that analysis is starting
        broadcastProgress({
            type: 'started',
            message: 'Analysis process starting...',
            timestamp: new Date().toISOString()
        });

        // Start analysis process with URLs directory
        currentProcess = spawn('npm', ['run', 'SAR', '--', `--input=${URLS_DIR}`, `--dest=/shared-data/completed_reports/${reportFolder}`], {
            cwd: process.cwd(),
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let reportDirectory = null;
        let hasReceivedOutput = false;

        // Set a timeout to detect if process fails immediately
        const startupTimeout = setTimeout(() => {
            if (!hasReceivedOutput && currentProcess) {
                console.log('Analysis startup timeout - no output received');
                broadcastProgress({
                    type: 'error',
                    message: 'Analysis failed to start - check configuration',
                    timestamp: new Date().toISOString()
                });
            }
        }, 10000); // 10 seconds

        // Handle stdout
        currentProcess.stdout.on('data', (data) => {
            hasReceivedOutput = true;
            clearTimeout(startupTimeout);
            
            const output = data.toString();
            console.log(output);
            
            // Extract report directory
            const match = output.match(/📁 Using custom destination folder: (.+)/);
            if (match) {
                reportDirectory = match[1].trim();
            }
            
            // Parse and broadcast progress
            const progressUpdates = parseTerminalOutput(output, reportDirectory);
            progressUpdates.forEach(update => broadcastProgress(update));
        });

        // Handle stderr
        currentProcess.stderr.on('data', (data) => {
            hasReceivedOutput = true;
            clearTimeout(startupTimeout);
            
            const error = data.toString();
            console.error(error);
            broadcastProgress({
                type: 'terminal',
                content: error,
                lineType: 'error',
                timestamp: new Date().toISOString()
            });
        });

        // Handle process completion
        currentProcess.on('close', async (code) => {
            clearTimeout(startupTimeout);
            console.log(`Analysis process exited with code - ${code}`);
            
            try {
                if (code === 0 && reportDirectory) {
                    // Move completed report
                    // await moveCompletedReport(reportDirectory);
                    
                    broadcastProgress({
                        type: 'complete',
                        message: 'Analysis completed successfully',
                        timestamp: new Date().toISOString()
                    });
                } else {
                    // Determine error message based on code and output
                    let errorMessage = `Analysis failed with code ${code}`;
                    if (code === 1) {
                        errorMessage += ' - Check that all required directories and dependencies exist';
                    }
                    
                    broadcastProgress({
                        type: 'error',
                        message: errorMessage,
                        timestamp: new Date().toISOString()
                    });
                }
                
                // try {
                //     await fs.unlink(parameterFile);
                // } catch {}
                
            } catch (error) {
                console.error('Error in cleanup:', error);
                broadcastProgress({
                    type: 'error',
                    message: `Cleanup error: ${error.message}`,
                    timestamp: new Date().toISOString()
                });
            }
            
            currentProcess = null;
            
            // Clean up
            console.log('Cleaning up after analysis completion');
            await removeLock();
            
            // Send final message to close SSE connections
            setTimeout(() => {
                broadcastProgress({
                    type: 'finished',
                    message: 'Analysis session ended',
                    timestamp: new Date().toISOString()
                });
            }, 1000);
        });

        // Handle process errors
        currentProcess.on('error', (error) => {
            clearTimeout(startupTimeout);
            console.error('Process error:', error);
            broadcastProgress({
                type: 'error',
                message: `Process error: ${error.message}`,
                timestamp: new Date().toISOString()
            });
        });

        res.json({ 
            success: true,
            message: 'Analysis started',
            timestamp: new Date().toISOString(),
            reportId: reportFolder
        });

    } catch (error) {
        console.error('Error starting analysis:', error);
        await removeLock();
        
        // Broadcast error to any connected SSE clients
        broadcastProgress({
            type: 'error',
            message: `Failed to start analysis: ${error.message}`,
            timestamp: new Date().toISOString()
        });
        
        res.status(500).json({ 
            error: 'Failed to start analysis',
            message: error.message
        });
    }
});

// Get analysis status
app.get('/status', async (req, res) => {
    const isRunning = await isAnalysisRunning();
    console.log(`Analysis running: ${isRunning}`);
    res.json({
        isRunning,
        hasActiveProcess: currentProcess !== null,
        timestamp: new Date().toISOString()
    });
});

// Server-Sent Events for progress (Enhanced with Flushing)
app.get('/progress', (req, res) => {
    // DISABLE COMPRESSION AND BUFFERING
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no', // Disable nginx buffering
        'Content-Encoding': 'identity' // Disable compression
    });

    // FLUSH HEADERS IMMEDIATELY
    res.flushHeaders();

    // Add client to progress clients
    progressClients.push(res);
    console.log(`SSE client connected. Total clients: ${progressClients.length}`);

    // Send initial connection message
    res.write(`data: ${JSON.stringify({
        type: 'connected',
        message: 'Connected to progress stream',
        timestamp: new Date().toISOString()
    })}\n\n`);
    
    // FLUSH IMMEDIATELY
    res.flush();

    // Send current status
    const sendStatus = async () => {
        const isRunning = await isAnalysisRunning();
        res.write(`data: ${JSON.stringify({
            type: 'status',
            isRunning,
            hasActiveProcess: currentProcess !== null,
            timestamp: new Date().toISOString()
        })}\n\n`);
        
        // FLUSH IMMEDIATELY
        res.flush();
    };
    sendStatus();

    // Handle client disconnect
    req.on('close', () => {
        progressClients = progressClients.filter(client => client !== res);
        console.log(`SSE client disconnected. Remaining clients: ${progressClients.length}`);
    });

    // Set up a heartbeat to detect broken connections
    const heartbeatInterval = setInterval(() => {
        try {
            res.write(`data: ${JSON.stringify({
                type: 'heartbeat',
                timestamp: new Date().toISOString()
            })}\n\n`);
            
            // FLUSH IMMEDIATELY AFTER HEARTBEAT
            res.flush();
        } catch (error) {
            console.log('Heartbeat failed, removing client');
            clearInterval(heartbeatInterval);
            progressClients = progressClients.filter(client => client !== res);
        }
    }, 30000); // Every 30 seconds

    // Clean up heartbeat on disconnect
    req.on('close', () => {
        clearInterval(heartbeatInterval);
    });
});

// Cancel analysis
app.post('/cancel', async (req, res) => {
    try {
        const { reportId } = req.body;
        if (!reportId) {
            return res.status(400).json({
                error: 'Missing reportId',
                message: 'A reportId is required to cancel an analysis.'
            });
        }
        const reportPath = path.join(COMPLETED_REPORTS_DIR, reportId);

        if (currentProcess) {
            // If a process is running, kill it and clean up on exit.
            currentProcess.once('close', async () => {
                console.log('Process closed, proceeding with cleanup.');
                try {
                    await fs.access(reportPath);
                    await fs.rm(reportPath, { recursive: true, force: true });
                    console.log(`Cancelled and removed report folder: ${reportId}, ${reportPath}`);
                } catch (error) {
                    if (error.code !== 'ENOENT') {
                        console.error(`Failed to remove report folder ${reportPath}:`, error);
                    }
                }
                // await removeLock();
            });

            currentProcess.kill('SIGTERM');
            currentProcess = null;
        } else {
            // If no process is running, just clean up the folder and lock.
            await removeLock();
            try {
                await fs.access(reportPath);
                await fs.rm(reportPath, { recursive: true, force: true });
                console.log(`Cancelled and removed report folder: ${reportId}, ${reportPath}`);
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error(`Failed to remove report folder ${reportPath}:`, error);
                }
            }
        }
        
        // Broadcast cancellation message   
        
        broadcastProgress({
            type: 'error',
            message: 'Analysis cancelled by user',
            timestamp: new Date().toISOString()
        });
        
        res.json({ success: true, message: 'Analysis cancelled', reportId });
    } catch (error) {
        console.error('Error cancelling analysis:', error);
        res.status(500).json({ 
            error: 'Failed to cancel analysis',
            message: error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/create-lock', async (req, res) => {
    try {
        await createLock();
        res.json({ success: true, message: 'Lock created', timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error creating lock:', error);
        res.status(500).json({
            error: 'Failed to create lock',
            message: error.message
        });
    }
});

app.get('/remove-lock', async (req, res) => {
    try {
        await removeLock();
        res.json({ success: true, message: 'Lock removed', timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error removing lock:', error);
        res.status(500).json({
            error: 'Failed to remove lock',
            message: error.message
        });
    }
});

// Archive a report folder
app.delete('/report/:reportId', async (req, res) => {
    try {
        const reportId = req.params.reportId;
        
        // Prevent path traversal attacks by validating the reportId
        if (!reportId || reportId.includes('..') || reportId.includes('/')) {
            return res.status(400).json({
                error: 'Invalid report ID',
                message: 'Report ID contains invalid characters'
            });
        }
        
        const sourcePath = path.join(COMPLETED_REPORTS_DIR, reportId);
        const destPath = path.join(ARCHIVE_DIR, reportId);
        
        console.log(`Attempting to archive report folder from ${sourcePath} to ${destPath}`);
        
        // Check if the source directory exists
        try {
            await fs.access(sourcePath);
        } catch (error) {
            return res.status(404).json({
                error: 'Report not found',
                message: `Report directory ${reportId} does not exist in completed reports`
            });
        }
        
        // Ensure the archive directory exists
        await fs.mkdir(ARCHIVE_DIR, { recursive: true });
        
        // Move the directory
        await fs.rename(sourcePath, destPath);
        console.log(`Successfully archived report folder: ${destPath}`);
        
        return res.json({
            success: true,
            message: `Report ${reportId} archived successfully`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error archiving report:', error);
        return res.status(500).json({
            error: 'Failed to archive report',
            message: error.message
        });
    }
});

// Get report summary data
app.get('/report/:reportId/summary', async (req, res) => {
    try {
        const reportId = req.params.reportId;
        
        // Prevent path traversal attacks
        if (!reportId || reportId.includes('..') || reportId.includes('/')) {
            return res.status(400).json({
                error: 'Invalid report ID',
                message: 'Report ID contains invalid characters'
            });
        }
        
        const reportPath = path.join(COMPLETED_REPORTS_DIR, reportId);
        
        // Check if the report directory exists
        try {
            await fs.access(reportPath);
        } catch (error) {
            return res.status(404).json({
                error: 'Report not found',
                message: `Report ${reportId} does not exist`
            });
        }
        
        const reportsDir = path.join(reportPath, 'reports');
        
        // Define the 5 required files
        const filePaths = {
            masterSummary: path.join(reportsDir, 'final_reports', 'master_final_summary.json'),
            seoSummary: path.join(reportsDir, 'seo_analysis', 'seo_master_summary.json'),
            contentSummary: path.join(reportsDir, 'analysis_cache', 'content_master_summary.json'),
            visualSummary: path.join(reportsDir, 'analysis_cache', 'visual_master_summary.json'),
            technicalSummary: path.join(reportsDir, 'analysis_cache', 'technical_master_summary.json'),
            masterScraping: path.join(reportPath, 'master_scraping_summary.json')
        };
        
        // Read all files concurrently
        const fileReadPromises = Object.entries(filePaths).map(async ([key, filePath]) => {
            try {
                const fileContent = await fs.readFile(filePath, 'utf8');
                return [key, JSON.parse(fileContent)];
            } catch (error) {
                console.warn(`Warning: Could not read ${key} from ${filePath}:`, error.message);
                return [key, null];
            }
        });
        
        const fileResults = await Promise.all(fileReadPromises);
        const summaryData = Object.fromEntries(fileResults);
        
        // Check if we have at least some data
        const availableFiles = Object.values(summaryData).filter(data => data !== null).length;
        if (availableFiles === 0) {
            return res.status(500).json({
                error: 'No summary data available',
                message: 'Could not read any of the required summary files'
            });
        }
        
        // Create a unified response
        const response = {
            reportId,
            timestamp: new Date().toISOString(),
            availableAnalysis: {
                master: summaryData.masterSummary !== null,
                seo: summaryData.seoSummary !== null,
                content: summaryData.contentSummary !== null,
                visual: summaryData.visualSummary !== null,
                technical: summaryData.technicalSummary !== null,
                masterScraping: summaryData.masterScraping !== null
            },
            data: summaryData
        };
        
        console.log(`Successfully retrieved summary data for report ${reportId} (${availableFiles}/5 files available)`);
        res.json(response);
        
    } catch (error) {
        console.error('Error retrieving report summary:', error);
        res.status(500).json({
            error: 'Failed to retrieve report summary',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Analyzer API server running on port ${PORT}`);
});