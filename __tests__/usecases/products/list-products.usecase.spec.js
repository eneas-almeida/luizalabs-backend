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
            {
                id: 'product-id-3',
                title: 'Product C',
                price: 15.5,
                description: 'Description of product C',
                category: 'category-1',
                image: 'image-3',
            },
            {
                id: '5',
                title: 'Product 5',
                price: 25.0,
                description: 'Description of product 5',
                category: 'category-1',
                image: 'image-5',
            },
            {
                id: '10',
                title: 'Product 10',
                price: 30.0,
                description: 'Description of product 10',
                category: 'category-2',
                image: 'image-10',
            },
            {
                id: '15',
                title: 'Product 15',
                price: 35.0,
                description: 'Description of product 15',
                category: 'category-1',
                image: 'image-15',
            },
            {
                id: '20',
                title: 'Product 20',
                price: 40.0,
                description: 'Description of product 20',
                category: 'category-2',
                image: 'image-20',
            },
            {
                id: '25',
                title: 'Product 25',
                price: 45.0,
                description: 'Description of product 25',
                category: 'category-1',
                image: 'image-25',
            },
            {
                id: '30',
                title: 'Product 30',
                price: 50.0,
                description: 'Description of product 30',
                category: 'category-2',
                image: 'image-30',
            },
        ]);
    });

    // #2
    it('Deve retornar um array de produtos', async () => {
        const products = await listProductsUsecase.execute();

        expect(Array.isArray(products)).toBe(true);
    });

    // #3
    it('Deve retornar produtos com a estrutura correta', async () => {
        const products = await listProductsUsecase.execute();

        expect(products.length).toBeGreaterThan(0);

        products.forEach((product) => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('title');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('description');
            expect(product).toHaveProperty('category');
            expect(product).toHaveProperty('image');
        });
    });

    // #4
    it('Deve retornar produtos com tipos de dados corretos', async () => {
        const products = await listProductsUsecase.execute();

        products.forEach((product) => {
            expect(typeof product.id).toBe('string');
            expect(typeof product.title).toBe('string');
            expect(typeof product.price).toBe('number');
            expect(typeof product.description).toBe('string');
            expect(typeof product.category).toBe('string');
            expect(typeof product.image).toBe('string');
        });
    });

    // #5
    it('Deve retornar produtos com preço maior que zero', async () => {
        const products = await listProductsUsecase.execute();

        products.forEach((product) => {
            expect(product.price).toBeGreaterThan(0);
        });
    });

    // #6
    it('Deve retornar lista vazia quando não há produtos', async () => {
        productsMockIntegration.getProducts = jest.fn().mockResolvedValue([]);

        const products = await listProductsUsecase.execute();

        expect(products).toEqual([]);
        expect(products.length).toBe(0);
    });

    // #7
    it('Deve propagar erro quando a integração falha', async () => {
        const errorMessage = 'API indisponível';
        productsMockIntegration.getProducts = jest
            .fn()
            .mockRejectedValue(new Error(errorMessage));

        await expect(listProductsUsecase.execute()).rejects.toThrow(errorMessage);
    });

    // #8
    it('Deve propagar erro de timeout da API', async () => {
        const timeoutError = new Error('Request timeout');
        productsMockIntegration.getProducts = jest.fn().mockRejectedValue(timeoutError);

        await expect(listProductsUsecase.execute()).rejects.toThrow('Request timeout');
    });

    // #9
    it('Deve chamar o método getProducts da integração', async () => {
        const spy = jest.spyOn(productsMockIntegration, 'getProducts');

        await listProductsUsecase.execute();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    // #10
    it('Deve retornar múltiplos produtos', async () => {
        const products = await listProductsUsecase.execute();

        expect(products.length).toBeGreaterThanOrEqual(2);
    });
});
