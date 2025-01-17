const {
    FavoritesControllerFactory,
} = require('../factories/controllers/favorites-controller.factory');

const {
    createFavoriteController,
    deleteFavoriteController,
    listFavoritesController,
    viewFavoriteController,
    updateFavoriteController,
    managerProductFavoriteController,
} = new FavoritesControllerFactory();

const { auth } = require('../middlewares');

module.exports = (router) => {
    router.post(
        '/favorites',
        auth,
        createFavoriteController.handle.bind(createFavoriteController)
    );

    router.delete(
        '/favorites/:id',
        auth,
        deleteFavoriteController.handle.bind(deleteFavoriteController)
    );

    router.get(
        '/favorites',
        auth,
        listFavoritesController.handle.bind(listFavoritesController)
    );

    router.get(
        '/favorites/:id',
        auth,
        viewFavoriteController.handle.bind(viewFavoriteController)
    );

    router.put(
        '/favorites/:id',
        auth,
        updateFavoriteController.handle.bind(updateFavoriteController)
    );

    router.patch(
        '/favorites/products',
        auth,
        managerProductFavoriteController.handle.bind(managerProductFavoriteController)
    );

    return router;
};
