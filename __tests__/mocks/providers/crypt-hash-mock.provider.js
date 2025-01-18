const bcrypt = require('bcrypt');

class CryptHashMockProvider {
    async generate(value) {
        return bcrypt.hash(value, 8);
    }

    async compare(value, hash) {
        return bcrypt.compare(value, hash);
    }
}

module.exports = { CryptHashMockProvider };
