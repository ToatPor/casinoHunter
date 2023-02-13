const mongoose = require('mongoose');
const validator = require('validator');

const incomerScheme = new mongoose.Schema({
  hunterName: {
    type: String,
    require: true,
    trim: true,
    enum: ['อ้วน', 'เฟิร์น', 'เบล', 'แม็ก', 'เกซ', 'ท็อป'],
  },
  investment: {
    type: Number,
    require: true,
  },

  income: {
    type: Number,
    require: true,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const income = mongoose.model('incomes', incomerScheme);

module.exports = income;
