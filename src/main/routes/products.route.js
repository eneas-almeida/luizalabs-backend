const {
    ProductsControllerFactory,
} = require('../factories/controllers/products-controller.factory');

const { listProductsController } = new ProductsControllerFactory();

const { auth } = require('../middlewares');

module.exports = (router) => {
    router.get(
        '/products',
        auth,
        listProductsController.handle.bind(listProductsController)
    );

    return router;
};
