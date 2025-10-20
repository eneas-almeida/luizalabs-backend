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

    it('Deve poder criar uma conta e retornar dados do usuário com token', async () => {
        const body = {
            name: 'Tiago',
            email: 'tiago@gmail.com',
            password: '123456',
        };

        const createAccountDto = new CreateAccountDto(body);

        const result = await createAccountUsecase.execute(createAccountDto);

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name', 'Tiago');
        expect(result).toHaveProperty('email', 'tiago@gmail.com');
        expect(result).toHaveProperty('role', 'COMPANY');
        expect(result).toHaveProperty('token');
        expect(result.token).toBeTruthy();
    });

    // #2

    it('Não deve poder criar uma conta com email já existente', async () => {
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

    // #3

    it('Não deve poder criar uma conta com nome já existente', async () => {
        const body_a = {
            name: 'Tiago Campos',
            email: 'tiago@gmail.com',
            password: '123456',
        };

        const body_b = {
            name: 'Tiago Campos',
            email: 'tiago.rizzo@gmail.com',
            password: '931412',
        };

        const createAccountDto_a = new CreateAccountDto(body_a);
        const createAccountDto_b = new CreateAccountDto(body_b);

        await createAccountUsecase.execute(createAccountDto_a);

        await expect(createAccountUsecase.execute(createAccountDto_b)).rejects.toThrow(
            'Account with this name already exists'
        );
    });

    // #4

    it('Não deve poder criar uma conta com DTO inválido', async () => {
        const body = {
            name: '',
            email: 'invalid-email',
            password: '123',
        };

        const createAccountDto = new CreateAccountDto(body);

        await expect(createAccountUsecase.execute(createAccountDto)).rejects.toThrow(
            'Invalid dto'
        );
    });

    // #5

    it('Deve criar contas diferentes com nomes e emails diferentes', async () => {
        const body_a = {
            name: 'João Silva',
            email: 'joao@gmail.com',
            password: '123456',
        };

        const body_b = {
            name: 'Maria Santos',
            email: 'maria@gmail.com',
            password: '789012',
        };

        const createAccountDto_a = new CreateAccountDto(body_a);
        const createAccountDto_b = new CreateAccountDto(body_b);

        const result_a = await createAccountUsecase.execute(createAccountDto_a);
        const result_b = await createAccountUsecase.execute(createAccountDto_b);

        expect(result_a.name).toBe('João Silva');
        expect(result_a.email).toBe('joao@gmail.com');
        expect(result_b.name).toBe('Maria Santos');
        expect(result_b.email).toBe('maria@gmail.com');
        expect(result_a.id).not.toBe(result_b.id);
    });
});
