const { CreateFavoriteUsecase } = require('../../../src/usecases/favorites');
const { ViewFavoriteUsecase } = require('../../../src/usecases/favorites');
const { CreateFavoriteDto } = require('../../../src/usecases/favorites/dtos');
const { FavoritesMockRepository } = require('../../mocks/repositories');
const { UniqueIdHashMockProvider } = require('../../mocks/providers');

let createFavoriteUsecase = null;
let viewFavoriteUsecase = null;
let favoritesMockRepository = null;
let uniqueIdHashMockProvider = null;

describe('ViewFavoriteUsecase', () => {
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
        viewFavoriteUsecase = new ViewFavoriteUsecase(favoritesMockRepository);
    });

    // #1

    it('Deve poder visualizar uma lista de favoritos', async () => {
        const body = {
            id: 'favorite-id-1',
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto = new CreateFavoriteDto(body, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto);

        const favorite = await viewFavoriteUsecase.execute(body.id, accountId);

        expect(favorite).not.toBeNull();
        expect(favorite.id).toBe(body.id);
        expect(favorite.title).toBe(body.title);
        expect(favorite.description).toBe(body.description);
        expect(favorite.accountId).toBe(accountId);
    });

    // #2

    it('2', async () => {});
});
