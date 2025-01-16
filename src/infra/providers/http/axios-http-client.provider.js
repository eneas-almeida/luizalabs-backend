const axios = require('axios');
const axiosRetry = require('axios-retry');
const { HttpsAgent } = require('agentkeepalive');

const AGENTKEEPALIVE_OPTIONS = {
    maxSockets: 4000,
    maxFreeSockets: 20,
    timeout: 60000,
    freeSocketTimeout: 30000,
};

const AXIOS_RETRY_ATTEMPTS = 3;

class AxiosHttpClientProvider {
    constructor() {
        this.axios = this._createAxiosInstance();
        this.axiosRetry = this._createAxiosInstanceWithRetry();
    }

    _createAxiosInstance() {
        const axiosInstance = axios.create({
            timeout: 20000,
            // httpsAgent: new HttpsAgent(AGENTKEEPALIVE_OPTIONS),
        });

        // this._addRequestInterceptor(axiosInstance);
        // this._addResponseInterceptor(axiosInstance);

        return axiosInstance;
    }

    _addRequestInterceptor(instance) {
        instance.interceptors.request.use((req) => {
            const existsRetry = req['axios-retry'] ? req['axios-retry'].retryCount : 0;

            console.log(
                `Tentativa ${existsRetry} - ${req.method.toUpperCase()} - ${req.url}`
            );

            return req;
        });
    }

    _addResponseInterceptor(instance) {
        instance.interceptors.response.use(
            (res) => res,
            (err) => Promise.reject(err.response)
        );
    }

    _createAxiosInstanceWithRetry() {
        const axiosInstance = this._createAxiosInstance();

        // axiosRetry(axiosInstance, {
        //     retries: AXIOS_RETRY_ATTEMPTS,
        //     retryDelay: axiosRetry.exponentialDelay,
        //     shouldResetTimeout: true,
        // });

        return axiosInstance;
    }
}

module.exports = { AxiosHttpClientProvider };
