const { Account } = require('../../../domain/account');

class AccountsRepository {
    /**
     * @param {Account} account
     */
    async create(account) {
        return account;
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
