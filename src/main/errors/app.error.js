class AppError extends Error {
    constructor(message, statusCode, metadata) {
        super(message);
        this.statusCode = statusCode || 400;
        this.metadata = metadata || {};
    }
}

module.exports = { AppError };
