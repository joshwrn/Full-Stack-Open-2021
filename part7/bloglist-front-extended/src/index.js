import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import login from './services/login';
import blogs from './services/blogs';
import store from './store';
import { initializeItems } from './reducers/blogReducer';
blogs.getAll().then((a) => store.dispatch(initializeItems()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
