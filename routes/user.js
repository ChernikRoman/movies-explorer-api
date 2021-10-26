const route = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyUserData, patchMyUserData } = require('../controllers/user');

route.get('/me', getMyUserData);
route.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
}), patchMyUserData);

module.exports = route;
