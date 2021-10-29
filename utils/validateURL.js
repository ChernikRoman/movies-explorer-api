const validator = require('validator');
const BadRequestError = require('../errors/badRequestError');

function validateURL(link) {
  if (!validator.isURL(link)) {
    throw new BadRequestError('Invalid URLssss');
  } else {
    return link;
  }
}

module.exports = validateURL;
