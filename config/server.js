const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const KoaWebpack = require('koa-webpack')
const webpackConfig = require('./webpack.dev.config.js') 
const path = require('path')
const http = require('http')

const app = new Koa()
const router = new Router()
const port = process.env.PORT || 3000

async function start () {
    //初始化webpack，传入编译对象
    //const compiler = webapck(webpackConfig)
    const middleware = await KoaWebpack( {
      config: webpackConfig,
      devMiddleware: {
        serverSideRender: false,
        stats: 'minimal'
      }
    } )

    //本地接口测试
    router.post('/collection', ctx => {
      ctx.response.status = 200
      ctx.response.body = {
        code: 0,
        message: 'ok',
        data: []
      }
    })

    app.use(router.routes())
    app.use(middleware)
    app.use(serve(path.resolve(__dirname, '../public')))
  
    // app.use( async ctx => {
    //   const filename = path.resolve(webpackConfig.output.path, 'index.html')
    //   ctx.response.type = 'html'
    //   ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    // })

    // 监听端口
    //app.listen(port)
    http.createServer(app.callback()).listen(port).on('listening', function() {
      console.log(`visit http://localhost:${port}`)
    })

    //require('http').createServer(app.callback()).listen(port)
    //require('https').createServer(app.callback()).listen(port)
}


start()
