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
        return await keytokenModel.findOne({ user: userId });
    };

    static removeTokenById = async (id) => {
        const result = await keytokenModel.deleteOne({
            _id: id,
        });
        return result;
    };

    static findRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel
            .findOne({ refreshTokensUsed: refreshToken })
            .lean();
    };

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshToken });
    };

    static deleteKeyByUserId = async (userId) => {
        return await keytokenModel.deleteOne({ user: userId });
    };
}

module.exports = KeyTokenService;
