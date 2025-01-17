const { ViewFavoriteUsecase } = require('../../usecases/favorites');

class ViewFavoriteController {
    /**
     * @param {ViewFavoriteUsecase} viewFavoriteUsecase
     */
    constructor(viewFavoriteUsecase) {
        this._viewFavoriteUsecase = viewFavoriteUsecase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;

            const data = await this._viewFavoriteUsecase.execute(id, req.auth.id);

            return res.status(200).json({
                message: 'Favorite viewed successfully',
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

module.exports = { ViewFavoriteController };
