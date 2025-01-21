const { CreateAccountUsecase } = require('../../usecases/accounts');
const { CreateFavoriteUsecase } = require('../../usecases/favorites');
const { CreateAccountDto } = require('../../usecases/accounts/dtos');
const { CreateFavoriteDto } = require('../../usecases/favorites/dtos');

class CreateAccountController {
    /**
     * @param {CreateAccountUsecase} createAccountUsecase
     * @param {CreateFavoriteUsecase} createFavoriteUsecase
     */
    constructor(createAccountUsecase, createFavoriteUsecase) {
        this._createAccountUsecase = createAccountUsecase;
        this._createFavoriteUsecase = createFavoriteUsecase;
    }

    async handle(req, res) {
        try {
            const createAccountDto = new CreateAccountDto(req.body);

            const data = await this._createAccountUsecase.execute(createAccountDto);

            const createFavoriteDto = new CreateFavoriteDto(
                {
                    title: 'My favorite list',
                    description: 'My favorite list',
                },
                data.id
            );

            await this._createFavoriteUsecase.execute(createFavoriteDto);

            return res.status(201).json({
                message: 'Account created successfully',
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

module.exports = { CreateAccountController };
