const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const MODULE_PATHS = [
  path.resolve(__dirname, 'src/assets/fonts'),
  path.resolve(__dirname, 'src/assets/styles'),
  path.resolve(__dirname, 'src/assets/images'),
  path.resolve(__dirname, 'src/components/commons'),
  path.resolve(__dirname, 'src/components/screens'),
  path.resolve(__dirname, 'src/components/flows'),
  path.resolve(__dirname, 'src/wrappers/helpers'),
  'node_modules'
];

module.exports = {
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Xfers',
    libraryTarget: 'var'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  resolve: {
    modules: MODULE_PATHS,
    extensions: ['.js', '.jsx', '.json', 'scss', 'sass', 'css', 'png', 'svg', 'gif', 'jpeg', 'jpg']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react', 'stage-0']
          }
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/assets/styles'),
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]---[local]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'src/assets')],
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
          }
        }]
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif|svg)$/i,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'images/'
      //     }
      //   }
      // },
      {
        test: /\.(ttc|ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
    ]
  },
}
