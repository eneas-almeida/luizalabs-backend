class ProductsMockIntegration {
    constructor() {
        this.products = [
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
        ];
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(productId) {
        const product = this.products.find((p) => p.id === productId);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }
}

module.exports = { ProductsMockIntegration };
