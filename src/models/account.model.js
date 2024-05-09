'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Account';
const COLECTION_NAME = 'Accounts';

const acountSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 50,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        friends: {
            type: [Schema.Types.ObjectId],
            default: [],
        },
        avatar: {
            type: String,
            default: '',
        },
        coverImage: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
        verify: {
            type: Schema.Types.Boolean,
            default: false,
        },
        roles: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        collection: COLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, acountSchema);
