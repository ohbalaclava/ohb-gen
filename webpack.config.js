const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    filename: 'app.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /\/node_modules\//,
      use: 'babel-loader'
    }]
  },
  devServer: {
    contentBase: './dist',
    port: 9000,
    open: true
  },
  plugins: [new HtmlWebpackPlugin()]
}
