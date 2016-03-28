var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var webpack = require("webpack");
var path = require('path');


const entry = ['./src/index.js'];
const plugins = [
  //提交公用的js文件到common.js文件中
  //new CommonsChunkPlugin('common.js'),

  //将样式统一发布到style.css中
  new ExtractTextPlugin("style.css", {
    allChunks: true,
    disable: false
  }),
  //文件头部指定的注释信息
  new webpack.BannerPlugin('This file is created by Nomand')
];


module.exports = {
  debug: true,
  entry: entry,
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  stats: {children: false},
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.stylus$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
      }
    ]
  },
  plugins: plugins,
  vue: {
    loaders: {
      js: 'babel',
      autoprefixer: {
        browsers: ['last 2 versions']
      },
      css: ExtractTextPlugin.extract("style-loader", "css"),
      sass: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
      stylus: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!stylus-loader")
    }
  },
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extension: ['', '.js'],
    alias: {
      "stylusResource": path.resolve(__dirname, '../src/style'),
      "componentsResource": path.resolve(__dirname, '../src/components')
    }
  },
  externals: {
    jquery: false
  }
}
