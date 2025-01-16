const { CreateAccountController } = require('../../controllers/accounts');
const { CreateAccountUsecase } = require('../../usecases/accounts');
const { AccountsRepository } = require('../../infra/db/repositories');

class AccountsControllerFactory {
    constructor() {
        this.createAccountController = new CreateAccountController(
            new CreateAccountUsecase(new AccountsRepository())
        );
    }
}

module.exports = { AccountsControllerFactory };
