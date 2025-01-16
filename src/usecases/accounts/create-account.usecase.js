const { AccountsRepository } = require('../../infra/db/repositories/accounts.repository');
const { BcryptHashProvider } = require('../../infra/providers/hash');
const { CreateAccountDto } = require('./dtos/create-account.dto');
const { AppError } = require('../../main/errors');
const { Account } = require('../../domain/account');

class CreateAccountUsecase {
    /**
     * @param {AccountsRepository} accountsRepository
     * @param {BcryptHashProvider} hashProvider
     */
    constructor(accountsRepository, hashProvider) {
        this._accountsRepository = accountsRepository;
        this._hashProvider = hashProvider;
    }

    /**
     * @param {CreateAccountDto} createAccountDto
     * @returns {Promise<void>}
     */
    async execute(createAccountDto) {
        try {
            if (!createAccountDto.validate()) {
                throw new AppError('Invalid dto', 412);
            }

            const existsAccount = this._accountsRepository.findOneByEmail(
                createAccountDto.email
            );

            if (existsAccount) {
                throw new AppError('Account already exists');
            }

            const { name, email, password } = createAccountDto;

            const hashedPassword = await this._hashProvider.generate(password);

            const account = new Account(name, email, hashedPassword);

            await this._accountsRepository.create(account);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { CreateAccountUsecase };
