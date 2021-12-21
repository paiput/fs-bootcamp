const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.name || !body.username) {
    return response.status(400).json({ error: 'content missing' });
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
});

module.exports = usersRouter;