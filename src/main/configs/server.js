const config = (app) => {
    app.listen(3000, () => {
        console.log(`Escutando na porta 3000`);
    });
};

module.exports = {
    config,
};
