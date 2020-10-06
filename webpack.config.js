const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill','./src/js/app.js'],
    portal: ['@babel/polyfill', './src/js/portal.js'],
    dashboard: ['@babel/polyfill', './src/js/dashboard.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['app'],
      filename: './src/index.html'
      // template: 'js/app.bundle.js',
    }),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   chunks: ['portal'],
    //   filename: 'js/portal.bundle.js'
    // }),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   chunks: ['dashboard'],
    //   filename: 'js/dashboard.bundle.js'
    // })
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