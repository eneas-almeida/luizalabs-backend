require('dotenv').config();

const { env } = process;

const envs = {
    api: {
        name: env.API_NAME,
        ambient: env.API_AMBIENT,
        port: env.API_PORT,
        baseUrl: env.API_BASE_URL,
        version: env.API_VERSION,
    },
    postgres: {
        port: env.POSTGRES_PORT,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        name: env.POSTGRES_NAME,
    },
    mongodb: {
        host: env.MONGODB_HOST,
        port: env.MONGODB_PORT,
        user: env.MONGODB_USER,
        password: env.MONGODB_PASSWORD,
        name: env.MONGODB_NAME,
    },
};

const check = () => {};

module.exports = {
    envs,
    check,
};
