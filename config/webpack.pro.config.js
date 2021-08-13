
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const fs = require('fs')
const path = require('path')

function getEntry() {
  let obj = {}
  fs.readdirSync(path.resolve(__dirname, '../src/lang')).forEach(file => {
    if (file.indexOf('.') === -1) {
      obj[`nps-${file.replace(/en$/, '')}`.replace(/-$/,'')] = `./lang/${file}/index.js`
    }
  })
  return obj
}

const entries = getEntry()

// 通过webpack-merge合并基础配置，添加生产时配置
const webpackConfig = merge(baseConfig, {
  target: 'web',
  mode: 'production', // 生产模式
  entry: entries,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    jsonpFunction: 'npsJsonp'
  },
  stats: {
    children: false, // webpack打包时子模块信息设置不显示
    warnings: false // 警告不显示
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: 'nps-vendor'
    }
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包前清除输出目录
  ]
})

module.exports = webpackConfig