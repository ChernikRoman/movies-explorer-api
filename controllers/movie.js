const Movie = require('../models/movie');

function getMovies(req, res, next) {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
}

function postMovie(req, res, next) {
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
    .then((movie) => res.status(200).send(movie))
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new Error('Not found movie');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.userId) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movie) => res.send(movie))
          .catch((err) => {
            next(err);
          });
      } else {
        next({ message: 'net prav' });
      }
    })
    .catch(next);
}

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
