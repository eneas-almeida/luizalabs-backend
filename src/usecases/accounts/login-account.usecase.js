const { AccountsRepository } = require('../../infra/db/repositories/accounts.repository');
const { BcryptHashProvider } = require('../../infra/providers/hash');
const { JwtTokenProvider } = require('../../infra/providers/token');
const { LoginAccountDto } = require('./dtos/login-account.dto');
const { AppError } = require('../../main/errors');

class LoginAccountUsecase {
    /**
     * @param {AccountsRepository} accountsRepository
     * @param {BcryptHashProvider} hashProvider
     * @param {JwtTokenProvider} tokenProvider
     */
    constructor(accountsRepository, hashProvider, tokenProvider) {
        this._accountsRepository = accountsRepository;
        this._hashProvider = hashProvider;
        this._tokenProvider = tokenProvider;
    }

    /**
     * @param {LoginAccountDto} loginAccountDto
     * @returns {Promise<void>}
     */
    async execute(loginAccountDto) {
        try {
            if (!loginAccountDto.validate()) {
                throw new AppError('Invalid dto', 412);
            }

            const { email, password } = loginAccountDto;

            const account = await this._accountsRepository.findOneByEmail(email);

            if (!account) {
                throw new AppError('Invalid email or password', 401, {
                    error: 'invalidEmailOrPassword',
                });
            }

            const isValidPassword = await this._hashProvider.compare(
                password,
                account.password
            );

            if (!isValidPassword) {
                throw new AppError('Invalid email or password', 401, {
                    error: 'invalidEmailOrPassword',
                });
            }

            const tokenGenerated = await this._tokenProvider.generate({
                id: account.id,
                email: account.email,
            });

            return {
                token: tokenGenerated,
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { LoginAccountUsecase };
