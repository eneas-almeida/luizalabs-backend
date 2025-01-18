const { CreateFavoriteUsecase } = require('../../../src/usecases/favorites');
const { CreateFavoriteDto } = require('../../../src/usecases/favorites/dtos');
const { FavoritesMockRepository } = require('../../mocks/repositories');
const { UniqueIdHashMockProvider } = require('../../mocks/providers');

let createFavoriteUsecase = null;
let favoritesMockRepository = null;
let uniqueIdHashMockProvider = null;

describe('CreateFavoriteUsecase', () => {
    beforeEach(() => {
        // Injections : Mocks
        favoritesMockRepository = new FavoritesMockRepository();
        uniqueIdHashMockProvider = new UniqueIdHashMockProvider();

        // Usecase
        createFavoriteUsecase = new CreateFavoriteUsecase(
            favoritesMockRepository,
            uniqueIdHashMockProvider
        );
    });

    // #1

    it('Deve poder criar uma lista de favoritos', async () => {
        const body = {
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto = new CreateFavoriteDto(body, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto);
    });

    // #2

    it('Deve não ser possível criar mais de uma lista de favoritos', async () => {
        const body_a = {
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const body_b = {
            title: 'Lista de favoritos B',
            description: 'Descrição da lista de favoritos B',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto_a = new CreateFavoriteDto(body_a, accountId);
        const createFavoriteDto_b = new CreateFavoriteDto(body_b, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto_a);

        await expect(createFavoriteUsecase.execute(createFavoriteDto_b)).rejects.toThrow(
            'You already have a favorite list'
        );
    });
});
