const { v4 } = require('uuid');

class UniqueIdHashMockProvider {
    async generate(id) {
        return id || v4();
    }
}

module.exports = { UniqueIdHashMockProvider };
