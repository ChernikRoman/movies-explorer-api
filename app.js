const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const auth = require('./middlewares/authorization');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');

const { NODE_ENV, PORT = 3000, DB_LINK } = process.env;

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsHandler);

app.use(require('./routes/signup'));
app.use(require('./routes/signin'));

app.use(auth);

app.use(require('./routes/index'));

app.use(require('./controllers/incorrectEndpoint'));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const handledStatusCodes = '400,401,403,404,409';
  if (!(handledStatusCodes.includes(err.statusCode))) {
    res.status(500).send({ errorName: err.name, errorMessage: err.message });
  } else {
    res.status(err.statusCode).send({ errorName: err.name, errorMessage: err.message });
  }
  next();
});

mongoose.connect(NODE_ENV === 'production' ? DB_LINK : 'mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`Server listen ${PORT} port.`);
});
