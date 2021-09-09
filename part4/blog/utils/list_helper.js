const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reduced = blogs.reduce((acc, { likes }) => {
    return acc + likes;
  }, 0);
  return reduced;
};

const favoriteBlog = (blogs) => {
  const sort = blogs.sort((a, b) => b.likes - a.likes);
  return sort[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
