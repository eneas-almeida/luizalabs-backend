const { ListFavoritesUsecase } = require('../../usecases/favorites');

class ListFavoritesController {
    /**
     * @param {ListFavoritesUsecase} listFavoritesUsecase
     */
    constructor(listFavoritesUsecase) {
        this._listFavoritesUsecase = listFavoritesUsecase;
    }

    async handle(req, res) {
        try {
            const data = await this._listFavoritesUsecase.execute(req.auth.id);

            return res.status(200).json({
                message: 'Favorite listed successfully',
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

module.exports = { ListFavoritesController };
