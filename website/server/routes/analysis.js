import express from 'express';
import path from 'path';

const router = express.Router();

// Add this middleware to parse JSON bodies
router.use(express.json());
// Add this middleware to parse URL-encoded bodies (optional)
router.use(express.urlencoded({ extended: true }));

const ANALYZER_URL = process.env.ANALYZER_SERVICE_URL || 'http://analyzer:3001';
const LOCKS_DIR = './locks';
const ANALYSIS_LOCK = path.join(LOCKS_DIR, 'analysis.lock');

// Check if analysis is running
router.get('/lock-check', async (req, res) => {
    try {
        const response = await fetch(`${ANALYZER_URL}/status`);
        const status = await response.json();
        
        res.json({
            locked: status.isRunning,
            hasActiveProcess: status.hasActiveProcess
        });
    } catch (error) {
        console.error('Error checking lock status:', error);
        res.status(500).json({ error: 'Failed to check analysis status' });
    }
});

// Start analysis
router.post('/start', async (req, res) => {
    try {
        console.log('Starting analysis with data:', req.body);
        const { routeLists } = req.body;
        
        if (!routeLists || !Array.isArray(routeLists)) {
            return res.status(400).json({ 
                error: 'Invalid data format',
                message: 'Expected routeLists array'
            });
        }

        // Convert route lists to the format expected by analyzer
        const analysisData = {
            lists: routeLists.map((list, index) => ({
                name: list.name || `Site ${index + 1}`,
                routes: list.routes.filter(route => route && route.trim())
            })).filter(list => list.routes.length > 0)
        };

        // Send to analyzer
        const response = await fetch(`${ANALYZER_URL}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(analysisData)
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json(error);
        }

        const result = await response.json();
        res.json(result);

    } catch (error) {
        console.error('Error starting analysis:', error);
        res.status(500).json({ 
            error: 'Failed to start analysis',
            message: error.message
        });
    }
});

// Server-Sent Events for progress
router.get('/progress', async (req, res) => {
    // DISABLE COMPRESSION FOR THIS ROUTE
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no', // Disable nginx buffering
        'Content-Encoding': 'identity' // Disable compression
    });

    console.log('SSE client connected, attempting to connect to analyzer...');

    let reader; // Declare at the function level
    let shouldContinueReading = true; // Add this flag

    try {
        // Test if analyzer is reachable
        const testResponse = await fetch(`${ANALYZER_URL}/health`);
        console.log('Analyzer health check:', testResponse.status);
        
        if (!testResponse.ok) {
            throw new Error(`Analyzer not healthy: ${testResponse.status}`);
        }

        // Try to connect to analyzer SSE
        console.log('Connecting to analyzer SSE at:', `${ANALYZER_URL}/progress`);
        
        const response = await fetch(`${ANALYZER_URL}/progress`, {
            headers: {
                'Accept': 'text/event-stream'
            }
        });
        
        console.log('Analyzer SSE response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Analyzer SSE failed: ${response.status}`);
        }

        // Send connection success message
        res.write(`data: ${JSON.stringify({
            type: 'debug',
            message: 'Connected to analyzer SSE',
            timestamp: new Date().toISOString()
        })}\n\n`);

        reader = response.body.getReader();
        const decoder = new TextDecoder();

        const readStream = async () => {
            try {
                if (!shouldContinueReading) {
                    return;
                }

                const { done, value } = await reader.read();
                
                if (done) {
                    console.log('Analyzer SSE stream ended');
                    res.write(`data: ${JSON.stringify({
                        type: 'debug',
                        message: 'Analyzer stream ended',
                        timestamp: new Date().toISOString()
                    })}\n\n`);
                    res.end();
                    return;
                }
                
                const chunk = decoder.decode(value, { stream: true });
                
                
                // CRITICAL FIX: Split chunks that contain multiple SSE messages
                const messages = chunk.split('\n\n').filter(msg => msg.trim());
                
                messages.forEach((message, index) => {
                    if (message.trim()) {
                        // Ensure message starts with 'data: ' and ends with proper formatting
                        let formattedMessage = message.trim();
                        if (!formattedMessage.startsWith('data: ')) {
                            // Skip invalid messages
                            console.log('Skipping invalid message:', formattedMessage);
                            return;
                        }
                        
                        // Add proper SSE formatting
                        const sseMessage = formattedMessage + '\n\n';
                        
                        
                        if (!res.writableEnded && !res.destroyed) {
                            // Send each message individually
                            res.write(sseMessage);
                        }
                    }
                });
                                
                // Continue reading
                readStream();
            } catch (error) {
                console.error('Stream read error:', error);
                if (!res.writableEnded && !res.destroyed) {
                    res.write(`data: ${JSON.stringify({
                        type: 'error',
                        message: `Stream error: ${error.message}`,
                        timestamp: new Date().toISOString()
                    })}\n\n`);
                    res.end();
                }
            }
        };

        readStream();

    } catch (error) {
        console.error('SSE setup error:', error);
        
        // Send error message to client before closing
        res.write(`data: ${JSON.stringify({
            type: 'error',
            message: `Failed to connect to analyzer: ${error.message}`,
            timestamp: new Date().toISOString()
        })}\n\n`);
        
        // Send a connection-closed message
        res.write(`data: ${JSON.stringify({
            type: 'finished',
            message: 'Connection closed due to error',
            timestamp: new Date().toISOString()
        })}\n\n`);
        
        res.end();
        
        return; // Exit early, don't set up the stream reader    
    }

    // Handle client disconnect
    req.on('close', () => {
        console.log('SSE client disconnected');
        shouldContinueReading = false;
        // Clean up the analyzer connection
        if (reader) {
            reader.cancel().catch(err => console.error('Error canceling reader:', err));
        }
    });
});

// Cancel analysis
router.post('/cancel', async (req, res) => {
    try {
        const response = await fetch(`${ANALYZER_URL}/cancel`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reportId: req.body.reportId }) });

        
        if (response.ok) {
            const result = await response.json();
            console.log('Cancel analysis response:', result);
            res.json(result);
        } else {
            const error = await response.json();
            res.status(response.status).json(error);
        }
    } catch (error) {
        console.error('Error cancelling analysis:', error);
        res.status(500).json({ 
            error: 'Failed to cancel analysis',
            message: error.message
        });
    }
});

// Archive a report by calling the analyzer service
router.delete('/report/:reportId', async (req, res) => {
    try {
        const { reportId } = req.params;

        if (!reportId) {
            return res.status(400).json({ error: 'Report ID is required' });
        }

        const response = await fetch(`${ANALYZER_URL}/report/${reportId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(result);
        }
        
        res.json(result);

    } catch (error) {
        console.error(`Error archiving report ${req.params.reportId}:`, error);
        res.status(500).json({ 
            error: 'Failed to archive report',
            message: error.message
        });
    }
});

// Health check for analyzer
router.get('/health', async (req, res) => {
    try {
        const response = await fetch(`${ANALYZER_URL}/health`);
        const result = await response.json();
        res.json({
            website: 'OK',
            analyzer: result,
            analyzerUrl: ANALYZER_URL
        });
    } catch (error) {
        res.status(500).json({
            website: 'OK',
            analyzer: 'ERROR',
            analyzerUrl: ANALYZER_URL,
            error: error.message
        });
    }
});

// Get report summary data
router.get('/report/:reportId/summary', async (req, res) => {
    try {
        const { reportId } = req.params;

        if (!reportId) {
            return res.status(400).json({ 
                error: 'Report ID is required' 
            });
        }

        console.log(`Fetching summary data for report: ${reportId}`);

        // Forward request to analyzer service
        const response = await fetch(`${ANALYZER_URL}/report/${reportId}/summary`);

        if (!response.ok) {
            const error = await response.json();
            console.error(`Analyzer returned error for report ${reportId}:`, error);
            return res.status(response.status).json(error);
        }

        const summaryData = await response.json();
        
        console.log(`Successfully retrieved summary for report ${reportId}`);
        console.log(`Available analysis types:`, summaryData.availableAnalysis);
        
        res.json(summaryData);

    } catch (error) {
        console.error(`Error fetching summary for report ${req.params.reportId}:`, error);
        res.status(500).json({ 
            error: 'Failed to fetch report summary',
            message: error.message
        });
    }
});

export default router;