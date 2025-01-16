const { CreateFavoriteUsecase } = require('./create-favorite.usecase');
const { DeleteFavoriteUsecase } = require('./delete-favorite.usecase');
const { UpdateFavoriteUsecase } = require('./update-favorite.usecase');
const { ListFavoritesUsecase } = require('./list-favorites.usecase');
const { ViewFavoriteUsecase } = require('./view-favorite.usecase');

module.exports = {
    CreateFavoriteUsecase,
    DeleteFavoriteUsecase,
    UpdateFavoriteUsecase,
    ListFavoritesUsecase,
    ViewFavoriteUsecase,
};
