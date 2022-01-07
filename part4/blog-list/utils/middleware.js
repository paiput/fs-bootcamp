const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.user = await User.findById(decodedToken.id);
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error('Error name:', error.name);
  logger.error('Error message:', error.message);
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'missing or invalid token' });
  } else {
    return response.status(500).end();
  }
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  errorHandler
};