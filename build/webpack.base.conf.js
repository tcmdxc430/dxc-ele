'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {// 入口
    app: './src/main.js'// 入口js文件
  },
  output: {
    path: config.build.assetsRoot,// 输出文件路径，对应index.js中assetsRoot(dist目录)
    filename: '[name].js',// 输出文件名称对应entry中app
    publicPath: process.env.NODE_ENV === 'production'// 请求的静态资源绝对路径
      ? config.build.assetsPublicPath// 对应index.js中assetsPublicPath: '/',(根目录路径)
      : config.dev.assetsPublicPath
  },
  resolve: {//require或import的相关配置
    extensions: ['.js', '.vue', '.json'],// 自动补全文件后缀
    alias: {// 提供别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),// src用@表示
    }
  },
  module: {
    rules: [// 每种文件做对应处理
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')// eslint检查错误时提示错误信息
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,// 大于10k时生成单独文件，小于时生成base64
          name: utils.assetsPath('img/[name].[hash:7].[ext]')// 文件命名规则，最终生成static/img/[name].hash.ext(扩展名)
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,//字体文件
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions', 'Android >= 4.0']// 对安卓设备支持
      })
    ]
  }
}
