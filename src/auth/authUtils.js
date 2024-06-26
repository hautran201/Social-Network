'use strict';

const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { HEADER } = require('../constant');
const { findByUserId } = require('../services/keyToken.service');
const { AuthFailureError, NotFoundError } = require('../core/error.response');

/**
 * Create a new JWT token
 */
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, publicKey, {
            expiresIn: '2 days',
        });

        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: '7 days',
        });

        JWT.verify(accessToken, publicKey, (err, decoded) => {
            if (err) {
                console.log(`Verify Error::`, err);
            } else {
                console.log(`Verify Decoded::`, decoded);
            }
        });
        return { accessToken, refreshToken };
    } catch (error) {}
};

/**
 * 1 - Check user missing
 * 2 - get access token
 * 3 - verify token
 * 4 - check user in dbs
 * 5 - check keyStore with this userId
 * 6 - OK return next()
 * */
const authentication = asyncHandler(async (req, res, next) => {
    //step 1
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid Request');

    //step 2
    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new NotFoundError('Not found keyStore');

    const refreshToken = req.headers[HEADER.REFRESHTOKEN];

    //step 3
    if (refreshToken) {
        try {
            const decodedUser = JWT.verify(refreshToken, keyStore.privateKey);
            if (userId !== decodedUser.userId)
                throw new AuthFailureError('Invalid userId');

            req.keyStore = keyStore;
            req.user = decodedUser;
            req.refreshToken = refreshToken;
            return next();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new NotFoundError('Not found access token');

    try {
        const decodedUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodedUser.userId)
            throw new AuthFailureError('Invalid userId');
        req.keyStore = keyStore;
        req.user = decodedUser;
        return next();
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const verifyJWT = async (token, keySecret) => {
    return JWT.verify(token, keySecret);
};
module.exports = {
    createTokenPair,
    authentication,
    verifyJWT,
};
