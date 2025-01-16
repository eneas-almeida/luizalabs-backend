const { AccountsControllerFactory } = require('../factories/accounts-controller.factory');

const { createAccountController, loginAccountController } =
    new AccountsControllerFactory();

module.exports = (router) => {
    router.post(
        '/accounts/create',
        createAccountController.handle.bind(createAccountController)
    );

    router.post(
        '/accounts/login',
        loginAccountController.handle.bind(loginAccountController)
    );

    return router;
};
