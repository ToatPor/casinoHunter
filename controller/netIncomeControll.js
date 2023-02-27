const catchAsync = require('../utilities/catchAsync');
const appError = require('../utilities/appError');
const Expense = require('../model/expenseModel');
const Income = require('../model/incomeModel');

exports.getBalance = catchAsync(async (req, res, next) => {
  const year = req.query.year * 1;
  const month = req.query.month * 1;
  const getExpense = await Expense.aggregate([
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

  const income = await Income.aggregate([
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
        totalInvestment: { $sum: '$investment' },
        totalIncome: { $sum: '$income' },
      },
    },
    {
      $project: {
        month: '$_id',
        netIncome: { $subtract: ['$totalIncome', '$totalInvestment'] },
        _id: 0,
      },
    },
  ]);

  const [netincome] = income;
  const [expense] = getExpense;

  res.status(200).json({
    Status: 'Success',
    data: {
      month: netincome.month,
      income: netincome.netIncome,
      expense: expense.totalExpense,
      netIncome: netincome.netIncome - expense.totalExpense,
    },
  });
});
