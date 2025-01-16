const {
    FakestoreProductIntegration,
} = require('../../../external/integrations/products');

class ProductsIntegrationAdapter {
    /**
     * @param {FakestoreProductIntegration} productsIntegration
     */
    constructor(productsIntegration) {
        this._productsIntegration = productsIntegration;
    }

    /* Adapters */

    async getProducts() {
        return this._productsIntegration.getProducts();
    }
}

module.exports = { ProductsIntegrationAdapter };
