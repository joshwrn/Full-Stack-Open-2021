const Blog = require('../models/blog');
const User = require('../models/user');

const blogRouter = require('express').Router();

blogRouter.get('/', (req, response) => {
  Blog.find({})
    .populate('user', { username: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogRouter.post('/', async (req, res) => {
  if (!req.body.likes) {
    req.body.likes = 0;
  }

  const user = await User.findById(req.body.user);

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
});

blogRouter.post('/:id/delete', async (req, res) => {
  const remove = await Blog.findByIdAndRemove(req.params.id);
  res.status(204).json(remove);
});

blogRouter.post('/:id/like', async function (req, res, next) {
  const before = await Blog.findOne({ id: req.params.id }).exec();
  let blog = await Blog.findOneAndUpdate({ id: req.params.id }, { likes: before.likes + 1 });
  res.status(204).json(blog);
});

module.exports = blogRouter;
