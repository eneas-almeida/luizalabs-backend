const { Router } = require('express');
const { join } = require('path');
const { readdirSync } = require('fs');

const config = async (app) => {
    try {
        const router = Router();

        app.use('/api/v1', router);

        const filePath = join(__dirname, '../routes');

        for (const fileName of readdirSync(filePath)) {
            await (await import(`../routes/${fileName}`)).default(router);
        }
    } catch (e) {
        throw e;
    }
};

module.exports = {
    config,
};
