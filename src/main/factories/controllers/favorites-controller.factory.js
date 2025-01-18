const {
    CreateFavoriteController,
    DeleteFavoriteController,
    UpdateFavoriteController,
    ListFavoritesController,
    ViewFavoriteController,
    ManagerProductFavoriteController,
} = require('../../../controllers/favorites');

const {
    CreateFavoriteUsecase,
    DeleteFavoriteUsecase,
    UpdateFavoriteUsecase,
    ListFavoritesUsecase,
    ViewFavoriteUsecase,
    ManagerProductFavoriteUsecase,
} = require('../../../usecases/favorites');

const { UUIDHashProvider } = require('../../../infra/providers/hash');
const uniqueIdHashProvider = new UUIDHashProvider();

const { FavoritesRepository } = require('../../../infra/db/repositories');
const favoritesRepository = new FavoritesRepository();

class FavoritesControllerFactory {
    constructor() {
        this.createFavoriteController = new CreateFavoriteController(
            new CreateFavoriteUsecase(favoritesRepository, uniqueIdHashProvider)
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

        this.managerProductFavoriteController = new ManagerProductFavoriteController(
            new ManagerProductFavoriteUsecase(favoritesRepository)
        );
    }
}

module.exports = { FavoritesControllerFactory };
