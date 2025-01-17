const { AccountsModelSchema } = require('../schemas');

class AccountsRepository {
    async create(doc) {
        try {
            return AccountsModelSchema.create(doc);
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {string} email
     * @returns {Promise<Account>}
     */
    async findOneByEmail(email) {
        try {
            return AccountsModelSchema.findOne({ email });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { AccountsRepository };
