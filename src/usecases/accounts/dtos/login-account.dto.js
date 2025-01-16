class LoginAccountDto {
    constructor(body) {
        this.body = body;
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

        if (!this.body.email || !this.body.password) {
            return false;
        }

        return true;
    }
}

module.exports = { LoginAccountDto };
