'use strict';

const AccessService = require('../services/access.service');
const { CREATED } = require('../core/success.response');
class AccessController {
    singUp = async (req, res, next) => {
        console.log('***::P::signup::', req.body);

        new CREATED({
            message: 'Register success',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };

    login = async (req, res, next) => {
        new CREATED({ metadata: await AccessService.login(req.body) }).send(
            res,
        );
    };
}

module.exports = new AccessController();
