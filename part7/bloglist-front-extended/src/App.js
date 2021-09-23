import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './components/Blog';
import blogService from './services/blogs';
import './style.css';
import loginService from './services/login';
import Notifications from './components/Notifications';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const blogFormRef = useRef();
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    if (blogs.type !== 'INIT_ITEMS') return;

    setSorted(blogs.data.sort((a, b) => b.likes - a.likes));
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    if (errorMessage === '') return;

    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  //$ Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const logUser = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(logUser));
      blogService.setToken(logUser.token);
      setUser(logUser);
      setUsername('');
      setPassword('');
      setErrorMessage({ type: 'success', message: 'you are logged in' });
    } catch (exception) {
      console.log(exception);
      setErrorMessage({ type: 'error', message: 'Wrong credentials' });
    }
  };

  //! logout
  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  return !user ? (
    <>
      <Notifications noti={errorMessage} />
      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </Togglable>
    </>
  ) : (
    <div>
      <Notifications noti={errorMessage} />
      <button onClick={handleLogout}>Logout</button>
      <Togglable ref={blogFormRef} buttonLabel="new blog">
        <BlogForm
          blogFormRef={blogFormRef}
          user={user}
          blogService={blogService}
          blogs={blogs}
          setErrorMessage={setErrorMessage}
        />
      </Togglable>
      <p>{user.name}</p>
      <h2>blogs</h2>
      {sorted?.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} />
      ))}
    </div>
  );
};

export default App;
