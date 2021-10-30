const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnauthorizedError('Authorized required'));
  } else {
    try {
      const token = req.cookies.jwt;
      const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');
      req.userId = payload._id;
      next();
    } catch (err) {
      next(err);
    }
  }
};
