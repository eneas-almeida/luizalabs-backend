class CreateFavoriteDto {
    constructor(body, accountId) {
        this.body = body;
        this.accountId = accountId;
    }

    get id() {
        return this.body.id;
    }

    get title() {
        return this.body.title;
    }

    get description() {
        return this.body.description;
    }

    validate() {
        if (!this.body) {
            return false;
        }

        if (!this.body.title || !this.body.description || !this.accountId) {
            return false;
        }

        return true;
    }
}

module.exports = { CreateFavoriteDto };
