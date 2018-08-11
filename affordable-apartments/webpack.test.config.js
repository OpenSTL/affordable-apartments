const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const { EnvironmentPlugin } = require('webpack');

const { baseConfig } = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  target: 'node',
  plugins: [
    new EnvironmentPlugin({ NODE_ENV: 'test' }),
  ],
  externals: nodeExternals(),
  devtool: 'inline-cheap-module-source-map',
});
