const mongoose = require('mongoose');
const validator = require('validator');

const mistakeSchema = new mongoose.Schema({
  valueMistake: {
    type: Number,
    require: true,
  },
  describe: {
    type: String,
    validate: {
      validator: function (val) {
        return validator.isAlpha(val, ['th-TH']);
      },
    },
    message: 'Should contain only letter',
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

const MistakeModel = mongoose.model('mistakes', mistakeSchema);

module.exports = MistakeModel;
