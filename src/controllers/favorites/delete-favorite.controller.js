const { DeleteFavoriteUsecase } = require('../../usecases/favorites');

class DeleteFavoriteController {
    /**
     * @param {DeleteFavoriteUsecase} deleteFavoriteUsecase
     */
    constructor(deleteFavoriteUsecase) {
        this._deleteFavoriteUsecase = deleteFavoriteUsecase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;

            await this._deleteFavoriteUsecase.execute(id);

            return res.status(200).json({
                message: 'Favorite deleted successfully',
            });
        } catch (error) {
            const { message, statusCode } = error;

            return res.status(statusCode).json({ statusCode, message });
        }
    }
}

module.exports = { DeleteFavoriteController };
