'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 提供各种node依赖
const opn = require('opn')
const path = require('path')// 提供文件路径操作的方法
const express = require('express')// node用来启动web serve的框架
const webpack = require('webpack')// 核心编译工具
const proxyMiddleware = require('http-proxy-middleware')// http代理转发api
const webpackConfig = require('./webpack.dev.conf')// 引入webpack.dev.conf

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port // 取index.js中端口号

const autoOpenBrowser = !!config.dev.autoOpenBrowser

const proxyTable = config.dev.proxyTable//取index.js中代理的接口

const app = express()
const appData = require('../data.json');
const seller = appData.seller;
const goods = appData.goods
const ratings = appData.ratings

const apiRoutes = express.Router();
apiRoutes.get('/seller',function(req,res){
  res.json({
     errno : 0,
     data : seller
  });
});

apiRoutes.get('/goods',function(req,res){
  res.json({
     errno : 0,
     data : goods
  });
});

apiRoutes.get('/ratings',function(req,res){
  res.json({
     errno : 0,
     data : ratings
  });
});

app.use('/api',apiRoutes);

const compiler = webpack(webpackConfig)// webpack中间件，把编译好的文件放在内存，而不显示在代码编辑器

const devMiddleware = require('webpack-dev-middleware')(compiler, {// webpack中间件，把编译好的文件放在内存，而不显示在代码编辑器
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {//热加载中间件
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {// 代理接口转发中间件
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))// 配置静态资源访问路径

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port//通过localhost:8080访问页面
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
