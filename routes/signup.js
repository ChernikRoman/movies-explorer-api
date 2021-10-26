const route = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/user');

route.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = route;
