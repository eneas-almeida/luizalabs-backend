const {
    CreateAccountController,
    LoginAccountController,
} = require('../../controllers/accounts');
const { CreateAccountUsecase, LoginAccountUsecase } = require('../../usecases/accounts');
const { AccountsRepository } = require('../../infra/db/repositories');

// Repo Accounts
const repo = new AccountsRepository();

class AccountsControllerFactory {
    constructor() {
        this.createAccountController = new CreateAccountController(
            new CreateAccountUsecase(repo)
        );

        this.loginAccountController = new LoginAccountController(
            new LoginAccountUsecase(repo)
        );
    }
}

module.exports = { AccountsControllerFactory };
