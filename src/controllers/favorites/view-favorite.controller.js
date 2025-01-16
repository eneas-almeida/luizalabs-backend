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

            await this._viewFavoriteUsecase.execute(id);

            return res.status(200).json({
                message: 'Favorite viewed successfully',
            });
        } catch (error) {
            const { message, statusCode } = error;

            return res.status(statusCode).json({ statusCode, message });
        }
    }
}

module.exports = { ViewFavoriteController };
