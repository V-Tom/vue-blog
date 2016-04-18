var config = require('./webpack.base.config')
var webpack = require('webpack')

config.devtool = 'eval-source-map'

config.devServer = {
  noInfo: true
};
config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })
]);
module.exports = config
