const webpack = require('webpack');
const Config = require('webpack-config').Config;

const config = new Config().extend('./webpack.config.js').merge({
  // select the appropriate sourcemap for production
  devtool: null,
  // enable loaders that are specific to tests
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  // define externals that are otherwise available
  externals: {
    'react/addons': true,
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'mocha': true
  }
});

// override entry point to run tests automatically
config.entry = 'mocha!./src/test/setup-browser.js';

// strip react-hot loader
config.module.loaders[0].loader = config.module.loaders[0].loader.replace('react-hot!', '');

// export the final configuration
module.exports = config;
