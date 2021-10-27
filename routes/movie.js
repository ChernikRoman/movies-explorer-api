const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const validateURL = require('../utils/validateURL');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailer: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.string(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  body: Joi.object().keys({
    param: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }),
}), deleteMovie);

module.exports = router;
