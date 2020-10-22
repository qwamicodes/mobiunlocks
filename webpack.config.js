const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill','./src/js/app.js'],
    // api: ['@babel/polyfill','./src/js/api.js'],
},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[contentHash].bundle.js'
  },
  devServer: {
    contentBase: './dist',
    disableHostCheck: true,
    host: '127.0.0.1',
    port: '1234',
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
      chunks: ['dashboard'],
      filename: './public/dashboard.html',
      template: './src/dashboard.html',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!assets/**', '!fonts/**', '!css/**']
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