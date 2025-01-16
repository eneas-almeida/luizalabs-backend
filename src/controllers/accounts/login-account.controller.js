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

            await this.loginAccountUsecase.execute(loginAccountDto);

            return res.status(200).json({
                message: 'Login successfully',
            });
        } catch (error) {
            const { message, statusCode } = error;

            return res.status(statusCode).json({ statusCode, message });
        }
    }
}

module.exports = { LoginAccountController };
