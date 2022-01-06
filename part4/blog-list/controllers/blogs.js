const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const User = require('../models/User');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch(error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    if (!blog.title && !blog.url) {
      return response.status(400).end();
    }
    
    const newBlog = new Blog({
      ...blog,
      user: user._id
    });

    const savedBlog = await newBlog.save();

    user.blogs = user.blogs.concat(savedBlog);
    await user.save();

    response.status(201).json(savedBlog);
  } catch(error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogId = request.params.id;
    await Blog.findByIdAndDelete(blogId);
    response.status(204).end();
  } catch(error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blogId = request.params.id;
    const blog = request.body;
   
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true });
    response.json(updatedBlog);
  } catch(error) {
    next(error);
  }
});

module.exports = blogsRouter;