/* eslint-disable no-console */

// Express Module
const express = require('express');
const cors = require('cors');
const { NOT_FOUND } = require('http-status');
const { config } = require('./config');
const { error } = require('./middlewares');
const routes = require('./routes');
const { ApiError } = require('./utils');

// Creating instanse of express with that we can access all http methods
const app = express();

// Middleware to parse json request body
app.use(express.json());

// Middleware to parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Middleware to enable cors
app.use(cors());

app.options('*', cors());

// Api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(error.errorConverter);

// handle error
app.use(error.errorHandler);

// PORT
const port = config.port || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
