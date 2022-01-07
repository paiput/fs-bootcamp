const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

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
    const user = request.user;

    if (!blog.title && !blog.url) {
      return response.status(400).json({ error: 'need at least title or url' });
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
    const blogToDelete = await Blog.findById(blogId);
    const user = request.user;

    if (blogToDelete.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'only the user who created the blog can delete it' });
    }

    await Blog.findByIdAndDelete(blogId);
    return response.status(204).end();
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