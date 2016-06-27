import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import App from './components/app';
import { reducer as title } from './state/title';

// Define root reducer
const reducer = combineReducers({
  title
});

// Define used middleware (e.g. thunk, promise..)
let middleware = applyMiddleware();
if (window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

// Create Redux store
const store = createStore(
  // root reducer to use
  reducer,
  // initial application state
  { title: 'Hello, world!' },
  // middleware
  middleware);

// Render the application's root component to DOM element
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
