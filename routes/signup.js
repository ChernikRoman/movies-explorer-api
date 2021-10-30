const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { signup } = require('../controllers/signup');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), signup);

module.exports = router;
