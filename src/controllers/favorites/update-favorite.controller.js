const { UpdateFavoriteUsecase } = require('../../usecases/favorites');
const {
    UpdateFavoriteDto,
} = require('../../usecases/favorites/dtos/update-favorite.dto');

class UpdateFavoriteController {
    /**
     * @param {UpdateFavoriteUsecase} updateFavoriteUsecase
     */
    constructor(updateFavoriteUsecase) {
        this._updateFavoriteUsecase = updateFavoriteUsecase;
    }

    async handle(req, res) {
        try {
            const updateFavoriteDto = new UpdateFavoriteDto(req.body);

            await this._updateFavoriteUsecase.execute(updateFavoriteDto);

            return res.status(200).json({
                message: 'Favorite updated successfully',
            });
        } catch (error) {
            const { message, statusCode } = error;

            return res.status(statusCode).json({ statusCode, message });
        }
    }
}

module.exports = { UpdateFavoriteController };
