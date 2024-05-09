'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const accountModel = require('../models/account.model');
const { RoleAccount } = require('../constant');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            //step1: check email exist
            const holderAccount = await accountModel.findOne({ email }).lean();
            if (holderAccount) {
                return {
                    code: '200',
                    message: 'Your account already exists.',
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newAccount = await accountModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleAccount.USER],
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
                    return {
                        code: '400',
                        message: 'keyStore error',
                    };
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
                    code: 201,
                    metadata: {
                        account: getInfoData({
                            fileds: ['_id', 'name', 'email'],
                            object: newAccount,
                        }),
                        tokens,
                    },
                };
            }
            return {
                code: 200,
                metadata: null,
            };
        } catch (error) {
            return {
                code: 400,
                message: error.message,
                status: 'error',
            };
        }
    };
}

module.exports = AccessService;
