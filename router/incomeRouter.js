const express = require('express');
const controller = require('../controller/incomeController');
const router = express.Router();

router
  .route('/')
  .post(controller.investmentIncome)
  .get(controller.getAllInvestmentIncome);
router.route('/getTotalSummary/:year').get(controller.getTotalSummary);
router
  .route('/getTotalSummaryByDateEachHunter')
  .get(controller.getTotalAmountbyDate);
router.route('/getTotalSummaryByDate').get(controller.getTotalSummaryDate);
router.route('/gameForHunter').get(controller.gameForHunter);

module.exports = router;
