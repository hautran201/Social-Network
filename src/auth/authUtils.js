'use strict';

const JWT = require('jsonwebtoken');

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

module.exports = {
    createTokenPair,
};
