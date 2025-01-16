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
            const products = await this._listProductsUsecase.execute();

            return res.status(200).json({
                message: 'Products listed successfully',
                products,
            });
        } catch (error) {
            const { message, statusCode } = error;

            return res.status(statusCode).json({ statusCode, message });
        }
    }
}

module.exports = { ListProductsController };
