const express = require('express');
const netIncome = require('../controller/netIncomeControll');
const router = express.Router();

router.route('/').get(netIncome.getBalance);

module.exports = router;
