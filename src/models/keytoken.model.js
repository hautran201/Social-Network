'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Key';
const COLECTION_NAME = 'Keys';

const keyTokenSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
            ref: 'Account',
        },
        privateKey: {
            type: String,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshTokensUsed: {
            type: Array,
            default: [],
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
