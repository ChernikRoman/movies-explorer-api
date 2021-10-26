/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const auth = require('./middlewares/authorization');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/signout', require('./routes/signout'));
app.use('/users', auth, require('./routes/user'));
app.use('/movies', auth, require('./routes/movie'));

app.use((err, req, res, next) => {
  res.send(err.message);
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`Server listen ${PORT} port.`);
});
