const passwordHashing = require('../utils/passwordHashing');
const User = require('../models/user');

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
    .catch((err) => {
      res.send(err);
    });
}

function getMyUserData(req, res, next) {
  User.findById(req.userId)
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => next(err));
}

async function patchMyUserData(req, res, next) {
  const { name, email } = req.body;
  let { password } = req.body;

  if (password) {
    password = await passwordHashing(req.body.password);
  }
  User.findByIdAndUpdate(req.userId, { name, email, password }, { new: true, runValidators: true }).select('+password')
    .orFail(() => { throw new Error('Не найден'); })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
}

module.exports = {
  createUser,
  getMyUserData,
  patchMyUserData,
};
