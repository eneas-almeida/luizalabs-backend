const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema(
    {
        id: String,
        title: String,
        description: String,
        accountId: String,
        products: [],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { autoIndex: false }
);

FavoritesSchema.index({ id: 1 });
FavoritesSchema.index({ title: 1 });
FavoritesSchema.index({ accountId: 1 });
FavoritesSchema.index({ createdAt: 1 });
FavoritesSchema.index({ updatedAt: 1 });

const FavoritesModelSchema = mongoose.model('favorites', FavoritesSchema, 'favorites');

FavoritesModelSchema.on('index', (err) => {
    if (err) {
        console.log(err);
    }
});

module.exports = { FavoritesModelSchema };
