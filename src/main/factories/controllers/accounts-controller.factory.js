const {
    CreateAccountController,
    LoginAccountController,
} = require('../../../controllers/accounts');

const {
    CreateAccountUsecase,
    LoginAccountUsecase,
} = require('../../../usecases/accounts');

const { CreateFavoriteUsecase } = require('../../../usecases/favorites');

const {
    AccountsRepository,
    FavoritesRepository,
} = require('../../../infra/db/repositories');

const { BcryptHashProvider, UUIDHashProvider } = require('../../../infra/providers/hash');
const { JwtTokenProvider } = require('../../../infra/providers/token');

const accountsRepository = new AccountsRepository();
const cryptHashProvider = new BcryptHashProvider();
const uniqueIdHashProvider = new UUIDHashProvider();
const tokenProvider = new JwtTokenProvider();

class AccountsControllerFactory {
    constructor() {
        this.createAccountController = new CreateAccountController(
            new CreateAccountUsecase(
                accountsRepository,
                cryptHashProvider,
                uniqueIdHashProvider,
                tokenProvider
            ),
            new CreateFavoriteUsecase(new FavoritesRepository(), uniqueIdHashProvider)
        );

        this.loginAccountController = new LoginAccountController(
            new LoginAccountUsecase(accountsRepository, cryptHashProvider, tokenProvider)
        );
    }
}

module.exports = { AccountsControllerFactory };
