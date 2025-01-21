const { envs } = require('./envs');

const config = (app) => {
    app.listen(envs.api.port, () => {
        console.log(`Escutando na porta ${envs.api.port}`);
    });
};

module.exports = {
    config,
};
