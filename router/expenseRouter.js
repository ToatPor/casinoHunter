const express = require('express');
const expenseController = require('../controller/expenseController');
const Router = express.Router();

Router.route('/Allexpense').get(expenseController.getAllexpense);
Router.route('/buyAccount').get(expenseController.getExpenseAccount);
Router.route('/unlucky').get(expenseController.getUnlucky);
Router.route('/')
  .post(expenseController.createExpense)
  .get(expenseController.getBYdateExpense);
module.exports = Router;
