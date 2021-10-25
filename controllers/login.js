const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

function login(req, res, next) {
  const { email, password } = req.body;

  if (validator.isEmail(email)) {
    User.findOne({ email }).select('+password')
      .orFail(() => res.send('Not found'))
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((matches) => {
            if (matches) {
              const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key', { expiresIn: '7d' });
              res.cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
              });
              res.status(200).send({ _id: user._id, name: user.name, email: user.email });
            }
          })
          .catch((err) => res.send(err));
      })
      .catch((err) => res.send(err));
  } else {
    next((err) => next(err));
  }
}

function logout(req, res) {
  res
    .clearCookie('jwt')
    .status(200)
    .send({ message: 'Выход выполнен' });
}

module.exports = {
  login,
  logout,
};
