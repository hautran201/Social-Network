'use strict';

const keytokenModel = require('../models/keytoken.model');

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken,
    }) => {
        try {
            const filter = { user: userId },
                update = {
                    user: userId,
                    publicKey,
                    privateKey,
                    refreshToken,
                    refreshTokensUsed: [],
                },
                options = {
                    upsert: true,
                    new: true,
                };

            const tokens = await keytokenModel.findOneAndUpdate(
                filter,
                update,
                options,
            );

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyTokenService;
