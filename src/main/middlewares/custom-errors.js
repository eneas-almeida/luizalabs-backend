const Youch = require('youch');
const { AppError } = require('../errors');
const { envs } = require('../configs/envs');
const { errors } = require('../helpers');

module.exports = async (err, req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    if (envs.api.ambient === 'development') {
        const youch = new Youch(err, req);
        const json = await youch.toJSON();
        const jsonAdapted = errors.messageAdapter(json);
        const output = {
            statusCode: 500,
            message: jsonAdapted.message,
            trace: jsonAdapted.trace,
        };
        return res.status(500).json(output);
    }

    return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error, contact the administrator',
        description: err.name,
    });
};
