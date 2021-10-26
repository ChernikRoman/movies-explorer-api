const route = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/login');

route.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
}), login);

module.exports = route;
