import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
// 主要用于处理post的相关请求
import bodyParser from 'koa-bodyparser'
// 登录注册 还有一些cookie的写都是用到session的
import session from 'koa-generic-session'
import Redis from 'koa-redis'
// 解决服务端向客服端发送response json格式美化的效果
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
const app = new Koa()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server


  // 配置


  // 与session有关的处理
  // cookie 和 session 的关系。服务端用 session 来识别客户端的状态，客户端用 cookie 来保存服务端的 session。
  // 让 session 结合 Redis 进行配合，让服务端产生 session 存于客户端的 cookie 并用 redis 进行服务端存储读写
  app.keys = ['mt','keyskeys']//['美团的缩写','密钥']
  app.proxy = true
  app.use(session({
    key:'mt',//前缀
    prefix:'mt:uid',
    // session借助于Redis的存储 开启redis服务
    store:new Redis()
  }))

  // push的处理
  app.use(bodyParser({
    // 扩展类型的处理
    extendTypes:['json','form','text']
  }))
  app.use(json())

  // 数据库 开启mongoose服务
  mongoose.connect(dbConfig.dbs,{
    useNewUrlParser:true
  })
  // passport处理登录相关的  初始化
  app.use(passport.initialize())
  app.use(passport.session())
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
// 获取到所有的路由表
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
