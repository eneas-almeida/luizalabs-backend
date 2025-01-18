const { FavoritesRepository } = require('../../infra/db/repositories');
const { UUIDHashProvider } = require('../../infra/providers/hash');
const { CreateFavoriteDto } = require('./dtos/create-favorite.dto');
const { AppError } = require('../../main/errors');

class CreateFavoriteUsecase {
    /**
     * @param {FavoritesRepository} favoritesRepository
     * @param {UUIDHashProvider} uniqueIdHashProvider
     */
    constructor(favoritesRepository, uniqueIdHashProvider) {
        this._favoritesRepository = favoritesRepository;
        this._uniqueIdHashProvider = uniqueIdHashProvider;
    }

    /**
     * @param {CreateFavoriteDto} createFavoriteDto
     * @returns {Promise<void>}
     */
    async execute(createFavoriteDto) {
        try {
            const { id, accountId, description, title } = createFavoriteDto;

            const count = await this._favoritesRepository.count({ accountId });

            if (count >= 1) {
                throw new AppError('You already have a favorite list', 400, {
                    error: 'AlreadyList',
                });
            }

            const uniqueId = await this._uniqueIdHashProvider.generate(id);

            await this._favoritesRepository.create({
                id: uniqueId,
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
