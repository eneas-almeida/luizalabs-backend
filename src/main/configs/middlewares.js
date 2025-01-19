const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { requestId } = require('../middlewares');

const config = (app) => {
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(requestId);
    app.use(cors());
};

module.exports = {
    config,
};
