import Mustache from 'mustache'

import { templateDataSplit } from './templateHandler.js';

import readFromFile from "#APPROOT/readFromFile.js";
import partialsTemplates from '#APPROOT/src/partials/index.js';
import attachMustacheFunctions from '#APPROOT/utils/mustacheFunctions.js';
const ErrorTemplate = await readFromFile(`/src/templates/error.html`);

let apiViewFlag;
try {
  // Extract variable binding from .dev.vars
  apiViewFlag = process.env.API_VIEW_FLAG === 'true' ? true : false;
} catch (error) {
  apiViewFlag = false;
  console.log('No API_VIEW_FLAG.', apiViewFlag);
}
  
export class HttpError extends Error {
  constructor(message, status) {
      super(message);
      this.status = status;
  }
}
  
const errorHandler = async (error, req, res, next) => {
  const errorData = {
      route: req.path,
      error_message: error.message,
      status: error.status || 500,
      commonNames: req.commonNames || []
    },
    apiJson = typeof req.query.api === 'string' && req.query.api !== "false" && apiViewFlag;

    // ATTACHING MUSTACHE FUNCTIONS FOR ERROR PAGE
    attachMustacheFunctions(errorData);

    if(error.status != 404) {
      console.error(errorData);
      console.dir(error);
  }

    // GET PARSED HTML AND DATA
    const dataHtml = templateDataSplit({template: ErrorTemplate, data: errorData});
   
    if(apiJson){
        res.header('Content-Type', 'application/json');
        return res.status(200).send(dataHtml.data);
    }
    
    return res.status(error.status || 500).send(Mustache.render(dataHtml.html, dataHtml.data, partialsTemplates));
}

export default errorHandler;