const { FavoritesRepository } = require('../../infra/db/repositories');
const { UpdateFavoriteDto } = require('./dtos/update-favorite.dto');
const { AppError } = require('../../main/errors');

class UpdateFavoriteUsecase {
    /**
     * @param {FavoritesRepository} favoritesRepository
     */
    constructor(favoritesRepository) {
        this._favoritesRepository = favoritesRepository;
    }

    /**
     * @param {UpdateFavoriteDto} updateFavoriteDto
     * @returns {Promise<void>}
     */
    async execute(updateFavoriteDto) {
        try {
            const { id, accountId, title, description } = updateFavoriteDto;

            const favorite = await this._favoritesRepository.findOne({ id });

            if (!favorite) {
                throw new AppError('Favorite not found', 400, {
                    error: 'FavoriteNotFound',
                });
            }

            if (favorite.accountId !== accountId) {
                throw new AppError('You are not allowed to update this favorite', 400, {
                    error: 'NotAllowed',
                });
            }

            await this._favoritesRepository.update(id, {
                title,
                description,
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { UpdateFavoriteUsecase };
