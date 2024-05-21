'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Posts';
const COLECTION_NAME = 'Posts';

const postsSchema = new Schema(
    {
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
        description: {
            type: String,
            required: true,
        },
        like: {
            type: [Schema.Types.ObjectId],
            ref: 'Account',
            default: [],
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: [],
        },
    },
    {
        timestamps: true,
        collection: COLECTION_NAME,
    },
);

module.exports = model(DOCUMENT_NAME, postsSchema);
