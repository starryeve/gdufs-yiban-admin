/*
 * @Description:
 * @Author: Ali
 * @Date: 2021-01-09 14:36:33
 * @LastEditors: Ali
 * @LastEditTime: 2021-03-27 21:38:51
 */
'use strict'
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  publicPath: '/admin/',
  outputDir: 'admin',
  assetsDir: 'static',
  productionSourceMap: false,
  runtimeCompiler: false,
  configureWebpack: {
    name: 'yiban-admin',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
