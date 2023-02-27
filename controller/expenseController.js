const Expense = require('../model/expenseModel');
const appError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

exports.createExpense = catchAsync(async (req, res, next) => {
  const checBody = Object.keys(req.body);

  if (checBody.length < 2) {
    return next(new appError('Please fill information', 400));
  }
  const expense = await Expense.create(req.body);

  res.status(200).json({
    Status: 'Success',
    data: { expense },
  });
});

exports.getAllexpense = catchAsync(async (req, res, next) => {
  const year = req.query.year * 1;
  const month = req.query.month * 1;

  const checkExpense = await Expense.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lte: new Date(`${year}-${month}-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$date' },
        totalExpense: { $sum: '$expense' },
      },
    },
    { $addFields: { months: '$_id' } },
    { $project: { _id: 0 } },
  ]);
  res.status(200).json({
    status: 'Success',
    data: { checkExpense },
  });
});

exports.getBYdateExpense = catchAsync(async (req, res, next) => {
  const year = req.query.year * 1;
  const month = req.query.month * 1;
  const date = req.query.date * 1;

  const spendPerday = await Expense.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-${date}`),
          $lt: new Date(`${year}-${month}-${date + 1}`),
        },
      },
    },
    {
      $group: {
        _id: Date(`${year}-${month}-${date}`),
        totalExpense: { $sum: '$expense' },
      },
    },
  ]);

  res.status(200).json({
    Status: 'Success',
    data: { spendPerday },
  });
});

exports.getExpenseAccount = catchAsync(async (req, res, next) => {
  const date = req.query.date * 1;
  const month = req.query.month * 1;
  const year = req.query.year * 1;
  const buyAccount = await Expense.find({
    categories: { $eq: 'account' },
    date: {
      $gte: `${year}-${month}-${date}`,
      $lt: `${year}-${month}-${date + 1}`,
    },
  });
  const totalExpesnseAccount = buyAccount.reduce(
    (acc, val) => (acc += val.expense),
    0
  );

  res.status(200).json({
    Status: 'Success',
    buyAccount: totalExpesnseAccount,
  });
});

exports.getUnlucky = catchAsync(async (req, res, next) => {
  const year = req.query.year * 1;
  const month = req.query.month * 1;

  const spendPerday = await Expense.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-1`),
          $lte: new Date(`${year}-${month}-31`),
        },
        categories: 'unlucky',
      },
    },
    {
      $group: {
        _id: { $month: '$date' },
        totalExpense: { $sum: '$expense' },
      },
    },
  ]);

  res.status(200).json({
    Status: 'Success',
    data: { spendPerday },
  });
});
