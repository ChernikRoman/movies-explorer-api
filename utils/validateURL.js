/* eslint-disable consistent-return */
const validator = require('validator');
const BadRequestError = require('../errors/badRequestError');

function validateURL(link) {
  if (!validator.isURL(link)) {
    return new BadRequestError('Invalid URL');
  }

  return link;
}

module.exports = validateURL;
