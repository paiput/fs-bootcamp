const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { user: 0 });
    response.json(users);
  } catch(error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
      return response.status(400).json({ error: 'User already exists' });
    }
 
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