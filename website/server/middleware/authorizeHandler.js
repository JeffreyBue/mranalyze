import { HttpError } from './errorHandler.js';

// Extract variable bindings.
let isStaging = process.env.STAGE || false;

const authorizeHandler = async (req, res, next) => {
  // Middleware to check for shared secret header only for staging environment
  if(isStaging && await checkHeader(req, res, next)){
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return await next(new HttpError('Authentication required', 401));
  };

    return await next();
}

const checkHeader = async (req, res, next) => {
    // -----------------------------------------------------------------------
    // Authentication middleware 
    const auth = {login: 'screamingfrog', password: 'screaming'};
  
    // Parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  
    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
      // Access granted...
      return false;
    }
  
    // Access denied...
    return true;
    // -----------------------------------------------------------------------
  }
  
  export default authorizeHandler;
  
