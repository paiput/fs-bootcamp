const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

const getRandomUser = async () => {
  const users = await User.find({});
  return users[Math.floor(Math.random() * users.length)];
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = request.body;

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title && !blog.url) {
    return response.status(400).end();
  }

  const randomUser = await getRandomUser();
  
  const newBlog = new Blog({
    ...blog,
    user: randomUser
  });

  const savedBlog = await newBlog.save();

  randomUser.blogs = randomUser.blogs.concat(savedBlog);
  await randomUser.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id;

  await Blog.findByIdAndDelete(blogId);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id;
  const blog = request.body;
   
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;