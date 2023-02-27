const express = require('express');
const { url } = require('inspector');
const memberRouter = require('./router/memberRouter');
const incomeRouter = require('./router/incomeRouter');
const controlError = require('./controller/errorController');
const mistakeRouter = require('./router/mistakeRouter');
const expenseRouter = require('./router/expenseRouter');
const netIncomeRouter = require('./router/netIncomeRouter');

const error = require('./utilities/appError');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/api/netIncome', netIncomeRouter);
app.use('/api/member', memberRouter);
app.use('/api/income', incomeRouter);
app.use('/api/mistake', mistakeRouter);
app.use('/api/expense', expenseRouter);

app.all('*', (req, res, next) => {
  next(
    new error(
      `ไม่สามารถหาข้อมูลจาก ${req.originalUrl} ตรวจสอบ url อีกครั้ง`,
      404
    )
  );
});

app.use(controlError);

module.exports = app;
