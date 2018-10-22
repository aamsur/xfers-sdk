const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    xfers: './src/index-dev.js',
  },
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    // contentBase: './dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
});
