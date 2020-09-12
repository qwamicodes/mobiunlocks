const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill','./src/js/app.js'],
    // portal: ['@babel/polyfill', './src/js/portal.js'],
    // dashboard: ['@babel/polyfill', './src/js/dashboard.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[contentHash].bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: 'index.html',
      template: './src/index.html',
    }),
    // new HtmlWebpackPlugin({
    //   chunks: ['portal'],
    //   filename: './public/login.html',
    //   template: './src/login.html',
    // }),
    // new HtmlWebpackPlugin({
    //   chunks: ['dashboard'],
    //   filename: './public/dashboard.html',
    //   template: './src/dashboard.html',
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!assets/**', '!font/**', '!css/**']
    })
  ],
  module: {
    rules : [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use : {
          loader: 'babel-loader'
        }
      }
    ]
  }
};