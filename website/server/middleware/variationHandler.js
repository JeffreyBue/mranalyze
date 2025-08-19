import crypto from 'crypto';

const variationHandler = async (req, res, next) => {
    const routeGroups = CONFIG.route_groups || null;

    if (routeGroups) {
        // Check if the route is part of a group
        for (const group in routeGroups) {
            if (routeGroups[group].some(route => route.path === req.route_config.path)) {
                req.routeInGroup = group;
                break;
            }
        }

        if (req.routeInGroup) {
            assignVariation(req, res, true);
            return await next();
        }
    }

    //***** IF SINGLE ROUTE IS TESTING */
    if (req.route_config.variations) assignVariation(req, res, false);

    await next();
};

const assignVariation = (req, res, isGroup = false) => {
    const variationKey = isGroup ? req.routeInGroup : req.route_config.path;
    if (!variationKey) return;

    const variationKeyHash = crypto.createHash('sha256').update(variationKey).digest('hex'),
        variations = isGroup 
            ? ['control', req.routeInGroup] 
            : ['control', ...req.route_config.variations || []],
        originalRouteConfig = { ...req.route_config }, // Create a shallow copy to ensure it doesn't reflect changes
        variationRoute = isGroup 
            ? CONFIG.route_groups[req.routeInGroup]?.find(r => r.path === originalRouteConfig.path) 
            : null;
    let variation = req.cookies[variationKeyHash] || null;

    if (!variation) {
        // Choose a random variation if not set
        variation = variations[Math.floor(Math.random() * variations.length)];

        // Set a random variation cookie if not set
        res.cookie(variationKeyHash, variation, { 
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            httpOnly: false 
        });

        // Set Variation To Template
        if (variation !== 'control') {
            req.route_config.template = isGroup ? variationRoute?.template : variation;
        }

        // Set In Data Object
        req.data.variation = {
            path: req.path,
            pageType: req.data.getPageType()(),
            variationKey,
            variationKeyHash,
            variation
        };
    } else {
        // Set Variation To Template
        if (variation !== 'control') {
            req.route_config.template = isGroup ? variationRoute?.template : variation;
        }

        // Set In Data Object
        req.data.variation = {
            path: req.path,
            pageType: req.data.getPageType()(),
            variationKey,
            variationKeyHash,
            variation
        };
    }

    // If query param of variationKeyHash is set, override the variation
    if (req.query[variationKeyHash] && ['localhost', 'www3.intelius.com'].includes(req.hostname) && variations.includes(req.query[variationKeyHash])) {
        req.route_config.template = req.query[variationKeyHash] === 'control' 
            ? originalRouteConfig.template 
            : (isGroup ? variationRoute?.template : req.query[variationKeyHash]);
        req.data.variation = {
            path: req.path,
            pageType: req.data.getPageType()(),
            variationKey,
            variationKeyHash,
            variation: req.query[variationKeyHash]
        };
    }
};

export default variationHandler;