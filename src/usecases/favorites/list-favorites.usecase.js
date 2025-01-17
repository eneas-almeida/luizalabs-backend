const { FavoritesRepository } = require('../../infra/db/repositories');

class ListFavoritesUsecase {
    /**
     * @param {FavoritesRepository} favoritesRepository
     */
    constructor(favoritesRepository) {
        this._favoritesRepository = favoritesRepository;
    }

    async execute(accountId) {
        try {
            return this._favoritesRepository.list({ accountId });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { ListFavoritesUsecase };
