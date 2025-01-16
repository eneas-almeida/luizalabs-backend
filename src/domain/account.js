class Account {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    /* Getters */

    get name() {
        return this.name;
    }

    get email() {
        return this.email;
    }

    get password() {
        return this.password;
    }

    /* Setters */

    set name(name) {
        this.name = name;
    }

    set email(email) {
        this.email = email;
    }

    set password(password) {
        this.password = password;
    }
}

module.exports = { Account };
