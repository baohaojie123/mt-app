export default {
  // mogodb数据库连接
  dbs:'mongodb://127.0.0.1:27017/student',
  // redis连接
  redis:{
    get host(){
      return '127.0.0.1'
    },
    get port(){
      return 6379
    }
  },
  // smtp服务
  smtp:{
    get host(){
      return 'smtp.qq.com'
    },
    get user(){
      return '918314315@qq.com'
    },
    get pass(){
      return 'jreahbaecujobfhe'
    },
    // 邮箱验证码
    //toString转化为16进制，取第二位到6位 转换成大写
    get code(){
      // return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      // }
    },
    //过期时间 一分钟
    get expire(){
      // return ()=>{
        return new Date().getTime()+60*60*1000
      // }
    }
  }
}