class UpdateFavoriteDto {
    constructor(body, id, accountId) {
        this.body = body;
        this.id = id;
        this.accountId = accountId;
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

        if (!this.body.title || !this.body.description) {
            return false;
        }

        return true;
    }
}

module.exports = { UpdateFavoriteDto };
