const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { autoIndex: false }
);

AccountsSchema.index({ name: 1 });
AccountsSchema.index({ email: 1 });
AccountsSchema.index({ createdAt: 1 });
AccountsSchema.index({ updatedAt: 1 });

const AccountsModelSchema = mongoose.model('accounts', AccountsSchema, 'accounts');

AccountsModelSchema.on('index', (err) => {
    if (err) {
        console.log(err);
    }
});

module.exports = { AccountsModelSchema };
