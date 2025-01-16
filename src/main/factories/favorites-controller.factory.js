const {
    CreateFavoriteController,
    DeleteFavoriteController,
    UpdateFavoriteController,
    ListFavoritesController,
    ViewFavoriteController,
} = require('../../controllers/favorites');

const {
    CreateFavoriteUsecase,
    DeleteFavoriteUsecase,
    UpdateFavoriteUsecase,
    ListFavoritesUsecase,
    ViewFavoriteUsecase,
} = require('../../usecases/favorites');

const { FavoritesRepository } = require('../../infra/db/repositories');
const favoritesRepository = new FavoritesRepository();

class FavoritesControllerFactory {
    constructor() {
        this.createFavoriteController = new CreateFavoriteController(
            new CreateFavoriteUsecase(favoritesRepository)
        );

        this.deleteFavoriteController = new DeleteFavoriteController(
            new DeleteFavoriteUsecase(favoritesRepository)
        );

        this.updateFavoriteController = new UpdateFavoriteController(
            new UpdateFavoriteUsecase(favoritesRepository)
        );

        this.listFavoritesController = new ListFavoritesController(
            new ListFavoritesUsecase(favoritesRepository)
        );

        this.viewFavoriteController = new ViewFavoriteController(
            new ViewFavoriteUsecase(favoritesRepository)
        );
    }
}

module.exports = { FavoritesControllerFactory };
