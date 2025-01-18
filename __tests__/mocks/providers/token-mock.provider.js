const jwt = require('jsonwebtoken');
const { envs } = require('../../../src/main/configs/envs');

class TokenMockProvider {
    async generate(payload) {
        try {
            return jwt.sign(payload, envs.jwt.secret, {
                expiresIn: envs.jwt.expirationIn,
            });
        } catch (error) {
            throw new Error('Token not generated');
        }
    }

    static async verify(token) {
        try {
            return jwt.verify(token, envs.jwt.secret);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { TokenMockProvider };
