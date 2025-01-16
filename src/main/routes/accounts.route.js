const { AccountsControllerFactory } = require('../factories/accounts-controller.factory');

const { createAccountController } = new AccountsControllerFactory();

module.exports = (router) => {
    router.post(
        '/accounts/create',
        createAccountController.handle.bind(createAccountController)
    );

    return router;
};
