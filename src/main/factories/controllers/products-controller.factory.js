const { ListProductsController } = require('../../../controllers/products');
const { ListProductsUsecase } = require('../../../usecases/products');
const { ProductsIntegrationAdapter } = require('../../adapters/integrations');
const { FakestoreIntegration } = require('../../../external/integrations');
const {
    AxiosHttpClientProvider,
} = require('../../../infra/providers/http/axios-http-client.provider');

class ProductsControllerFactory {
    constructor() {
        this.listProductsController = new ListProductsController(
            new ListProductsUsecase(
                new ProductsIntegrationAdapter(
                    new FakestoreIntegration(new AxiosHttpClientProvider())
                )
            )
        );
    }
}

module.exports = { ProductsControllerFactory };
