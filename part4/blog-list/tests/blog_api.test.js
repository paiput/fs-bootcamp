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

afterAll(() => {
  mongoose.connection.close();
});