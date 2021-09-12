import React from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const Blog = ({ blog, user }) => {
  const handleLike = () => {
    blogService.update(blog.id);
  };
  const handleDelete = () => {
    const userObject = { user: user.id };
    blogService.remove(blog.id, userObject);
  };
  return (
    <div>
      {blog.title} - {blog.author}
      <Togglable buttonLabel="View Details">
        <p className="url">Url: {blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleDelete}>Delete</button>
      </Togglable>
    </div>
  );
};

export default Blog;
