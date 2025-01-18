const { v4 } = require('uuid');

class UUIDHashProvider {
    async generate(id) {
        return id || v4();
    }
}

module.exports = { UUIDHashProvider };
