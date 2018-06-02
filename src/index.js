const express = require('express');
const logger = require('./utils/logger');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/index'));

// Handle 404
app.use((req, res, next) => {
  res.status(404).send({
    errorMessage: 'Not found',
  });
});

// Handle errors
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).send({
    errorMessage: err.message,
  });
});

const server = app.listen(config.port, () => {
  const port = server.address().port;
  logger.log(`Listening on port ${port}`);
});