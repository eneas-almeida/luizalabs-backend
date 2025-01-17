const { Account } = require('../../../domain/account');
const { AccountsModelSchema } = require('../schemas');

class AccountsRepository {
    /**
     * @param {Account} account
     */
    async create(account) {
        return AccountsModelSchema.create(account);
    }

    /**
     * @param {string} email
     * @returns {Promise<Account>}
     */
    async findOneByEmail(email) {
        return false;
    }
}

module.exports = { AccountsRepository };
