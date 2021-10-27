const passwordHashing = require('../utils/passwordHashing');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

async function createUser(req, res, next) {
  const { name, email, password } = req.body;

  const hash = await passwordHashing(password);

  User.create({
    name,
    email,
    password: hash,
  })
    .then((data) => {
      res.send({ name: data.name, email: data.email });
    })
    .catch(next);
}

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
    .catch(next);
}

module.exports = {
  createUser,
  getMyUserData,
  patchMyUserData,
};
