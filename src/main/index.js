import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// the reducers.js contains exports of all reducers from
// individual state elements to make it easy to import them
// all at once
import * as reducers from './reducers';

// Import main application component
import App from './components/app';

// Define root reducer
const reducer = combineReducers(reducers);

// Define used middleware (e.g. thunk, promise..)
let middleware = applyMiddleware();
if (window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension())
}

// Create Redux store
const store = createStore(
  // root reducer to use
  reducer,
  // middleware
  middleware);

// Render the application's root component to DOM element
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
