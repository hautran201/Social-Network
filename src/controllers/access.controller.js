'use strict';

const AccessService = require('../services/access.service');
const { CREATED, SuccessReponse } = require('../core/success.response');
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
        new SuccessReponse({
            metadata: await AccessService.login(req.body),
        }).send(res);
    };

    logout = async (req, res, next) => {
        new SuccessReponse({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore),
        }).send(res);
    };
}

module.exports = new AccessController();
