const helmet = require('helmet');
const morgan = require('morgan');
const { requestId } = require('../middlewares');

const config = (app) => {
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(requestId);
};

module.exports = {
    config,
};
