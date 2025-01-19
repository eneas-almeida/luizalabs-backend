const { CreateAccountUsecase } = require('../../../src/usecases/accounts');
const { CreateAccountDto } = require('../../../src/usecases/accounts/dtos');
const { LoginAccountUsecase } = require('../../../src/usecases/accounts');
const { LoginAccountDto } = require('../../../src/usecases/accounts/dtos');
const {
    CryptHashMockProvider,
    UniqueIdHashMockProvider,
} = require('../../mocks/providers');
const { TokenMockProvider } = require('../../mocks/providers');
const { AccountsMockRepository } = require('../../mocks/repositories');

let loginAccountUsecase = null;
let createAccountUsecase = null;
let accountsMockRepository = null;
let cryptHashMockProvider = null;
let uniqueIdHashMockProvider = null;
let tokenMockProvider = null;

describe('LoginAccountUsecase', () => {
    beforeEach(() => {
        // Injections : Mocks
        accountsMockRepository = new AccountsMockRepository();
        cryptHashMockProvider = new CryptHashMockProvider();
        uniqueIdHashMockProvider = new UniqueIdHashMockProvider();
        tokenMockProvider = new TokenMockProvider();

        // Usecase
        createAccountUsecase = new CreateAccountUsecase(
            accountsMockRepository,
            cryptHashMockProvider,
            uniqueIdHashMockProvider,
            tokenMockProvider
        );

        // Usecase
        loginAccountUsecase = new LoginAccountUsecase(
            accountsMockRepository,
            cryptHashMockProvider,
            tokenMockProvider
        );
    });

    // #1

    it('Deve poder efetuar login', async () => {
        let body = {
            name: 'Tiago',
            email: 'tiago@gmail.com',
            password: '123456',
        };

        const createAccountDto = new CreateAccountDto(body);

        await createAccountUsecase.execute(createAccountDto);

        body = {
            email: 'tiago@gmail.com',
            password: '123456',
        };

        const loginAccountDto = new LoginAccountDto(body);

        const token = await loginAccountUsecase.execute(loginAccountDto);

        expect(token).toHaveProperty('token');
    });

    // #2

    it('Deve não poder efetuar o login', async () => {
        let body = {
            name: 'Tiago',
            email: 'tiago@gmail.com',
            password: '123456',
        };

        const createAccountDto = new CreateAccountDto(body);

        await createAccountUsecase.execute(createAccountDto);

        body = {
            email: 'tiago@gmail.com',
            password: '654321',
        };

        const loginAccountDto = new LoginAccountDto(body);

        await expect(loginAccountUsecase.execute(loginAccountDto)).rejects.toThrow(
            'Invalid email or password'
        );
    });
});
