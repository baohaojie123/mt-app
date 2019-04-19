import passport from 'koa-passport'
// 本地策略
import LocalStrategy from 'passport-local'
//引入用户的模型
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function (username, password, done) {
  // 查询条件
  let where = {
    username
  }
  let result = await UserModel.findOne(where)
  if(result!=null){
    if(result.password = password){
      return done(null,result)
    }else {
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))
  //用户每次进来通过session去验证,需要序列化
  // 序列化
  passport.serializeUser(function (user,done) {
    return done(null,user)
  })
  // 反序列化
  passport.deserializeUser(function (user,done) {
    return done(null,user)
  })
export default passport

