import Mustache from 'mustache'
import yaml from 'js-yaml'

import templatesMap from '#APPROOT/src/templates/index.js';
import { HttpError } from './errorHandler.js';

const templateHandler = async (req, res, next) => {
  const apiData = req.data,
    pageType = req.route_config.template,
    url = req.path;

    // THROW ERROR IF NO TEMPLATE
    if(!Object.keys(templatesMap).includes(pageType)) return next(new HttpError(`No Tempalte: ${pageType}`, 500));

    // SET CONTENT TYPE OF TEMPLATE
    setContentType({ req, res, url });

    // GET PARSED HTML AND DATA
    const dataHtml = templateDataSplit({
      template: templatesMap[pageType], 
      data: apiData
    });
  
    req.data = dataHtml.data;
    req.html = dataHtml.html;

    await next();
}

export const templateDataSplit = ({template, data}) => {
  // SPLIT THE CONTENT OF TEMPLATE FROM "YAML" SYNTAX
  let pageParts = template.split(/--yaml--\n/);

  if (pageParts.length === 1) {
    // TEMPLATE HAS NO YAML DATA
    return {
      data: data,
      html: template
    }
  }

  const pageMeta = pageParts[0];
  const returnHtml = template.replace(pageMeta, '').replace(/--yaml--\n/, '');

  const metaData = yaml.load(Mustache.render(pageMeta, (data || {})));

  let templateData = {
    ...data,
    ...metaData
  };

  return {
    data: templateData,
    html: returnHtml
  }
}

export const setContentType = ({ req, res, url }) => {
  const maxAge = req.route_config.variations || req.routeInGroup ? 0 : 86400; // 1 day

  // SET CASHING HEADERS FOR 1 DAY
  res.set('Cache-Control', `public, max-age=${maxAge}, must-revalidate, no-transform`);

  if (url.includes('.xml.gz')) {
    res.header('Content-Type', 'application/x-gzip');
    return;
  }

  if (url.includes('.xml')) {
    res.header('Content-Type', 'application/xml');
    return;
  }

  if (url.includes('.txt')) {
    res.header('Content-Type', 'text/plain');
    return;
  }

  res.header('Content-Type', 'text/html');
}

export default templateHandler;