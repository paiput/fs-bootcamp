const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch(error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
 
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
  
    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });
  
    const result = await newUser.save();
    response.status(201).json(result);
  } catch(error) {
    next(error);
  }
});

module.exports = usersRouter;