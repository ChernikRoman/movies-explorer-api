const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

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
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Not found movie');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.userId) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movie) => res.send(movie))
          .catch((err) => {
            next(err);
          });
      } else {
        next(new ForbiddenError('Forbidden access'));
      }
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
