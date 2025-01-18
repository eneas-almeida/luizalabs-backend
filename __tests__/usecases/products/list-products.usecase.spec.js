const { ListProductsUsecase } = require('../../../src/usecases/products');
const { ProductsMockIntegration } = require('../../mocks/integrations');

let listProductsUsecase = null;
let productsMockIntegration = null;

describe('ListProductsUsecase', () => {
    beforeEach(() => {
        // Injections : Mocks
        productsMockIntegration = new ProductsMockIntegration();

        // Usecase
        listProductsUsecase = new ListProductsUsecase(productsMockIntegration);
    });

    // #1

    it('Deve poder listar os produtos', async () => {
        const products = await listProductsUsecase.execute();

        expect(products).toEqual([
            {
                id: 'product-id-1',
                title: 'Product A',
                price: 10.0,
                description: 'Description of product A',
                category: 'category-1',
                image: 'image-1',
            },
            {
                id: 'product-id-2',
                title: 'Product B',
                price: 20.0,
                description: 'Description of product B',
                category: 'category-2',
                image: 'image-2',
            },
        ]);
    });
});
