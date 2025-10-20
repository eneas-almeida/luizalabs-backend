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

    async findOneByName(name) {
        return this.accounts.find((account) => account.name === name);
    }
}

module.exports = { AccountsMockRepository };
