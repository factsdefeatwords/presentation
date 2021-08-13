const { merge } = require('webpack-merge')
const get_dev = () => require('./config/webpack.dev.config.js')
const get_pro = () => require('./config/webpack.pro.config.js')

module.exports = () => process.env.NODE_ENV === 'production' ? get_pro() : merge(get_dev(), {
  devServer: {
    contentBase: 'public',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    https: false,
    // allowedHosts:[
    //   "www.wondershare.com",
    // ]
  },
})