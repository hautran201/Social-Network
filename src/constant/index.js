'use strict';

const RoleAccount = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    SUPPORT: 'SUPPORT',
};

const StatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

const ReasonStatusCode = {
    NOT_FOUND: 'Not Found Error',
    CONFLICT: 'Conflict Error',
    UNAUTHORIZED: 'Unauthorization Error',
    FORBIDDEN: 'Forbidden Error',
    BAD_REQUEST: 'Bad Request Error',
};

module.exports = {
    RoleAccount,
    StatusCode,
    ReasonStatusCode,
};
