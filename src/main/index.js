import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';

import App from './components/app';
import { reducer as title } from './state/title';

// define root reducer
const reducer = combineReducers({
  title
});

const store = createStore(
  // root reducer to use
  reducer,
  // initial application state
  { title: 'Hello, world!' },
  // middleware
  compose(window.devToolsExtension && window.devToolsExtension()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
