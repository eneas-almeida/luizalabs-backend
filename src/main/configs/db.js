const mongoose = require('mongoose');
const { envs } = require('./envs');

const config = async () => {
    const { user, password, host, port, name } = envs.mongodb;

    const uri = `mongodb://${user}:${password}@${host}:${port}/${name}`;

    const options = {
        connectTimeoutMS: 10000,
        ssl: false,
        sslCA: null,
    };

    await mongoose
        .connect(uri, options)
        .then((_) => {
            console.log(`[ok] Banco de dados conectado na porta ${port}`);
        })
        .catch((err) => {
            console.log(`[--] erro em conectar com o banco de dados ${port}`);
            throw err;
        });
};

module.exports = {
    config,
};
