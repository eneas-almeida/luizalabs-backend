const app = require('./app');
const banner = require('./banner');
const routes = require('./routes');
const errors = require('./errors');
const server = require('./server');
const db = require('./db');
const midllewares = require('./middlewares');
const envs = require('./envs');

module.exports = {
    app,
    banner,
    routes,
    errors,
    server,
    db,
    midllewares,
    envs,
};
