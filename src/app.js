const { MainBuild } = require('../src/main/main.build');

const main = new MainBuild();

main.setBanner()
    .setMiddlewares()
    .setDatabase()
    .then((res) =>
        res
            .setRoutes()
            .then((res) => res.setCustomErrors().build())
            .catch((eRt) => console.error(eRt))
    )
    .catch((eDb) => console.error(eDb));
