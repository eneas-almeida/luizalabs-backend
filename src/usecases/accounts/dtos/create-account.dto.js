class CreateAccountDto {
    constructor(body) {
        this.body = body;
    }

    get name() {
        return this.body.name;
    }

    get email() {
        return this.body.email;
    }

    get password() {
        return this.body.password;
    }

    validate() {
        if (!this.body) {
            return false;
        }

        if (!this.body.name || !this.body.email || !this.body.password) {
            return false;
        }

        return true;
    }
}

module.exports = { CreateAccountDto };
