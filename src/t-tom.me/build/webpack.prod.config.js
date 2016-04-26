const webpack = require('webpack');
const config = require('./webpack.base.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


config.output.filename = "main.[hash:16].js";
config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  //将样式统一发布到style.css中
  new ExtractTextPlugin("main.[hash:16].css", {
    allChunks: true,
    disable: false
  }),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
]);

module.exports = config;
