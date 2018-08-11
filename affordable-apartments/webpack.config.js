/* global __dirname */

const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const { baseConfig } = require('./webpack.base.config.js');

module.exports = [
  merge(baseConfig, {
    name: 'server',
    target: 'node',
    entry: './src/server.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    node: {
      __filename: true,
      __dirname: true
    },
    externals: nodeExternals(),
  }),
  merge(baseConfig, {
    name: 'client',
    entry: './src/client.js',
    output: {
      path: path.resolve(__dirname, 'build/js'),
      publicPath: '/js/',
      filename: '[name].js'
    },
  }),
];
