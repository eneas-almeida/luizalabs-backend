class CreateFavoriteDto {
    constructor(body) {
        this.body = body;
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

module.exports = { CreateFavoriteDto };
