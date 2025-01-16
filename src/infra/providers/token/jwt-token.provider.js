const jwt = require('jsonwebtoken');
const { envs } = require('../../../main/configs/envs');

class JwtTokenProvider {
    async generate(payload) {
        try {
            const token = jwt.sign(payload, envs.jwt.secret, {
                expiresIn: envs.jwt.expirationIn,
            });

            return token;
        } catch (error) {
            throw new Error('Token not generated');
        }
    }

    async validate(token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET);

            return decoded;
        } catch (error) {
            throw new Error('Token not validated');
        }
    }
}

module.exports = { JwtTokenProvider };
