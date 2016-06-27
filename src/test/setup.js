'use strict';

import jsdom from 'jsdom';

// Define some html to be our basic document
// JSDOM will consume this and act as if we were in a browser
const DEFAULT_HTML = '<html><body></body></html>';

// Define some variables to make it look like we're a browser
// First, use JSDOM's fake DOM as the document
global.document = jsdom.jsdom(DEFAULT_HTML);

// Set up a mock window
global.window = document.defaultView;

// Allow for things like window.location
global.navigator = window.navigator;

// Make React globally available
import React from 'react';
global.React = React;

// Make chai globally available
import { expect } from 'chai';
global.expect = expect;

// Make Enzyme globally available
import { mount, shallow, render } from 'enzyme';
global.mount = mount;
global.shallow = shallow;
global.render = render;

// Make mockStore available for test
import configureStore from 'redux-mock-store';
global.mockStore = configureStore();
