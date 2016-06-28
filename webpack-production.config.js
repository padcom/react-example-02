const webpack = require('webpack');
const Config = require('webpack-config').Config;

const config = new Config().extend('./webpack.config.js').merge({
  // select the appropriate sourcemap for production
  devtool: null,
  // configure additional plugins for productin build
  plugins: [
    // make sure the NODE_ENV variable is passed on
    // so that components are build in the proper mode
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': '"production"' }
    }),
    // include standard plugins for production build minification
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
});

// strip react-hot loader
config.module.loaders[0].loader = config.module.loaders[0].loader.replace('react-hot!', '');

// export the final configuration
module.exports = config;
