const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next('no auth');
  } else {
    try {
      const token = req.cookies.jwt;
      const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');
      req.userId = payload;
      next();
    } catch (err) {
      next(err);
    }
  }
};
