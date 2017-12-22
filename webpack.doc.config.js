const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: resolve('./docs/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('./docs')]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: [
                'vue-style-loader',
                'css-loader',
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: path.resolve(__dirname, 'src/styles/custom.scss')
                  }
                }
              ]
            }
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          preprocess: function (MarkdownIt, Source) {
            MarkdownIt.renderer.rules.table_open = function () {
              return '<div class="table-container"><table class="table">';
            };
            MarkdownIt.renderer.rules.table_close = function () {
              return '</table></div>';
            };
            return Source;
          }
        }
      }
    ]
  },
  devServer: {
    hot: true,
    open: true,
    port: 8088,
    inline: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './docs/index.html'
    })
  ]
};
