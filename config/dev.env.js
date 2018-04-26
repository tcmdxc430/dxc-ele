'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {// 与prodEnv合并后输出NODE_ENV: '"development"'
  NODE_ENV: '"development"'
})
