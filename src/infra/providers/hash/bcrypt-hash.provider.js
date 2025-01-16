const bcrypt = require('bcrypt');

class BcryptHashProvider {
    /**
     * @param {string} value
     * @returns {string}
     */
    async generate(value) {
        return bcrypt.hash(value, 8);
    }

    /**
     * @param {string} value
     * @param {string} hash
     * @returns {boolean}
     */
    async compare(value, hash) {
        return bcrypt.compare(value, hash);
    }
}

module.exports = { BcryptHashProvider };
