const passwordHashing = require('../utils/passwordHashing');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');

async function signup(req, res, next) {
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
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Email is already in use'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  signup,
};
