const { FavoritesRepository } = require('../../infra/db/repositories');
const { AppError } = require('../../main/errors');

class ViewFavoriteUsecase {
    /**
     * @param {FavoritesRepository} favoritesRepository
     */
    constructor(favoritesRepository) {
        this._favoritesRepository = favoritesRepository;
    }

    async execute(id, accountId) {
        try {
            const favorite = await this._favoritesRepository.findOne({ id });

            if (!favorite) {
                throw new AppError('Favorite not found', 400, {
                    error: 'FavoriteNotFound',
                });
            }

            if (favorite.accountId !== accountId) {
                throw new AppError('You are not allowed to delete this favorite', 400, {
                    error: 'NotAllowed',
                });
            }

            return await this._favoritesRepository.findOne({ id });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { ViewFavoriteUsecase };
