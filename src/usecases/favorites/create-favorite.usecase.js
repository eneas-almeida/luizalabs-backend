const { FavoritesRepository } = require('../../infra/db/repositories');
const { CreateFavoriteDto } = require('./dtos/create-favorite.dto');
const { AppError } = require('../../main/errors');
const { v4 } = require('uuid');

class CreateFavoriteUsecase {
    /**
     * @param {FavoritesRepository} favoritesRepository
     */
    constructor(favoritesRepository) {
        this._favoritesRepository = favoritesRepository;
    }

    /**
     * @param {CreateFavoriteDto} createFavoriteDto
     * @returns {Promise<void>}
     */
    async execute(createFavoriteDto) {
        try {
            const { accountId, description, title } = createFavoriteDto;

            const count = await this._favoritesRepository.count({ accountId });

            if (count >= 1) {
                throw new AppError('You already have a favorite list', 400, {
                    error: 'AlreadyList',
                });
            }

            await this._favoritesRepository.create({
                id: v4(),
                accountId,
                description,
                title,
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { CreateFavoriteUsecase };
