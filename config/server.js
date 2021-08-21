const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const KoaWebpack = require('koa-webpack')
const webpackConfig = require('./webpack.dev.config.js') 
const path = require('path')
const http = require('http')
const https = require('https')
const readFileSync = require('fs').readFileSync
const open = require('open')
const getPageCode = require('./pageCode')

const app = new Koa()
const router = new Router()
const port = 3000

const httpsOptions = {
	key: readFileSync( path.join(__dirname, './https/privatekey.pem') ),
	cert: readFileSync( path.join(__dirname, './https/certificate.pem') )
}

async function start () {
    //初始化webpack，传入编译对象
    //const compiler = webapck(webpackConfig)
    const middleware = await KoaWebpack( {
      config: webpackConfig,
      devMiddleware: {
        serverSideRender: false,
        stats: {
          all: false,
          assets: true,
          colors: true,
          timings: true,
          modules: true,
          maxModules: 0,
          errors: true,
          warnings: true,
          moduleTrace: true,
          errorDetails: true,
        }
      }
    } )

    //本地接口测试
    router.post('/collection', ctx => {
      try {
        ctx.response.status = 200
        ctx.response.body = {
          code: 0,
          message: 'ok',
          data: []
        }
      } catch (e) {
        ctx.response.status = 400
        ctx.response.body = {
          code: 400,
          message: e.message,
          data: null
        }
      }
    })

    //页面爬虫
    router.get('/getpage', async ctx => {
      const { url } = ctx.query
      const data = await getPageCode(url)
      ctx.response.status = 200
      ctx.response.body = {
        code: 0,
        message: 'ok',
        data
      }
    })

    app.on('error', err => {
      log.error('server error', err)
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
      open(`http://localhost:${port}`)
      console.log(`visit http://localhost:${port}`)
    })
    // https.createServer(httpsOptions,app.callback()).listen(port + 1).on('listening', function() {
    //   open(`https://localhost:${port + 1}`)
    //   console.log(`visit https://localhost:${port + 1}`)
    // })

    //require('http').createServer(app.callback()).listen(port)
    //require('https').createServer(app.callback()).listen(port)
}


start()
