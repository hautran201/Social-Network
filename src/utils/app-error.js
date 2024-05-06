class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class APINotFoundError extends AppError {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

module.exports = {
    AppError,
    APINotFoundError,
};
