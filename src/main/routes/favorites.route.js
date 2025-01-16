const {
    FavoritesControllerFactory,
} = require('../factories/favorites-controller.factory');

const {
    createFavoriteController,
    deleteFavoriteController,
    listFavoritesController,
    updateFavoriteController,
} = new FavoritesControllerFactory();

module.exports = (router) => {
    router.post(
        '/favorites',
        createFavoriteController.handle.bind(createFavoriteController)
    );

    router.delete(
        '/favorites',
        deleteFavoriteController.handle.bind(deleteFavoriteController)
    );

    router.get(
        '/favorites',
        listFavoritesController.handle.bind(listFavoritesController)
    );

    router.put(
        '/favorites',
        updateFavoriteController.handle.bind(updateFavoriteController)
    );

    return router;
};
