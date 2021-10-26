/* eslint-disable consistent-return */
const validator = require('validator');

function checkLink(link) {
  if (validator.isURL(link)) {
    return link;
  }
}

module.exports = checkLink;
