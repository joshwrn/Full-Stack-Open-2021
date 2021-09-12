import React, { useState } from 'react';

const BlogForm = ({
  blogService,
  setBlogs,
  blogs,
  setErrorMessage,
  user,
  blogFormRef,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  //# handle blog
  const handleBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.id,
    };
    blogFormRef.current.toggleVisibility();

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      setErrorMessage({ type: 'success', message: 'Blog Posted' });
    });
  };

  return (
    <form onSubmit={handleBlog}>
      <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        placeholder="title"
      />
      <input
        value={author}
        type="text"
        onChange={({ target }) => setAuthor(target.value)}
        placeholder="author"
      />
      <input
        value={url}
        placeholder="url"
        onChange={({ target }) => setUrl(target.value)}
        type="text"
      />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
