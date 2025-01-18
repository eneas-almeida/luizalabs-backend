const { FavoritesRepository } = require('../../infra/db/repositories');
const { AppError } = require('../../main/errors');

class ManagerProductFavoriteUsecase {
    /**
     * @param {FavoritesRepository} favoritesRepository
     */
    constructor(favoritesRepository) {
        this._favoritesRepository = favoritesRepository;
    }

    async execute(option, productId, favoriteId, accountId) {
        const favorite = await this._favoritesRepository.findOne({ id: favoriteId });

        if (!favorite) {
            throw new AppError('Favorite not found', 400, {
                error: 'FavoriteNotFound',
            });
        }

        if (favorite.accountId !== accountId) {
            throw new AppError('Account not allowed', 400, {
                error: 'AccountNotAllowed',
            });
        }

        if (option === 'add') {
            if (favorite.products.length >= 5) {
                throw new AppError('Favorite list is full', 400, {
                    error: 'FavoriteListFull',
                });
            }

            if (favorite.products.includes(productId)) {
                throw new AppError('Product already added in favorite', 400, {
                    error: 'ProductAlreadyAdded',
                });
            }

            favorite.products.push(productId);

            await this._favoritesRepository.update(favorite.id, favorite);

            return;
        }

        if (option === 'sub') {
            if (!favorite.products.includes(productId)) {
                throw new AppError('Product not found in favorite', 400, {
                    error: 'ProductNotFound',
                });
            }

            favorite.products = favorite.products.filter(
                (product) => product !== productId
            );

            await this._favoritesRepository.update(favorite.id, favorite);
        }
    }
}

module.exports = { ManagerProductFavoriteUsecase };
