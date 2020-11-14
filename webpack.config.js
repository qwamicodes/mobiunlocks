const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/js/app.js'],
    dashboard: ['@babel/polyfill', './src/js/dashboard.js'],
    tracking: ['@babel/polyfill', './src/js/tracking.js'],
    login: ['@babel/polyfill', './src/js/login.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[contentHash].bundle.js'
  },
  devServer: {
    contentBase: './dist',
    disableHostCheck: true,
    host: '127.0.0.1',
    port: '5000',
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['tracking'],
      filename: './public/tracking.html',
      template: './src/tracking.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['login'],
      filename: './public/login.html',
      template: './src/login.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['dashboard'],
      filename: './public/dashboard.html',
      template: './src/dashboard.html',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!assets/**', '!fonts/**', '!css/**']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
};