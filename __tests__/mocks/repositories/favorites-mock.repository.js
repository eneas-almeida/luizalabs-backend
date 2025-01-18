class FavoritesMockRepository {
    constructor() {
        this.favorites = [];
    }

    async create(doc) {
        doc.products = [];
        this.favorites.push(doc);
    }

    async list(query) {
        return this.favorites.filter((favorite) => {
            for (const key in query) {
                if (favorite[key] !== query[key]) {
                    return false;
                }
            }

            return true;
        });
    }

    async findOne(query) {
        return this.favorites.find((favorite) => {
            for (const key in query) {
                if (favorite[key] !== query[key]) {
                    return false;
                }
            }

            return true;
        });
    }

    async delete(query) {
        const index = this.favorites.findIndex((favorite) => {
            for (const key in query) {
                if (favorite[key] !== query[key]) {
                    return false;
                }
            }

            return true;
        });

        if (index !== -1) {
            this.favorites.splice(index, 1);
        }
    }

    async update(id, doc) {
        const index = this.favorites.findIndex((favorite) => favorite.id === id);

        if (index !== -1) {
            this.favorites[index] = { ...this.favorites[index], ...doc };
        }
    }

    async count(query) {
        return this.favorites.filter((favorite) => {
            for (const key in query) {
                if (favorite[key] !== query[key]) {
                    return false;
                }
            }

            return true;
        }).length;
    }
}

module.exports = { FavoritesMockRepository };
