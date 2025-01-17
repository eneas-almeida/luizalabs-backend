const { CreateAccountUsecase } = require('../../usecases/accounts');
const { CreateAccountDto } = require('../../usecases/accounts/dtos/create-account.dto');

class CreateAccountController {
    /**
     * @param {CreateAccountUsecase} createAccountUsecase
     */
    constructor(createAccountUsecase) {
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
            const { message, statusCode, metadata } = error;

            return res
                .status(statusCode || 400)
                .json({ statusCode: statusCode || 400, message, metadata });
        }
    }
}

module.exports = { CreateAccountController };
