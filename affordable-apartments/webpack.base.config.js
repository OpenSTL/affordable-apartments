const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const styleLoader = process.env.NODE_ENV !== 'production'
  ? 'vue-style-loader' : MiniCssExtractPlugin.loader;

const sassLoader = {
  loader: 'sass-loader',
  options: {
    implementation: require('sass'),
  },
};

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          optimizeSSR: false,
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              styleLoader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              },
              sassLoader,
            ]
          }, {
            use: [styleLoader, 'css-loader', sassLoader]
          }
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  externals: {
    // Unused drivers for knex.
    'sqlite3': 'sqlite3',
    'mariasql': 'mariasql',
    'mssql': 'mssql',
    'mysql': 'mysql',
    'oracle': 'oracle',
    'strong-oracle': 'strong-oracle',
    'oracledb': 'oracledb'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
};

module.exports = { baseConfig };
