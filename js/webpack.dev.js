const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
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
