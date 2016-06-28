var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // depending on the mode we're running select the appropriate sourcemap
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : '',
  // define application entry point
  entry: {
    main: __dirname + "/src/main/index.js"
  },
  // define where to output the compiled sources
  output: {
    path: __dirname + "/target", filename: "index.js"
  },
  module: {
    preLoaders: [
      // enable ESLint for all .js sources
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders: [
      // transpile all .js files from es6 to es5
      { test: /\.js$/, exclude: /node_modules/, loader: 'react-hot!babel-loader' }
    ]
  },
  plugins: [
    // make sure the NODE_ENV variable is passed on so that components
    // are build in the same mode as the webpack is running (e.g. development, production)
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // this plugin creates the final index.html based on a template
    new HtmlWebpackPlugin({ template: 'src/main/index.html' })
  ]
}
