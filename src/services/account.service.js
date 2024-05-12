'use strict';

const accountModel = require('../models/account.model');

const findByEmail = async ({
    email,
    select = {
        name: 1,
        password: 1,
        email: 1,
        status: 1,
        avatar: 1,
        roles: 1,
    },
}) => {
    return await accountModel.findOne({ email }).select(select).lean();
};

module.exports = {
    findByEmail,
};
