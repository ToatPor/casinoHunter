const mongoose = require('mongoose');
const validator = require('validator');

const incomerScheme = new mongoose.Schema({
  hunterName: {
    type: String,
    require: [true, 'Should contain information'],
    trim: true,
    enum: ['อ้วน', 'เฟิร์น', 'เบล', 'แม็ก', 'เกซ', 'ท็อป'],
  },
  investment: {
    type: Number,
    validate: {
      validator: function (val) {
        return /^[0-9]*$/.test(val);
      },
      message: 'Should contain only number',
    },
    require: [true, 'Should contain information'],
  },

  income: {
    type: Number,
    require: [true, 'Should contain information'],
    validate: {
      validator: function (val) {
        return /^[0-9]*$/.test(val);
      },
      message: 'Should contain only number',
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const income = mongoose.model('incomes', incomerScheme);

module.exports = income;
