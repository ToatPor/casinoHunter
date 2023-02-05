const express = require('express');
const mistakeController = require('../controller/mistakeController');
const router = express.Router();

router.route('/').post(mistakeController.addMistake);

module.exports = router;
