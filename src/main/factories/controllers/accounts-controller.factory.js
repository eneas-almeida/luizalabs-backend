const {
    CreateAccountController,
    LoginAccountController,
} = require('../../../controllers/accounts');
const {
    CreateAccountUsecase,
    LoginAccountUsecase,
} = require('../../../usecases/accounts');
const { AccountsRepository } = require('../../../infra/db/repositories');
const { BcryptHashProvider } = require('../../../infra/providers/hash');
const { JwtTokenProvider } = require('../../../infra/providers/token');

const accountsRepository = new AccountsRepository();
const hashProvider = new BcryptHashProvider();
const tokenProvider = new JwtTokenProvider();

class AccountsControllerFactory {
    constructor() {
        this.createAccountController = new CreateAccountController(
            new CreateAccountUsecase(accountsRepository, hashProvider)
        );

        this.loginAccountController = new LoginAccountController(
            new LoginAccountUsecase(accountsRepository, hashProvider, tokenProvider)
        );
    }
}

module.exports = { AccountsControllerFactory };
