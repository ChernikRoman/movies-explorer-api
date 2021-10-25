const bcrypt = require('bcrypt');
const User = require('../models/user');

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((data) => {
          res.send({ name: data.name, email: data.email });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => console.log(err));
}

function getMyUserData(req, res, next) {
  console.log(req, res);
  const { userId } = req.cookies;
  User.findById(userId);
  next();
}

function patchMyUserData(req, res, next) {
  console.log(req, res);
  next();
}

module.exports = {
  createUser,
  getMyUserData,
  patchMyUserData,
};
