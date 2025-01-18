const { CreateFavoriteUsecase } = require('../../../src/usecases/favorites');
const { ListFavoritesUsecase } = require('../../../src/usecases/favorites');
const { CreateFavoriteDto } = require('../../../src/usecases/favorites/dtos');
const { FavoritesMockRepository } = require('../../mocks/repositories');
const { UniqueIdHashMockProvider } = require('../../mocks/providers');

let createFavoriteUsecase = null;
let listFavoritesUsecase = null;
let favoritesMockRepository = null;
let uniqueIdHashMockProvider = null;

describe('ListFavoriteUsecase', () => {
    beforeEach(() => {
        // Injections : Mocks
        favoritesMockRepository = new FavoritesMockRepository();
        uniqueIdHashMockProvider = new UniqueIdHashMockProvider();

        // Usecase
        createFavoriteUsecase = new CreateFavoriteUsecase(
            favoritesMockRepository,
            uniqueIdHashMockProvider
        );

        // Usecase
        listFavoritesUsecase = new ListFavoritesUsecase(favoritesMockRepository);
    });

    // #1

    it('Deve poder listar a lista de favoritos', async () => {
        const body = {
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto = new CreateFavoriteDto(body, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto);

        const favorites = await listFavoritesUsecase.execute(accountId);

        expect(favorites).toHaveLength(1);
        expect(favorites[0].title).toBe(body.title);
        expect(favorites[0].description).toBe(body.description);
        expect(favorites[0].accountId).toBe(accountId);
    });

    // #2

    it('2', async () => {});
});
