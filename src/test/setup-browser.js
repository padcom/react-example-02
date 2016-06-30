'use strict';

// Require all the necessary objects
require('./environment');
require('./setup-browser.less');

// By default mount components into "#root"
const enzyme_mount = global.mount;
global.mount = (component, options) => enzyme_mount(component, { attachTo: document.getElementById('root'), ...options })

// Require all tests
var context = require.context('.', true, /.+\.test\.js?$/);
context.keys().forEach(context);
module.exports = context;
