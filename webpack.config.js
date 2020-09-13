const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill','./src/js/app.js'],
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