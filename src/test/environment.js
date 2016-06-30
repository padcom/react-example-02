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
