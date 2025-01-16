const { AccountsRepository } = require('../../infra/db/repositories/accounts.repository');
const { CreateAccountDto } = require('./dtos/create-account.dto');
const { AppError } = require('../../main/errors');
const { Account } = require('../../domain/account');

class CreateAccountUsecase {
    /**
     * @param {AccountsRepository} accountsRepository
     */
    constructor(accountsRepository) {
        this._injectionsValidate(accountsRepository);
        this.accountsRepository = accountsRepository;
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

            const existsAccount = this.accountsRepository.findOneByEmail(
                createAccountDto.email
            );

            if (existsAccount) {
                throw new AppError('Account already exists');
            }

            const { name, email, password } = createAccountDto;

            const account = new Account(name, email, password);

            await this.accountsRepository.create(account);
        } catch (error) {
            throw error;
        }
    }

    // Method to validate the injections
    _injectionsValidate(accountsRepository) {
        if (!accountsRepository) {
            throw new Error('Invalid repository accountsRepository instance');
        }
    }
}

module.exports = { CreateAccountUsecase };
