const { FakestoreProductIntegration } = require('../../external/integrations/products');

class ListProductsUsecase {
    /**
     * @param {FakestoreProductIntegration} productsIntegrationAdapter
     */
    constructor(productsIntegrationAdapter) {
        this._productsIntegrationAdapter = productsIntegrationAdapter;
    }

    async execute() {
        try {
            return this._productsIntegrationAdapter.getProducts();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { ListProductsUsecase };
