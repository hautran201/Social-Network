const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../middlewares/asyncHandler');

const router = express.Router();

router.post('/account/signup', asyncHandler(accessController.singUp));

module.exports = router;
