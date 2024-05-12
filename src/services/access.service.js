'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const accountModel = require('../models/account.model');
const { ROLE_ACCOUNT } = require('../constant');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const {
    BadRequestError,
    AuthenticateError,
} = require('../core/error.response');
const { findByEmail } = require('./account.service');

class AccessService {
    static signUp = async ({ name, email, password }) => {
        //step1: check email exist
        const holderAccount = await accountModel.findOne({ email }).lean();
        if (holderAccount) {
            throw new BadRequestError('Error:: Account already registered!');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newAccount = await accountModel.create({
            name,
            email,
            password: passwordHash,
            roles: [ROLE_ACCOUNT.USER],
        });

        if (newAccount) {
            //create publicKey and privateKey
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');
            //save conlection KeyStore
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newAccount._id,
                privateKey,
                publicKey,
            });
            if (!keyStore) {
                throw new BadRequestError('Error: Key store not created');
            }

            //create token
            const tokens = await createTokenPair(
                {
                    userId: newAccount._id,
                    email: newAccount.email,
                },
                publicKey,
                privateKey,
            );
            console.log('Created Token Success::', tokens);
            return {
                account: getInfoData({
                    fileds: ['_id', 'name', 'email'],
                    object: newAccount,
                }),
                tokens,
            };
        }
        return {
            code: 200,
            metadata: null,
        };
    };

    static login = async ({ email, password }) => {
        const foundAccount = await findByEmail({ email });
        if (!foundAccount) {
            throw new BadRequestError('Account not registered!');
        }
        const isMatch = await bcrypt.compare(password, foundAccount.password);
        if (!isMatch) {
            throw new AuthenticateError('Authentication failed');
        }

        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');

        const { _id: userId } = foundAccount;

        const tokens = await createTokenPair(
            {
                userId: userId,
                email: foundAccount.email,
            },
            publicKey,
            privateKey,
        );
        console.log(tokens);

        await KeyTokenService.createKeyToken({
            userId,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        });

        return {
            account: getInfoData({
                fileds: ['_id', 'name', 'email'],
                object: foundAccount,
            }),
            tokens,
        };
    };

    static logout = async (keyStore) => {
        const delKey = await KeyTokenService.removeTokenById(keyStore._id);
        console.log(delKey);
        return delKey;
    };
}

module.exports = AccessService;
