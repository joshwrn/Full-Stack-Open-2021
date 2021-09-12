const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const blogRouter = require('express').Router();

//+ get
blogRouter.get('/', (req, response) => {
  Blog.find({})
    .populate('user', { username: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

//$ Post new
blogRouter.post('/', async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (!req.body.likes) {
    req.body.likes = 0;
  }

  const currentUser = await User.findById(req.body.user);

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: currentUser._id,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
});

//! delete
blogRouter.post('/:id/delete', async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const userId = req.body.user;
  const find = await Blog.findById(req.params.id);
  console.log(req.body);
  if (find.user.toString() !== userId) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const remove = await Blog.findByIdAndRemove(req.params.id);
  res.status(204).json(remove);
});

//# update
blogRouter.post('/:id/like', async function (req, res, next) {
  const before = await Blog.findOne({ _id: req.params.id }).exec();
  let blog = await Blog.findOneAndUpdate(
    { _id: req.params.id },
    { likes: before.likes + 1 }
  );
  res.status(204).json(blog);
});

module.exports = blogRouter;
