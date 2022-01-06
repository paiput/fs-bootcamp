const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

loginRouter.post('/', async (request, response, next) => {
  const body = request.body;
  
  const user = await User.findOne({ username: body.username });

  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordIsCorrect)) {
    return response.status(401).json({ error: 'invalid user or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.json({ token, usrname: user.username, name: user.name });
});

module.exports = loginRouter;