const AppError = require('../utilities/appError');

const sendError = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error: error,
    stack: error.stack,
  });
};

const sendProduction = (er, res) => {
  if (er.isOperational) {
    res.status(er.statusCode).json({
      status: er.status,
      message: er.message,
    });
  } else {
    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
    });
  }
};

const duplicateUser = (er) => {
  return new AppError(
    `มีชื่อ และ นามสกุลนี้อยู่ในระบบอยู่แล้ว ไม่สามารถเพิ่มรายการได้ ${er.keyValue.nameLastname}`,
    400
  );
};

const memberNotExist = (er) => {
  return new AppError('ไม่มีชื่อยู่ในระบบ กรุณาตรวจสอบ', 400);
};

const validationFail = (er) => {
  const error = Object.values(er.errors).map((val) => val.message);
  const errorMessage = `${error.join('. ')} `;
  return new AppError(errorMessage, 400);
};
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'Error';

  if (process.env.node_env === 'development') sendError(error, res);
  else if (process.env.node_env === 'production') {
    const err = Object.assign(error);
    if (err.code === 11000) error = duplicateUser(err);
    if (err.name === 'CastError') error = memberNotExist(err);
    if (err.name === 'ValidationError') error = validationFail(err);
    sendProduction(error, res);
  }
};
