const mongoose = require('mongoose');
const validator = require('mongoose-validators');

const mistakeSchema = new mongoose.Schema({
  hunterName: {
    type: String,
    validate: [validator.isAlpha, 'Please fill only letter'],
    enum: { values: ['max', 'grace', 'bell', 'fat', 'fern'] },
    require: true,
    trim: true,
  },
  valueMistake: {
    type: Number,
    validate: [validator.isNumeric, 'Please fill only number'],
    require: true,
  },
  describe: {
    type: String,
    validate: [validator.isAlpha, 'Please fill only letter'],
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

const MistakeModel = mongoose.model('mistakes', mistakeSchema);

module.exports = MistakeModel;
