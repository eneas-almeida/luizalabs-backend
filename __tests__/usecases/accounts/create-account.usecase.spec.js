const { CreateAccountUsecase } = require('../../../src/usecases/accounts');
const { CreateAccountDto } = require('../../../src/usecases/accounts/dtos');
const {
    CryptHashMockProvider,
    UniqueIdHashMockProvider,
} = require('../../mocks/providers');
const { TokenMockProvider } = require('../../mocks/providers');
const { AccountsMockRepository } = require('../../mocks/repositories');

let createAccountUsecase = null;
let accountsMockRepository = null;
let cryptHashMockProvider = null;
let uniqueIdHashMockProvider = null;
let tokenMockProvider = null;

describe('CreateAccountUsecase', () => {
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
    });

    // #1

    it('Deve poder criar uma conta', async () => {
        const body = {
            name: 'Tiago',
            email: 'tiago@gmail.com',
            password: '123456',
        };

        const createAccountDto = new CreateAccountDto(body);

        await createAccountUsecase.execute(createAccountDto);
    });

    // #2

    it('Deve não poder cria uma conta com email existente', async () => {
        const body_a = {
            name: 'Tiago Campos',
            email: 'tiago@gmail.com',
            password: '123456',
        };

        const body_b = {
            name: 'Tiago Rizzo',
            email: 'tiago@gmail.com',
            password: '931412',
        };

        const createAccountDto_a = new CreateAccountDto(body_a);
        const createAccountDto_b = new CreateAccountDto(body_b);

        await createAccountUsecase.execute(createAccountDto_a);

        await expect(createAccountUsecase.execute(createAccountDto_b)).rejects.toThrow(
            'Account already exists'
        );
    });
});
