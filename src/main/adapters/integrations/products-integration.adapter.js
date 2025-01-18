const { FakestoreIntegration } = require('../../../external/integrations');

class ProductsIntegrationAdapter {
    /**
     * @param {FakestoreIntegration} productsIntegration
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
