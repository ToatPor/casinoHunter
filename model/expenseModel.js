const mongoose = require('mongoose');
const { type } = require('os');
const validotor = require('validator');

const expenseSchema = new mongoose.Schema({
  expense: {
    type: Number,
    require: true,
    validate: {
      validator: function (val) {
        return /^[0-9]*$/.test(val);
      },
      message: 'Should contain only number',
    },
  },

  categories: {
    type: String,
    enum: ['account', 'salary', 'utilities', 'rent', 'program', 'unlucky'],
    require: true,
  },
});

const Expense = mongoose.model('expenses', expenseSchema);

module.exports = Expense;
