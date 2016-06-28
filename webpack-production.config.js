const webpack = require('webpack');
const Config = require('webpack-config').Config;

module.exports = new Config().extend('./webpack.config.js').merge({
  plugins: [
    // make sure the NODE_ENV variable is passed on so that components
    // are build in the same mode as the webpack is running (e.g. development, production)
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // Include standard plugins for production build minification
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
});
