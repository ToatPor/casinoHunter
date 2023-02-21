const Income = require('../model/incomeModel');
const appError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

exports.investmentIncome = catchAsync(async (req, res, next) => {
  const subMitInvestIncome = await Income.create(req.body);
  res.status(200).json({
    status: 'Success',
    data: { subMitInvestIncome },
  });
});

exports.deleteInvestmentIncome = catchAsync(async (req, res, next) => {
  const deleteInvestment = await Income.findByIdAndDelete(req.params);
  if (!deleteInvestment) {
    return next(new appError('Please check id', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: null,
  });
});

exports.getAllInvestmentIncome = catchAsync(async (req, res, next) => {
  const investmentIncome = await Income.find();
  res.status(200).json({
    status: 'Success',
    data: { investmentIncome },
  });
});

exports.getTotalSummary = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const totalIncome = await Income.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
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
        _id: 0,
        month: '$_id',
        totalInvestment: { $sum: '$totalInvestment' },
        totalIncome: { $sum: '$totalIncome' },
        totalRevenue: { $subtract: ['$totalIncome', '$totalInvestment'] },
      },
    },
  ]);

  res.status(200).json({
    status: 'Success',
    data: {
      totalIncome,
    },
  });
});

//each day each hunter by date
exports.getTotalAmountbyDate = catchAsync(async (req, res, next) => {
  const year = req.query.year * 1;
  const month = req.query.month * 1;
  const date = req.query.date * 1;

  const totalRevenueByDate = await Income.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-${month}-${date}`),
          $lt: new Date(`${year}-${month}-${date + 1}`),
        },
      },
    },
    {
      $project: {
        _id: 0,
        hunterName: '$hunterName',
        investment: '$investment',
        income: '$income',
        totalRevenue: { $subtract: ['$income', '$investment'] },
      },
    },
  ]);

  res.status(200).json({
    test: totalRevenueByDate,
  });
});

//get summary by date
exports.getTotalSummaryDate = catchAsync(async (req, res, next) => {
  const year = req.query.year * 1;
  const month = req.query.month * 1;
  const date = req.query.date * 1;
  const totalIncome = await Income.aggregate([
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
        totalInvestment: { $sum: '$investment' },
        totalIncome: { $sum: '$income' },
      },
    },
    {
      $project: {
        _id: 0,
        // date: { $dayOfMonth: '$_id' },
        today: '$_id',
        totalInvestment: { $sum: '$totalInvestment' },
        totalIncome: { $sum: '$totalIncome' },
        totalRevenue: { $subtract: ['$totalIncome', '$totalInvestment'] },
      },
    },
  ]);

  res.status(200).json({
    status: 'Success',
    data: {
      totalIncome,
    },
  });
});

exports.gameForHunter = catchAsync(async (req, res, next) => {
  const year = req.query.year * 1;
  const month = req.query.month * 1;
  const hunterIncome = await Income.aggregate([
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
        _id: '$hunterName',
        totalInvestment: { $sum: '$investment' },
        totalIncome: { $sum: '$income' },
      },
    },
    {
      $project: {
        _id: 0,
        hunterNaem: '$_id',
        investment: '$totalInvestment',
        income: '$totalIncome',
        netIncome: { $subtract: ['$totalIncome', '$totalInvestment'] },
      },
    },
    {
      $sort: { netIncome: -1 },
    },
  ]);

  res.status(200).json({
    data: { hunterIncome },
  });
});

exports.updateIncome = catchAsync(async (req, res, next) => {
  const incomeUpdate = await Income.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!incomeUpdate) {
    return new appError("can't find id please check", 404);
  }

  res.status(200).json({
    status: 'Success',
    data: { incomeUpdate },
  });
});

exports.getByHunter = catchAsync(async (req, res, next) => {
  const { hunter } = req.params;
  const data = await Income.find({ hunterName: hunter });
  const changeData = JSON.parse(JSON.stringify(data));

  changeData.forEach(
    (el, i) =>
      (el.incomeHunter = el.income !== 0 ? el.income - el.investment : 0)
  );

  res.status(200).json({
    status: 'Success',
    hunerData: { changeData },
  });
});
