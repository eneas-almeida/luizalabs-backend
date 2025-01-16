const { app, banner, routes, server, errors, db, midllewares } = require('./configs');

class MainBuild {
    setBanner() {
        banner.config();
        return this;
    }

    setMiddlewares() {
        midllewares.config(app);
        return this;
    }

    async setRoutes() {
        await routes.config(app);
        return this;
    }

    setCustomErrors() {
        errors.config(app);
        return this;
    }

    async setDatabase() {
        // await db.config();
        return this;
    }

    build() {
        server.config(app);
    }
}

module.exports = { MainBuild };
