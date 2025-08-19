import Mustache from 'mustache';
import crypto from 'crypto';
import { collapseWhiteSpace } from 'collapse-white-space';
import { HttpError } from './errorHandler.js';

import partialsTemplates from '#APPROOT/src/partials/index.js';

// Extract variable binding 
let apiViewFlag, hosts;
try {
  apiViewFlag = process.env.API_VIEW_FLAG;
} catch (error) {
  console.log('Missing API_VIEW_FLAG binding from environment.');
  apiViewFlag = false;
}

try {
  hosts = process.env.HOSTS;
} catch (error) {
  console.log('Missing HOSTS binding from environment.');
}

const routeHandler = async (req, res, next) => {
  const approvedHosts = JSON.parse(JSON.stringify(CONFIG.hosts)), // provide a deep copy of the CONFIG.hosts
    configRoutes = JSON.parse(JSON.stringify(CONFIG.routes)), // provide a deep copy of the CONFIG.routes
    urlPathName = req.path,
    urlHost = req.hostname,
    routesWithhost = configRoutes.filter(route => route.host != ''),
    routesWithApprovedHost = configRoutes.filter(route => approvedHosts.includes(route.host) || route.host === ''),
    routesWithNoHost = configRoutes.filter(route => !route.host || (new RegExp(`^${route.host}$`, 'gmi')).exec('.*'));

  let matchedRoute;

  if (urlHost) {
    matchedRoute = checkRoutes(routesWithhost, 'a');
  }
  
  if (!matchedRoute && urlHost && approvedHosts.includes(urlHost)) {
    matchedRoute = checkRoutes(routesWithApprovedHost, 'b');
  }

  if (!matchedRoute && !urlHost) {
    matchedRoute = checkRoutes(routesWithNoHost, 'c');
  }

  function checkRoutes(checkingRoutes, routesSet) {
    const checkedRoutes = checkingRoutes.filter(route => {
      route.check = 0;
      route.hostMatch = false,
      route.pathMatch = false,
      route.urlparams = [];
      const pathName = new RegExp(`^${route.path}$`, 'gmi'),
        routeHost = new RegExp(`^${route.host}$`, 'gmi'),
        routePathMatch = pathName.exec(urlPathName),
        routeMatchedHost = routeHost.exec(urlHost);

      if (routeMatchedHost) {
        route.check++;
        route.hostMatch = true;
        if (routeMatchedHost.groups) {
          Object.entries(routeMatchedHost.groups).map(([key, value]) => {
            if (value) route.urlparams.push({ [key]: value });
          });
        }
      }

      if (routePathMatch) {
        route.check++;
        route.pathMatch = true;
        if (routePathMatch.groups) {
          Object.entries(routePathMatch.groups).map(([key, value]) => {
            if (value) route.urlparams.push({ [key]: value });
          });
        }
      }

      if (!route.urlparams.length) route.urlparams = null;

      if(routesSet == 'a') {
        if(route.hostMatch && route.pathMatch) return true;
      }
      
      if(routesSet == 'b') {
        if(route.pathMatch) {
          if(route.host){
            return false
          }
          return true;
        }
      }

      if(routesSet == 'c') {
        if(route.pathMatch) return true;
      }

    });

    checkedRoutes.sort((a, b) => b.check - a.check);

    return checkedRoutes[0];
  }

  if (matchedRoute) {
    req.route_config = matchedRoute;
    if (matchedRoute.urlparams) req.urlparams = matchedRoute.urlparams;
  }

  if (!req.route_config) return next(new HttpError('NOT FOUND', 404));

  await next();
}

export const renderRoute = async (req, res) => {
  const html = req.html,
    data = req.data,
    apiJson = typeof req.query.api === 'string' && req.query.api !== "false" && apiViewFlag;


  if(apiJson){
    res.header('Content-Type', 'application/json');
    return res.status(200).send(data);
  }

  // RENDER THE DATA WITH THE TEMPLATE
  const documentObjectModel = collapseWhiteSpace(Mustache.render(html, data, partialsTemplates));

  //***** ETAG IMPLEMENTATION *****//
  // GENERATE A HASH OF THE CONTENT AND SET ETAG
  const etag = crypto.createHash('md5').update(documentObjectModel).digest('hex');
  res.set('ETag', etag);
  // **************************

  return res.status(200).send(documentObjectModel);
}

export default routeHandler;
