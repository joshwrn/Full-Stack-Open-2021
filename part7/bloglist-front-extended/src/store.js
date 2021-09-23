import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { loginReducer } from './reducers/loginReducer';
import { blogReducer } from './reducers/blogReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
