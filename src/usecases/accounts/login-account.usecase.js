const { AccountsRepository } = require('../../infra/db/repositories/accounts.repository');
const { LoginAccountDto } = require('./dtos/login-account.dto');
const { AppError } = require('../../main/errors');

class LoginAccountUsecase {
    /**
     * @param {AccountsRepository} accountsRepository
     */
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
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

            const existsAccount = this.accountsRepository.findOneByEmail(email);

            if (!existsAccount) {
                throw new AppError('Account not found', 404);
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { LoginAccountUsecase };
