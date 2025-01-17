const { ManagerProductFavoriteUsecase } = require('../../usecases/favorites');

class ManagerProductFavoriteController {
    /**
     * @param {ManagerProductFavoriteUsecase} managerProductFavoriteUsecase
     */
    constructor(managerProductFavoriteUsecase) {
        this._managerProductFavoriteUsecase = managerProductFavoriteUsecase;
    }

    async handle(req, res) {
        try {
            const { option, productId, favoriteId } = req.query;

            await this._managerProductFavoriteUsecase.execute(
                option,
                productId,
                favoriteId,
                req.auth.id
            );

            return res.status(200).json({
                message: 'Product manager successfully',
            });
        } catch (error) {
            const { message, statusCode, metadata } = error;

            return res
                .status(statusCode || 400)
                .json({ statusCode: statusCode || 400, message, metadata });
        }
    }
}

module.exports = { ManagerProductFavoriteController };
