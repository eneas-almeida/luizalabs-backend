class CreateFavoriteDto {
    constructor(body, acountId) {
        this.body = body;
        this.accountId = acountId;
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
