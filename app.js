/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const auth = require('./middlewares/authorization');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsHandler);

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/signout', require('./routes/signout'));
app.use('/users', auth, require('./routes/user'));
app.use('/movies', auth, require('./routes/movie'));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const handledStatusCodes = '400,401,403,404,';
  if (!(handledStatusCodes.includes(err.statusCode))) err.statusCode = 500;
  res.status(err.statusCode).send({ errorName: err.name, errorMessage: err.message });
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`Server listen ${PORT} port.`);
});
