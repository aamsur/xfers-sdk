const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    xfers: './src/index.js',
  },
  mode: 'production',
  devtool: 'source-map'
});
