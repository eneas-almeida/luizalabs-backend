const { ListProductsController } = require('../../../controllers/products');
const { ListProductsUsecase } = require('../../../usecases/products');
const { ProductsIntegrationAdapter } = require('../../adapters/integrations');
const {
    FakestoreProductIntegration,
} = require('../../../external/integrations/products');
const {
    AxiosHttpClientProvider,
} = require('../../../infra/providers/http/axios-http-client.provider');

class ProductsControllerFactory {
    constructor() {
        this.listProductsController = new ListProductsController(
            new ListProductsUsecase(
                new ProductsIntegrationAdapter(
                    new FakestoreProductIntegration(new AxiosHttpClientProvider())
                )
            )
        );
    }
}

module.exports = { ProductsControllerFactory };
