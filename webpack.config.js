var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: __dirname + "/src/main/index.js"
  },
  output: {
    path: __dirname + "/target", filename: "index.js"
  },
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'react-hot!babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/main/index.html' })
  ]
}
