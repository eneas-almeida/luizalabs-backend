const { CreateFavoriteController } = require('./create-favorite.controller');
const { DeleteFavoriteController } = require('./delete-favorite.controller');
const { UpdateFavoriteController } = require('./update-favorite.controller');
const { ListFavoritesController } = require('./list-favorites.controller');
const { ViewFavoriteController } = require('./view-favorite.controller');
const {
    ManagerProductFavoriteController,
} = require('./manager-product-favorite.controller');

module.exports = {
    CreateFavoriteController,
    DeleteFavoriteController,
    UpdateFavoriteController,
    ListFavoritesController,
    ViewFavoriteController,
    ManagerProductFavoriteController,
};
