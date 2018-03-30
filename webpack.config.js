const PATH = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './app/app.js',
  output: {
    path: PATH.resolve(__dirname, 'app/dist'),
    filename: 'app.bundle.js',
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: PATH.resolve(__dirname, 'app'),
    publicPath: '/dist/',
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
