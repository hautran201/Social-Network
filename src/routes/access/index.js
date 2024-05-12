const express = require('express');
const accessController = require('../../controllers/access.controller');
const asyncHandler = require('../../helpers/asyncHandler');

const router = express.Router();

router.post('/accounts/signup', asyncHandler(accessController.singUp));
router.post('/accounts/login', asyncHandler(accessController.login));

module.exports = router;
