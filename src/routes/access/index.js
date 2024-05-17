const express = require('express');
const accessController = require('../../controllers/access.controller');
const asyncHandler = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

router.post('/accounts/signup', asyncHandler(accessController.singUp));
router.post('/accounts/login', asyncHandler(accessController.login));

// authentication ///
router.use(authentication);

router.post('/accounts/logout', asyncHandler(accessController.logout));
router.post(
    '/accounts/handlerRefreshToken',
    asyncHandler(accessController.handlerRefreshToken),
);
module.exports = router;
