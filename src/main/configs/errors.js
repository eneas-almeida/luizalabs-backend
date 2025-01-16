const { customErrors } = require('../middlewares');

const config = (app) => {
    app.use(customErrors);
};

module.exports = { config };
