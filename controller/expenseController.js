const { json } = require('stream/consumers');
const Expense = require('../model/expenseModel');
const appError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

exports.createExpense = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(appError('Please fill information', 400));
  }
  const expense = await Expense.create(req.body);

  res.status(200).json({
    Status: 'Success',
    data: { expense },
  });
});
