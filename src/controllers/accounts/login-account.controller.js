const { LoginAccountUsecase } = require('../../usecases/accounts');
const { LoginAccountDto } = require('../../usecases/accounts/dtos/login-account.dto');

class LoginAccountController {
    /**
     * @param {LoginAccountUsecase} loginAccountUsecase
     */
    constructor(loginAccountUsecase) {
        this.loginAccountUsecase = loginAccountUsecase;
    }

    async handle(req, res) {
        try {
            const loginAccountDto = new LoginAccountDto(req.body);

            const data = await this.loginAccountUsecase.execute(loginAccountDto);

            return res.status(200).json({
                message: 'Login successfully',
                data,
            });
        } catch (error) {
            const { message, statusCode, metadata } = error;

            return res
                .status(statusCode || 400)
                .json({ statusCode: statusCode || 400, message, metadata });
        }
    }
}

module.exports = { LoginAccountController };
