'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')// 合并配置文件
const baseWebpackConfig = require('./webpack.base.conf')// 开发和运行环境共享
const HtmlWebpackPlugin = require('html-webpack-plugin')// 操纵html文件插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {// 启动热加载
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {// 把base.conf与dev.conf合并
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })// 编译每个css预处理文件
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env// 将源码中process.env替换为config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),// 热加载插件
    new webpack.NoEmitOnErrorsPlugin(),// 编译错误时跳过
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',// 指定编译后文件名
      template: 'index.html',// 指定要处理的模板
      inject: true// 自动将css路径添加到head中js添加进body
    }),
    new FriendlyErrorsPlugin()
  ]
})
