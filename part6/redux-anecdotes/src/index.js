import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import anecdoteReducer, { initializeItems } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdoteService';

anecdoteService.getAll().then((a) => store.dispatch(initializeItems(a)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
