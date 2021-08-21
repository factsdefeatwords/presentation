const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = {
  // devtool: 'inline-source-map',
  context: path.resolve(__dirname, '../src'),
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        // 尽量将 loader 应用于最少数量的必要模块，因此设置include
        // 只针对该目录下的js文件进行babel处理
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.(css|scss)$/i,
        use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpe?g)\??.*$/,
        use: [
          {
              loader: 'url-loader',
              options: {
                  limit: 10000, //低于10kb 转化为base64
                  name: 'images/[name].[ext]'
              }
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000, //将svg文件控制30k以内，无需额外部署svg图片文件
              generator: (content) => svgToMiniDataURI(content.toString()),
              name: 'images/[name].[ext]'
            },
          },
        ],
      },
    ]
  },
  resolve: {
    // modules: 告诉webpack哪些目录需要搜索去匹配解析
    modules: [path.resolve(__dirname, '../node_modules')],
    // extensions: 告诉webpack这些后缀文件需要去搜索匹配
    extensions: ['.js', '.vue'],
    alias: {
      // 设置别名指向对应目录
      '@': path.resolve(__dirname, '../src')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].common.css'
    }),
    new HtmlWebpackPlugin({
      inject: process.env.NODE_ENV === 'production' ? false : true,
      title: 'Wondershare NPS 2021',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      // 定义环境变量，区分开发和生产环境
      // 具体详情可查看DefinePlugin文档
      'process.env.NODE_ENV':
        process.env.NODE_ENV === 'production'
          ? JSON.stringify('production')
          : JSON.stringify('development')
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: 'nps-vendor'
    }
  },
}

module.exports = webpackConfig
