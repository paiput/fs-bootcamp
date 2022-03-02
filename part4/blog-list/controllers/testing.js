const testingRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

testingRouter.post('/reset', async (request, response, next) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  return response.status(204).end();
});

module.exports = testingRouter;