const mongoose = require('mongoose');
const validator = require('validator');

const incomerScheme = new mongoose.Schema({
  hunterName: {
    type: String,
    require: true,
    trim: true,
    enum: ['อ้วน', 'เฟิร์น', 'เบล', 'แม็ก', 'เกซ'],
  },
  investment: {
    type: Number,
    require: true,
    validatte: [
      validator.isNumeric,
      'input is not valid please fill number only',
    ],
    require: true,
  },

  income: {
    type: Number,
    require: true,
    validatte: [
      validator.isNumeric,
      'input is not valid please fill number only',
    ],
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const income = mongoose.model('incomes', incomerScheme);

module.exports = income;
