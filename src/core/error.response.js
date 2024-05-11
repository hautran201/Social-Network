'use strict';

const { StatusCode, ReasonPhrases } = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statusCode = StatusCode.CONFLICT,
    ) {
        super(message, statusCode);
    }
}
class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.BAD_REQUEST,
        statusCode = StatusCode.BAD_REQUEST,
    ) {
        super(message, statusCode);
    }
}
class ForbiddenError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.FORBIDDEN,
        statusCode = StatusCode.FORBIDDEN,
    ) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    ForbiddenError,
};
