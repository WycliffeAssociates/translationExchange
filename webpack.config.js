/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules\/react-mic-plus/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|svg)$/, loader: 'url-loader' },
      { test: /\.(css|js)$/, loader: 'url-loader' }
    ],
  },
};
