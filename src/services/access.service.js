'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const accountModel = require('../models/account.model');
const { RoleAccount } = require('../constant');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError } = require('../core/error.response');

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
    };
}

module.exports = AccessService;
