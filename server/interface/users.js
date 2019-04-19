import Router from 'koa-router';
// 利用redis把不同验证码对应不同用户
import Redis from 'koa-redis'
//使用node 用自己的邮箱向别人邮箱发送邮件
import nodeMailer from 'nodemailer'
// npm ls koa-redis 查看版本
import User from '../dbs/models/users'
import Email from '../dbs/config'
import axios from './utils/axios'
import Passport from './utils/passport'

let router = new Router({
  prefix:'/users'
})
// 获取redis的客户端
let Store = new Redis().client
// 定义一个注册接口，不能用get 只能用post，post接口比get接口安全一些
router.post('/signup',async (ctx) =>{
  // 解构赋值
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;
  // 做校验 在nodemail发验证码的时候，会在redis上存储，这里把存储的东西拿出来做对比
  if(code){
    const saveCode = await Store.hget(`nodemail:${username}`,`code`);
    const saveExpire = await Store.hget(`nodemail:${username}`,`expire`)
    // 正确的验证码将继续执行，不会有任何返回
    if(code === saveCode){
      // 不想让验证码一直有效
      if(new Date().getTime() - saveExpire > 0){
        ctx.body = {
          code:-1,
          message:'验证码已经过期'
        }
        return false
      }
      }else {
      ctx.body = {
        code:-1,
        message:'请填写正确的验证码'
      }
    }
  }else{
    ctx.body = {
      code:-1,
      message:'请填写验证码'
    }
  }
  // 能查到用户名 用户名已经被注册
  let user = await User.find({username})
  if(user.length){
    ctx.body={
      code:-1,
      message:'用户名已经被注册'
    }
    return
  }
  // 新用户数据写入数据库
  let nuser = await User.create({username,password,email})
  // 检查是否成功写库,成功便自动登录
  if(nuser){
    let res = await axios.post('/users/signin',{username,password})
    if(res.data && res.data.code === 0){
      // 注册成功，并把当前用户名返回
      ctx.body = {
        code:0,
        msg:'注册成功',
        user:res.data.username
      }
    }else{
      ctx.body = {
        code:-1,
        msg:'error'
      }
    }
  }else{
    ctx.body = {
      code:-1,
      msg:'注册失败'
    }
  }
})
// 登录接口，写法固定，调用本地策略，返回err，user,info,status

router.post('/signin',async (ctx,next) =>{
  return Passport.authenticate('local',function (err,user,info,status) {
    if(err){
      ctx.body = {
        code:-1,
        msg:err
      }
    }else{
      if(user){
        ctx.body = {
          code:0,
          msg:'登录成功',
          user
        }
        // 做一个登录的动作
        return ctx.login(user)
      }else{
        ctx.body = {
          code:1,
          msg:info
        }
      }

    }
  })(ctx,next)
})
// 验证码验证
router.post('/verity',async (ctx,next) =>{
  // 取username 因为只拿取一个变量 就不需要解构赋值了
  // 限制频繁刷这个接口
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
  if(saveExpire && new Date().getTime() - saveExpire < 0){
    ctx.body = {
      code:-1,
      msg:'验证请求过于频繁，1分钟1次'
    }
    return false
  }
  // 发邮件紧密相关的功能，创建smtp服务 发送方
  // true 监听465端口，否则访问其他端口
  // 验证
  let transporter = nodeMailer.createTransport({
    host:Email.smtp.host,
    port:587,
    secure:false,
    auth:{
      user:Email.smtp.user,
      pass:Email.smtp.pass
    }
  })
    // 接收方
    let ko = {
      code:Email.smtp.code,
      expire:Email.smtp.expire,
      //给谁发
      email:ctx.request.body.email,
      // 当前对象
      username:ctx.request.body.username
    }

  // 邮件中要显示什么信息
  let mailOptions = {
    from:`"认证邮件"<${Email.smtp.user}>`,
    to:ko.email,
    subject:'《慕课网高仿美团网全站实战》注册码',
    html:`您在《慕课网高仿美团网全站实战》课程中注册，您的邀请码是${ko.code}`
  }
  // 发送 发送对象transporter
  await transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      return console.log('error')
    }else{
      // 发送成功 在redis存储
      Store.hmset(`nodemail:${ko.email}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })
  // 接口最后的响应
  ctx.body = {
    code:0,
    msg:'验证码已发送，可能会有延迟，有效期一分钟'
  }
})
// 退出用get没问题
router.get('/exit',async (ctx,next) => {
  // 执行一个退出的动作
  await ctx.logout();
  // 检查现在是不是登录状态，二次验证，是否成功注销掉
  if(!ctx.isAuthenticated()){
    ctx.body = {
      code:0
    }
  }else{
    ctx.body = {
      code: -1
    }
  }
})
// 获取用户名 可以用get
router.get('/getUser',async (ctx, next)=>{
  if(ctx.isAuthenticated()){
    // possport会把我们的用户信息的放到session对象里面去
    const {username,email} = ctx.session.passport.user
    ctx.body = {
      user:username,
      // 简写
      email
    }
  }else {
    ctx.body = {
      user:'',
      email:''
    }
  }
})
export default router
