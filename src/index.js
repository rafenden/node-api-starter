const express = require('express');
const logger = require('./utils/logger');
const { HttpError, ResourceNotFound } = require('./utils/errors');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/index'));

// Handle 404
app.use((req, res, next) => {
  next(new ResourceNotFound('Route not found'));
});

// Handle errors
app.use((err, req, res, next) => {
  const error = HttpError.fromObject(err);
  logger.error(error);
  return res.status(error.status).send(error.expose());
});

const server = app.listen(config.port, () => {
  const port = server.address().port;
  logger.log(`Listening on port ${port}`);
});