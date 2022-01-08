const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');
const User = require('../models/User');

const getUser = async ({ username, password }) => {
  const response = await api
  .post('/api/login')
  .send({ username, password });

  const user = response.body;
  return user;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  // all blogs are created by user johndoe
  const user = await User.findOne({ username: 'johndoe' });

  for (let blog of helper.initialBogs) {
    const newBlog = new Blog({
      ...blog,
      user: user.id
    });
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

test('a valid blog can be created by a user', async () => {
  const user = await getUser({ username: 'johndoe', password: 'johndoe' });

  const newBlog = {
    title: 'Creativity Is a Process, Not an Event',
    author: 'James Clear',
    url: 'https://jamesclear.com/creative-thinking',
    likes: 50
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const updatedBlogs = await helper.getAllBlogs();
  expect(updatedBlogs).toHaveLength(helper.initialBogs.length + 1);

  const updatedBlogsTitles = updatedBlogs.map(blog => blog.title);
  expect(updatedBlogsTitles).toContain('Creativity Is a Process, Not an Event');
});

test('likes default value of new blog is set to 0', async () => {
  const user = await getUser({ username: 'johndoe', password: 'johndoe' });

  // new blog without likes property
  const newBlog = {
    title: 'How Innovative Ideas Arise',
    author: 'James Clear',
    url: 'https://jamesclear.com/dont-start-from-scratch'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const updatedBlogs = await helper.getAllBlogs();
  expect(updatedBlogs).toHaveLength(helper.initialBogs.length + 1);

  const updatedBlogList = updatedBlogs.map((blog) => {
    return {
      title: blog.title,
      likes: blog.likes
    }
  })
  expect(updatedBlogList).toContainEqual({ title: 'How Innovative Ideas Arise', likes: 0 });
});

test('if title AND url are missing returns status code 400 bad request', async () => {
  const user = await getUser({ username: 'johndoe', password: 'johndoe' });
  
  const newBlog = {
    author: 'James Clear',
    likes: 32
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.token}`)
    .send(newBlog)
    .expect(400)
});

test('a specific blog can be deleted', async () => {
  const user = await getUser({ username: 'johndoe', password: 'johndoe' });

  const response = await api.get('/api/blogs');
  const blog = response.body[0];

  await api
    .delete(`/api/blogs/${blog.id}`)
    .set('Authorization', `bearer ${user.token}`)
    .expect(204);
});

test('a specific blog can be updated', async () => {
  const user = await getUser({ username: 'johndoe', password: 'johndoe' });

  const response = await api.get('/api/blogs');
  const blog = response.body[0];

  const updatedBlog = {
    likes: 999
  };

  await api
    .put(`/api/blogs/${blog.id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send(updatedBlog)
    .expect(200);

  const expectedResult = {
    ...blog,
    likes: updatedBlog.likes
  };
  
  const updatedBlogFromDatabase = await helper.getBlog(blog.id);

  expect(updatedBlogFromDatabase).toMatchObject(expectedResult);
});

test('invalid users are not created', async () => {
  const invalidUsers = [
    {
      username: 'pi',
      name: 'paiput',
      password: '12345'
    },
    {
      username: 'jj',
      name: 'Jimmy',
      password: 'hi'
    }
  ];

  for (const user of invalidUsers) {
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400);
    
    expect(result.body.error).toMatch('User validation failed');
  }
});

test('creating new blog fails if token is not provided', async () => {
  const newBlog = {
    title: 'How Experts Figure Out What to Focus On',
    author: 'James Clear',
    url: 'https://jamesclear.com/getting-simple',
    likes: 13
  };
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
});

afterAll(() => {
  mongoose.connection.close();
});