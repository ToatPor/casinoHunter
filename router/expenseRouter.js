const express = require('express');
const expenseController = require('../controller/expenseController');
const Router = express.Router();

Router.route('/').post(expenseController.createExpense);

module.exports = Router;
