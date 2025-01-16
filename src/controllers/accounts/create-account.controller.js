const { CreateAccountUsecase } = require('../../usecases/accounts');
const { CreateAccountDto } = require('../../usecases/accounts/dtos/create-account.dto');

class CreateAccountController {
    /**
     * @param {CreateAccountUsecase} createAccountUsecase
     */
    constructor(createAccountUsecase) {
        this._injectionsValidate(createAccountUsecase);
        this.createAccountUsecase = createAccountUsecase;
    }

    async handle(req, res) {
        try {
            const createAccountDto = new CreateAccountDto(req.body);

            await this.createAccountUsecase.execute(createAccountDto);

            return res.status(201).json({
                message: 'Account created successfully',
            });
        } catch (error) {
            const { message, statusCode } = error;

            return res.status(statusCode).json({ statusCode, message });
        }
    }

    // Method to validate the injections
    _injectionsValidate(createAccountUsecase) {
        if (!createAccountUsecase) {
            throw new Error('Invalid usecase createAccountUsecase instance');
        }
    }
}

module.exports = { CreateAccountController };
