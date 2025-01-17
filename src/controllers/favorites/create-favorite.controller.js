const { CreateFavoriteUsecase } = require('../../usecases/favorites');
const {
    CreateFavoriteDto,
} = require('../../usecases/favorites/dtos/create-favorite.dto');

class CreateFavoriteController {
    /**
     * @param {CreateFavoriteUsecase} createFavoriteUsecase
     */
    constructor(createFavoriteUsecase) {
        this._createFavoriteUsecase = createFavoriteUsecase;
    }

    async handle(req, res) {
        try {
            const createFavoriteDto = new CreateFavoriteDto(req.body, req.auth.id);

            await this._createFavoriteUsecase.execute(createFavoriteDto);

            return res.status(201).json({
                message: 'Favorite list created successfully',
            });
        } catch (error) {
            const { message, statusCode, metadata } = error;

            return res
                .status(statusCode || 400)
                .json({ statusCode: statusCode || 400, message, metadata });
        }
    }
}

module.exports = { CreateFavoriteController };
