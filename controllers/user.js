const passwordHashing = require('../utils/passwordHashing');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');

function getMyUserData(req, res, next) {
  User.findById(req.userId)
    .orFail(() => {
      throw new NotFoundError('User not found');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

async function patchMyUserData(req, res, next) {
  const { name, email } = req.body;
  let { password } = req.body;

  if (password) {
    password = await passwordHashing(req.body.password);
  }
  User.findByIdAndUpdate(req.userId, { name, email, password }, { new: true, runValidators: true }).select('+password')
    .orFail(() => { throw new NotFoundError('User not found'); })
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Email is already in use'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getMyUserData,
  patchMyUserData,
};
