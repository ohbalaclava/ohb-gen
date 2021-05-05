const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 9000,
    open: true
  },
  plugins: [new HtmlWebpackPlugin()]
}
