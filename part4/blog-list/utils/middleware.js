const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error('Error name:', error.name);
  logger.error('Error message:', error.message);
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else {
    return response.status(500).end();
  }
};

module.exports = {
  requestLogger,
  errorHandler
};