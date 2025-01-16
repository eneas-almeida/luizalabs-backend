const { v4: uuidv4 } = require('uuid');

module.exports = (req, _res, next) => {
    req.headers['x-request-id'] = uuidv4();
    req.headers['x-request-at'] = new Date().toISOString();
    next();
};
