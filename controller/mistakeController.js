const catchAsync = require('../utilities/catchAsync');
const mistakeModel = require('../model/mistakeModel');

exports.addMistake = catchAsync(async (req, res, next) => {
  const createMistake = await mistakeModel.create(req.body);
  res.status(200).json({
    status: 'Succress',
    data: { createMistake },
  });
});
