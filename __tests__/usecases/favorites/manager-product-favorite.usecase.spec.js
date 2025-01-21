const { CreateFavoriteUsecase } = require('../../../src/usecases/favorites');
const { ManagerProductFavoriteUsecase } = require('../../../src/usecases/favorites');
const { CreateFavoriteDto } = require('../../../src/usecases/favorites/dtos');
const { FavoritesMockRepository } = require('../../mocks/repositories');
const { ProductsMockIntegration } = require('../../mocks/integrations');
const { UniqueIdHashMockProvider } = require('../../mocks/providers');

let createFavoriteUsecase = null;
let managerProductFavoriteUsecase = null;
let favoritesMockRepository = null;
let productsMockIntegration = null;
let uniqueIdHashMockProvider = null;

describe('ManagerProductFavoriteUsecase', () => {
    beforeEach(() => {
        // Injections : Mocks
        favoritesMockRepository = new FavoritesMockRepository();
        uniqueIdHashMockProvider = new UniqueIdHashMockProvider();
        productsMockIntegration = new ProductsMockIntegration();

        // Usecase
        createFavoriteUsecase = new CreateFavoriteUsecase(
            favoritesMockRepository,
            uniqueIdHashMockProvider
        );

        managerProductFavoriteUsecase = new ManagerProductFavoriteUsecase(
            favoritesMockRepository,
            productsMockIntegration
        );
    });

    // #1

    it('Deve poder adicionar produto na lista de favoritos', async () => {
        const body = {
            id: 'favorite-id-1',
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto = new CreateFavoriteDto(body, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto);

        await managerProductFavoriteUsecase.execute(
            'add',
            '5',
            'favorite-id-1',
            'account-id-1'
        );
    });

    // #2

    it('Deve não poder adicionar um produto existente na lista de favoritos', async () => {
        const body = {
            id: 'favorite-id-1',
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto = new CreateFavoriteDto(body, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto);

        await managerProductFavoriteUsecase.execute(
            'add',
            '5',
            'favorite-id-1',
            'account-id-1'
        );

        await expect(
            managerProductFavoriteUsecase.execute(
                'add',
                '5',
                'favorite-id-1',
                'account-id-1'
            )
        ).rejects.toThrow('Product already added in favorite');
    });

    // #3

    it('Deve não poder adicionar 5 produtos a mesma lista de favoritos', async () => {
        const body = {
            id: 'favorite-id-1',
            title: 'Lista de favoritos A',
            description: 'Descrição da lista de favoritos A',
        };

        const accountId = 'account-id-1';

        const createFavoriteDto = new CreateFavoriteDto(body, accountId);

        await createFavoriteUsecase.execute(createFavoriteDto);

        await managerProductFavoriteUsecase.execute(
            'add',
            '5',
            'favorite-id-1',
            'account-id-1'
        );

        await managerProductFavoriteUsecase.execute(
            'add',
            '10',
            'favorite-id-1',
            'account-id-1'
        );

        await managerProductFavoriteUsecase.execute(
            'add',
            '15',
            'favorite-id-1',
            'account-id-1'
        );

        await managerProductFavoriteUsecase.execute(
            'add',
            '20',
            'favorite-id-1',
            'account-id-1'
        );

        await managerProductFavoriteUsecase.execute(
            'add',
            '25',
            'favorite-id-1',
            'account-id-1'
        );

        await expect(
            managerProductFavoriteUsecase.execute(
                'add',
                '30',
                'favorite-id-1',
                'account-id-1'
            )
        ).rejects.toThrow('Favorite list is full');
    });
});
