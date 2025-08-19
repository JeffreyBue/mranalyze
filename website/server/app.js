import './globals.js';

import express from 'express';
import timeout from 'connect-timeout';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import authorizeHandler from './middleware/authorizeHandler.js';
import routeHandler, { renderRoute } from './middleware/routeHandler.js';
import getData from './middleware/dataHandler.js';
import getContent from './middleware/contentHandler.js';
import variationHandler from './middleware/variationHandler.js';
import templateHandler from './middleware/templateHandler.js';
import errorHandler from './middleware/errorHandler.js';

import routesAnalysis from './routes/analysis.js';

const app = express();

// Enable compression
// app.use(compression({ brotli: { enabled: true }, threshold: 0 }));

// Set cookies in req.cookies
app.use(cookieParser());

// SUBDOMAIN ROUTING CONFIG
app.set('subdomain offset', 1);

// STATIC ASSETS
app.use(CONFIG.paths.assetsRoute, express.static(`${APPROOT}${CONFIG.paths.assetsFolder}`, {
    etag: 'strong', // Enable strong ETags
    lastModified: true, // Include Last-Modified header
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, max-age=2592000, must-revalidate, no-transform');
    }
}));

// SERVE FILES FROM THE UTILS/ANALYSIS DIRECTORY
app.get("/_/report/:reportId/:siteId/:pageId/:imageName", (req, res) => {
    const { reportId, siteId, pageId, imageName } = req.params;
    const imagePath = `/app/shared-data/completed_reports/${reportId}/scraped_sites/${siteId}/${pageId}/${imageName}`;

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Image not found');
        }
    });
});

// 404 favicon.ico REQUEST FROM BROSWER
app.get('/favicon.ico', async (req, res) => {    
    console.log('favicon.ico request from browser');
    res.header('Content-Type', 'application/json');
    return res.status(404).send({error: "404 Error"});
});

// Set a timeout of 30 seconds
app.use(timeout('30s'));

// ANALYSIS ROUTES
app.use('/api/analysis', routesAnalysis);

app.get("*app", 
    authorizeHandler,
    routeHandler,
    getData, 
    getContent,
    variationHandler,
    templateHandler, 
    renderRoute,
    errorHandler
);

export default app;