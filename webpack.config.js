/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: './index.ts',
  target: 'node',
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       parallel: 4,
  //     }),
  //   ],
  // },
  module: {
    rules:[
      {test: /\.ts$/,use: ['ts-loader']},
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
    ] 
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
