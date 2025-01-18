const { CreateFavoriteUsecase } = require('../../../src/usecases/favorites');
const { DeleteFavoriteUsecase } = require('../../../src/usecases/favorites');
const { CreateFavoriteDto } = require('../../../src/usecases/favorites/dtos');
const { FavoritesMockRepository } = require('../../mocks/repositories');
const { UniqueIdHashMockProvider } = require('../../mocks/providers');

let createFavoriteUsecase = null;
let deleteFavoriteUsecase = null;
let favoritesMockRepository = null;
let uniqueIdHashMockProvider = null;

describe('UpdateFavoriteUsecase', () => {
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
        deleteFavoriteUsecase = new DeleteFavoriteUsecase(favoritesMockRepository);
    });

    // #1

    it('Deve poder atualiar uma lista de favoritos', async () => {
        const body = {
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto = new CreateFavoriteDto(body, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto);
    });

    // #2

    it('2', async () => {});
});
