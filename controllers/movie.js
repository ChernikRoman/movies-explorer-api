const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

function getMovies(req, res, next) {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    owner: req.userId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Invalid data: ${Object.keys(err.errors)}`));
      } else {
        res.send(err);
      }
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Not found movie');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.userId) {
        Movie.remove(req.params.movieId)
          .then((data) => res.send(data))
          .catch((err) => {
            next(err);
          });
      } else {
        next(new ForbiddenError('Forbidden access'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid movieId'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
