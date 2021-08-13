const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

// 通过webpack-merge合并基础配置，添加开发时配置
const webpackConfig = merge(baseConfig, {
  mode: 'development', // 开发模式
  devtool: 'eval-source-map', // 开发时出错能知道在源代码中哪一行
  entry: ['./dev.js'],//热更新模块下必须为数组或者函数
  output: {
    // 设置打包后的文件和位置
    filename: '[hash].bundle.js',
    path: path.join(__dirname, '../dist')
  },
  stats: {
    children: false, // webpack打包时子模块信息设置不显示
    modules: false // 不显示模块信息
  },
})

module.exports = webpackConfig