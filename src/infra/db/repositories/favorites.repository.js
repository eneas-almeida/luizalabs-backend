const { FavoritesModelSchema } = require('../schemas');

class FavoritesRepository {
    async create(doc) {
        try {
            return FavoritesModelSchema.create(doc);
        } catch (error) {
            throw error;
        }
    }

    async list(query) {
        try {
            return FavoritesModelSchema.find(query);
        } catch (error) {
            throw error;
        }
    }

    async findOne(query) {
        try {
            return FavoritesModelSchema.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    async delete(query) {
        try {
            return FavoritesModelSchema.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }

    async update(id, doc) {
        try {
            return FavoritesModelSchema.updateOne({ id }, { $set: doc });
        } catch (error) {
            throw error;
        }
    }

    async count(query) {
        try {
            return FavoritesModelSchema.countDocuments(query);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { FavoritesRepository };
