class AccountsMockRepository {
    constructor() {
        this.accounts = [];
    }

    async create(doc) {
        this.accounts.push(doc);
    }

    async findOneByEmail(email) {
        return this.accounts.find((account) => account.email === email);
    }
}

module.exports = { AccountsMockRepository };
