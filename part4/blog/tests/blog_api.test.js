const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

// beforeEach(async (done) => {});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBeGreaterThan(1);
});

test('makes sure blog gets posted', async (done) => {
  const newPost = {
    title: 'new',
    author: 'author',
    url: 'url',
    likes: 5,
  };
  try {
    const firstCount = await api.get('/api/blogs');
    const total = firstCount.body.length;
    const response = await api.post('/api/blogs').send(newPost);
    const secondCount = await api.get('/api/blogs');
    const second = secondCount.body.length;
    const done = total + 1;
    expect(second).toBe(done);
  } catch (err) {
    console.log(err);
  }
});

test('make sure blog has id property', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('check if likes default to zero', async () => {
  const newPost = {
    title: 'like test',
    author: 'author',
    url: 'url',
  };
  try {
    const post = await api.post('/api/blogs').send(newPost);
    expect(post.body.likes).toBe(0);
  } catch (err) {
    console.log(err);
  }
});

test('check if 404 response if title not included', async () => {
  const newPost = {
    url: 'hi',
  };

  const post = await api.post('/api/blogs').send(newPost);
  console.log(post);
  expect(post.body).toThrow(
    'ValidationError: Blog validation failed: url: Path `url` is required., title: Path `title` is required.'
  );
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
