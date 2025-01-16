const { ProductsControllerFactory } = require('../factories/products-controller.factory');

const { listProductsController } = new ProductsControllerFactory();

module.exports = (router) => {
    router.get('/products', listProductsController.handle.bind(listProductsController));

    return router;
};
