const { Favorite } = require('../../../domain/favorite');

class FavoritesRepository {
    /**
     * @param {Favorite} favorite
     */
    async create(favorite) {
        return favorite;
    }

    /**
     * @returns {Promise<Favorite[]>}
     */
    async list() {
        return [];
    }

    async delete(id) {}

    async update() {}
}

module.exports = { FavoritesRepository };
