class ProductsMockIntegration {
    async getProducts() {
        return [
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
        ];
    }
}

module.exports = { ProductsMockIntegration };
