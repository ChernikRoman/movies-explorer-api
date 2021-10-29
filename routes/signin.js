const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { signin } = require('../controllers/signin');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), signin);

module.exports = router;
