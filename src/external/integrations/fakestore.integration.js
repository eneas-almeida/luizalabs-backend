const { AxiosHttpClientProvider } = require('../../infra/providers/http');

class FakestoreIntegration {
    /**
     * @param {AxiosHttpClientProvider} httpClient
     */
    constructor(httpClient) {
        this._axiosRetry = httpClient.axiosRetry;
    }

    async getProducts() {
        try {
            const res = await this._axiosRetry.get('https://fakestoreapi.com/products');
            return res.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(productId) {
        try {
            const res = await this._axiosRetry.get(
                `https://fakestoreapi.com/products/${productId}`
            );
            return res.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = { FakestoreIntegration };
