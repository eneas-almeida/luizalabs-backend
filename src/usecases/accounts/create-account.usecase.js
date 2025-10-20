const { AccountsRepository } = require('../../infra/db/repositories/accounts.repository');
const { BcryptHashProvider, UUIDHashProvider } = require('../../infra/providers/hash');
const { JwtTokenProvider } = require('../../infra/providers/token');
const { CreateAccountDto } = require('./dtos/create-account.dto');
const { AppError } = require('../../main/errors');

class CreateAccountUsecase {
    /**
     * @param {AccountsRepository} accountsRepository
     * @param {BcryptHashProvider} cryptHashProvider
     * @param {UUIDHashProvider} uniqueIdHashProvider
     * @param {JwtTokenProvider} tokenProvider
     */
    constructor(
        accountsRepository,
        cryptHashProvider,
        uniqueIdHashProvider,
        tokenProvider
    ) {
        this._accountsRepository = accountsRepository;
        this._cryptHashProvider = cryptHashProvider;
        this._uniqueIdHashProvider = uniqueIdHashProvider;
        this._tokenProvider = tokenProvider;
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

            const { id, name, email, password } = createAccountDto;

            const accountByEmail = await this._accountsRepository.findOneByEmail(email);

            if (accountByEmail) {
                throw new AppError('Account already exists', 409);
            }

            const accountByName = await this._accountsRepository.findOneByName(name);

            if (accountByName) {
                throw new AppError('Account with this name already exists', 409);
            }

            const cryptedPassword = await this._cryptHashProvider.generate(password);

            const uniqueId = await this._uniqueIdHashProvider.generate(id);

            const role = 'COMPANY';

            await this._accountsRepository.create({
                id: uniqueId,
                name,
                email,
                password: cryptedPassword,
                role,
            });

            const tokenGenerated = await this._tokenProvider.generate({
                id: uniqueId,
                name,
                email,
                role,
            });

            return {
                id: uniqueId,
                name,
                email,
                role,
                token: tokenGenerated,
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { CreateAccountUsecase };
