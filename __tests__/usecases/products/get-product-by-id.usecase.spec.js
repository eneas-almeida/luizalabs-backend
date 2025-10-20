const { ProductsMockIntegration } = require('../../mocks/integrations');

// Criando um usecase simples para testar getProductById
class GetProductByIdUsecase {
    constructor(productsIntegrationAdapter) {
        this._productsIntegrationAdapter = productsIntegrationAdapter;
    }

    async execute(productId) {
        if (!productId) {
            throw new Error('Product ID is required');
        }

        try {
            return await this._productsIntegrationAdapter.getProductById(productId);
        } catch (error) {
            throw error;
        }
    }
}

let getProductByIdUsecase = null;
let productsMockIntegration = null;

describe('GetProductByIdUsecase', () => {
    beforeEach(() => {
        // Injections : Mocks
        productsMockIntegration = new ProductsMockIntegration();

        // Usecase
        getProductByIdUsecase = new GetProductByIdUsecase(productsMockIntegration);
    });

    // #1
    it('Deve buscar um produto por ID', async () => {
        const productId = 'product-id-1';
        const product = await getProductByIdUsecase.execute(productId);

        expect(product).toEqual({
            id: 'product-id-1',
            title: 'Product A',
            price: 10.0,
            description: 'Description of product A',
            category: 'category-1',
            image: 'image-1',
        });
    });

    // #2
    it('Deve retornar produto com a estrutura correta', async () => {
        const productId = 'product-id-1';
        const product = await getProductByIdUsecase.execute(productId);

        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('image');
    });

    // #3
    it('Deve retornar produto com tipos de dados corretos', async () => {
        const productId = 'product-id-1';
        const product = await getProductByIdUsecase.execute(productId);

        expect(typeof product.id).toBe('string');
        expect(typeof product.title).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.description).toBe('string');
        expect(typeof product.category).toBe('string');
        expect(typeof product.image).toBe('string');
    });

    // #4
    it('Deve lançar erro quando o ID não for fornecido', async () => {
        await expect(getProductByIdUsecase.execute()).rejects.toThrow(
            'Product ID is required'
        );
    });

    // #5
    it('Deve lançar erro quando o ID for null', async () => {
        await expect(getProductByIdUsecase.execute(null)).rejects.toThrow(
            'Product ID is required'
        );
    });

    // #6
    it('Deve lançar erro quando o ID for undefined', async () => {
        await expect(getProductByIdUsecase.execute(undefined)).rejects.toThrow(
            'Product ID is required'
        );
    });

    // #7
    it('Deve lançar erro quando o ID for string vazia', async () => {
        await expect(getProductByIdUsecase.execute('')).rejects.toThrow(
            'Product ID is required'
        );
    });

    // #8
    it('Deve chamar o método getProductById da integração com o ID correto', async () => {
        const productId = 'product-id-1';
        const spy = jest.spyOn(productsMockIntegration, 'getProductById');

        await getProductByIdUsecase.execute(productId);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(productId);
    });

    // #9
    it('Deve propagar erro quando a integração falha', async () => {
        const errorMessage = 'Product not found';
        productsMockIntegration.getProductById = jest
            .fn()
            .mockRejectedValue(new Error(errorMessage));

        await expect(getProductByIdUsecase.execute('invalid-id')).rejects.toThrow(
            errorMessage
        );
    });

    // #10
    it('Deve buscar produtos com IDs diferentes', async () => {
        const spy = jest.spyOn(productsMockIntegration, 'getProductById');

        await getProductByIdUsecase.execute('product-id-1');
        await getProductByIdUsecase.execute('product-id-2');

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenNthCalledWith(1, 'product-id-1');
        expect(spy).toHaveBeenNthCalledWith(2, 'product-id-2');
    });

    // #11
    it('Deve propagar erro de API indisponível', async () => {
        const errorMessage = 'API externa indisponível';
        productsMockIntegration.getProductById = jest
            .fn()
            .mockRejectedValue(new Error(errorMessage));

        await expect(getProductByIdUsecase.execute('product-id-1')).rejects.toThrow(
            errorMessage
        );
    });


});
