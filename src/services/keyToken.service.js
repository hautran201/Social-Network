'use strict';

const { Types, default: mongoose } = require('mongoose');
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

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: userId }).lean();
    };

    static removeTokenById = async (id) => {
        const result = await keytokenModel.deleteOne({
            _id: id,
        });
        return result;
    };
}

module.exports = KeyTokenService;
