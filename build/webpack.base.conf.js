const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
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
					include: [resolve('../docs'), resolve('../examples')]
        },
        {
          test: /\.vue$/,
          exclude:path.resolve(__dirname, '../packages/cptTemp'),
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
                      resources: path.resolve(__dirname, '../src/styles/custom.scss')
                    }
                  }
                ]
              }
            }
          }
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
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
    }
  };
