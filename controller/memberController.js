const catchAsync = require('../utilities/catchAsync');
const memberModel = require('../model/memberModel');
const appError = require('../utilities/appError');

exports.getAllMember = catchAsync(async (req, res) => {
  const member = await memberModel.find();
  res.status(200).json({
    status: 'Success',
    data: { member },
  });
});

exports.createMember = catchAsync(async (req, res) => {
  const member = await memberModel.create(req.body);
  res.status(200).json({
    status: 'Success',
    data: { member },
  });
});

exports.deleteMember = catchAsync(async (req, res, next) => {
  const member = await memberModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.updateMember = catchAsync(async (req, res, next) => {
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const data = req.body;
  data.nameLastname = data.nameLastname.trim().split(' ').join(' ');
  const checkUsername = number.some((el) => data.nameLastname.includes(el));
  if (checkUsername) return;

  const member = await memberModel.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!member) {
    return next(new appError('No member found with that ID', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: { member },
  });
});

exports.getMember = catchAsync(async (req, res, next) => {
  const member = await memberModel.findById(req.params.id);
  if (!member) {
    return next(new appError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: { member },
  });
});

exports.getBydate = catchAsync(async (req, res, next) => {
  const date = req.query.date * 1;
  const month = req.query.month * 1;
  const year = req.query.year * 1;
  const buyToday = await memberModel.find({
    createDated: {
      $gte: `${year}-${month}-${date}`,
      $lt: `${year}-${month}-${date + 1}`,
    },
    agency: { $ne: 'รับมาก่อนหน้านี้' },
  });
  const countData = buyToday.length;
  res.status(200).json({
    status: 'Success',
    amountData: countData,
    data: { buyToday },
  });
});
