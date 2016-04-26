const config = require('./webpack.base.config')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.devtool = 'eval-source-map'

config.devServer = {
  noInfo: true
};
config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  //将样式统一发布到style.css中
  new ExtractTextPlugin("style.css", {
    allChunks: true,
    disable: false
  })
]);
module.exports = config
