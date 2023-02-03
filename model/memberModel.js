const { triggerAsyncId } = require('async_hooks');
const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema({
  nameLastname: {
    type: String,
    require: [true, 'ชื่อ นามสกุล สามารถเว้นช่องว่างได้แค่อันเดียว'],
    validate: function (val) {
      return /^[u0E00-\u0E7Fa-zA-Z]+(\s[u0E00-\u0E7Fa-zA-Z]+)$/.test(val);
    },
    minLength: [5, 'ชื่อ และ นามสกุลต้องมีความยาวอย่างน้อย 5 ตัวอักษร'],
    maxLength: [40, 'ชื่อ และ นามสกุลต้องมีความยาวน้อยกว่า 40 ตัวอักษร'],
    unique: true,
  },
  createDated: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    // require: true,
    enum: {
      values: ['ใช้งานแล้ว', 'โดนดึงรอเคลม', 'พร้อมใช้งาน'],
    },
    trim: true,
  },
  agency: {
    type: String,
    default: 'รับมาก่อนหน้านี้',
    enum: {
      values: [
        'แอปเปิ้ล',
        'เหน๋อ',
        'kkk',
        'น้องทราย',
        'รับมาก่อนหน้านี้',
        'ปู',
      ],
    },
    trim: true,
    require: true,
  },
});

const member = mongoose.model('members', Schema);

module.exports = member;
