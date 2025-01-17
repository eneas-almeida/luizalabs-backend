const { AppError } = require('../errors');
const { JwtTokenProvider } = require('../../infra/providers/token');

module.exports = async (req, _res, next) => {
    const schemaToken = req?.headers?.authorization;

    if (!schemaToken) {
        throw new AppError('Token not provided!', 400, {
            error: 'TokenNotProvided',
        });
    }

    const parts = schemaToken.split(' ');

    if (parts.length !== 2) {
        throw new AppError('Token parts invalid!', 403, {
            error: 'TokenPartsInvalid',
        });
    }

    const [schema, token] = parts;

    if (schema !== 'Bearer') {
        throw new AppError('Token parts invalid', 403, {
            error: 'TokenPartsInvalid',
        });
    }

    try {
        console.log(await JwtTokenProvider.verify(token));
        req.auth = await JwtTokenProvider.verify(token);
    } catch (_error) {
        throw new AppError('Token not validated', 403, {
            error: 'TokenNotValidated',
        });
    }

    next();
};
