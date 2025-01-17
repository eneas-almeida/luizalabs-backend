const { AccountsRepository } = require('../../infra/db/repositories/accounts.repository');
const { BcryptHashProvider } = require('../../infra/providers/hash');
const { CreateAccountDto } = require('./dtos/create-account.dto');
const { AppError } = require('../../main/errors');
const { v4 } = require('uuid');

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

            const { name, email, password } = createAccountDto;

            const account = await this._accountsRepository.findOneByEmail(email);

            if (account) {
                throw new AppError('Account already exists', 409);
            }

            const hashedPassword = await this._hashProvider.generate(password);

            await this._accountsRepository.create({
                id: v4(),
                name,
                email,
                password: hashedPassword,
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { CreateAccountUsecase };
