
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const https = require('https')

module.exports = env => {
  let mode = env ? env.mode : 'development',
      prod = mode == 'production';
  return {
    mode: 'development',
    context:path.resolve(__dirname, 'src'),
    entry: {
      app: './index.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: prod ? `[name].[hash:8].js` : `[name].js`,
    },
    resolve: {
      extensions: ['.vue', '.js'],
      alias: {
          '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: /src/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: true
          }
        },
        {
          test: /\.less$/,
          use: [ 'style-loader', 'css-loader', 'less-loader' ]
        },
      ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        compress: true,
        port: 3000,
        open:true,
        before(app,server){
          app.get('/getIpaddress',function(req,res){
            const ip_tester = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/
            const { ip } = req.query
            https.get(`https://i.wondershare.com/api/v1/geoip/country`, {
              'headers': {
                'X-Forwarded-For': ip_tester.test(ip) ? ip : '',
                'Origin': 'https://www.wondershare.com',
                'Referer': 'https://www.wondershare.com',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site'
              }
            }, response => {
              response.setEncoding('utf8')
              let rawData = ''
              response.on('data', (chunk) => { rawData += chunk; })
              response.on('end', () => {
                try {
                  const parsedData = JSON.parse(rawData);
                  console.log(parsedData);
                  res.json(parsedData)
                } catch (e) {
                  console.log(666)
                  console.error(e.message);
                }
              })
            })
          })
        }
    },
    plugins: [
      new HtmlWebpackPlugin({
          inject: true,
          template: path.resolve(__dirname, './public/index.html'),
          filename: 'index.html'
      }),
      new VueLoaderPlugin()
    ],
    devtool: prod ? '' : 'source-map',
  }
}