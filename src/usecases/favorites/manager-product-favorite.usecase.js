const { FavoritesRepository } = require('../../infra/db/repositories');
const { FakestoreIntegration } = require('../../external/integrations');
const { AppError } = require('../../main/errors');

class ManagerProductFavoriteUsecase {
    /**
     * @param {FavoritesRepository} favoritesRepository
     * @param {FakestoreIntegration} productsIntegrationAdapter
     */
    constructor(favoritesRepository, productsIntegrationAdapter) {
        this._favoritesRepository = favoritesRepository;
        this._productsIntegrationAdapter = productsIntegrationAdapter;
    }

    async execute(option, productId, favoriteId, accountId) {
        console.log(favoriteId);
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

            const existsProductInFavoriteList = favorite.products.find(
                (product) => product.id === productId
            );

            if (existsProductInFavoriteList) {
                throw new AppError('Product already added in favorite', 400, {
                    error: 'ProductAlreadyAdded',
                });
            }

            const product = await this._productsIntegrationAdapter.getProductById(
                productId
            );

            if (!product) {
                throw new AppError('Product not found', 400, {
                    error: 'ProductNotFoundFindById',
                });
            }

            favorite.products.push({
                id: productId,
                title: product.title,
                price: product.price,
                image: product.image,
            });

            await this._favoritesRepository.update(favorite.id, favorite);

            return;
        }

        if (option === 'sub') {
            const findProductById = favorite.products.find(
                (product) => product.id === productId
            );

            if (!findProductById) {
                throw new AppError('Product not found in favorite', 400, {
                    error: 'ProductNotFound',
                });
            }

            favorite.products = favorite.products.filter(
                (product) => product.id !== productId
            );

            await this._favoritesRepository.update(favorite.id, favorite);
        }
    }
}

module.exports = { ManagerProductFavoriteUsecase };
