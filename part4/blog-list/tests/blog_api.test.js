const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBogs.length);
});

test('unique identifier property of blog is named id', async () => {
  const response = await api.get('/api/blogs')
  const exampleBlog = response.body[0];
  expect(exampleBlog.id).toBeDefined();
});

test('a valid blog can be created', async () => {
  const newBlog = {
    title: 'Creativity Is a Process, Not an Event',
    author: 'James Clear',
    url: 'https://jamesclear.com/creative-thinking',
    likes: 50
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const updatedBlogs = await helper.getAllBlogs();
  expect(updatedBlogs).toHaveLength(helper.initialBogs.length + 1);

  const updatedBlogsTitles = updatedBlogs.map(blog => blog.title);
  expect(updatedBlogsTitles).toContain('Creativity Is a Process, Not an Event');
});

afterAll(() => {
  mongoose.connection.close();
});