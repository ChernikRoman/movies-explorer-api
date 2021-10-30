const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: (value) => validator.isEmail(value),
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
