const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema({
  country: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  year: { type: String, required: true },
  description: { type: String, rquired: true },
  image: { type: String, validate: (value) => validator.isURL(value), required: true },
  trailer: { type: String, validate: (value) => validator.isURL(value), required: true },
  thumbnail: { type: String, validate: (value) => validator.isURL(value), required: true },
  owner: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
  movieId: { type: String, required: true },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
});

module.exports = mongoose.model('movie', movieSchema);
