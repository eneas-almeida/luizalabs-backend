const { ListProductsUsecase } = require('../../usecases/products');

class ListProductsController {
    /**
     * @param {ListProductsUsecase} listProductsUsecase
     */
    constructor(listProductsUsecase) {
        this._listProductsUsecase = listProductsUsecase;
    }

    async handle(_req, res) {
        try {
            const data = await this._listProductsUsecase.execute();

            return res.status(200).json({
                message: 'Products listed successfully',
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

module.exports = { ListProductsController };
