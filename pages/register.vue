<template>
    <div class="page-register">
        <article class="header">
            <header>
                <a href="/" class="site-logo"></a>
                <span class="login">
                    <em class="bold">已有美团账号？</em>
                    <a href="/login">
                        <el-button type="primary" size="small">登录</el-button>
                    </a>
                </span>
            </header>
        </article>
        <section>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                    <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
                    <span class="status">{{statusMsg}}</span>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="form.code" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input v-model="form.cpwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">同意以下协议并注册</el-button>
                    <div class="error">{{error}}</div>
                </el-form-item>
                <el-form-item>
                    <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>

</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data() {
    return {
      statusMsg: "",
      error: '',
      form: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [{
          required: true, type: 'string', message: '请输入昵称', trigger: 'blur'
        }],
        email: [{
          required: true, type: 'email', message: '请输入邮箱', trigger: 'blur'
        }],
        pwd: [{
          required: true, message: '创建密码', trigger: 'blur'
        }],
        cpwd: [{
          required: true, message: '确认密码', trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value == '') {
              callback(new Error('请再次输入密码'))
            } else if (value != this.form.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },

    sendMsg() {
      const self = this;
      let namePass
      let emailPass
      if (self.timeid) {
        return false
      }
      // 验证用户名有没有通过规则校验
      this.$refs['form'].validateField('name', (valid) => {
        namePass = valid
      })
      self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['form'].validateField('email', (valid) => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        self.$axios.post('/users/verity', {
          // 对中文进行编码
          username: encodeURIComponent(self.form.name),
          email: self.form.email
        }).then(({
                   // 解构赋值
                   status, data
                 }) => {
          if (status === 200 && data && data.code === 0) {
            // 倒计时 60  timeid
            let count = 60;
            self.statusMsg = `验证码已发送，剩余${count--}秒`
            self.timerid = setInterval(function () {
              self.statusMsg = `验证码已发送，剩余${count--}秒`
              if (count === 0) {
                clearInterval(self.timerid)
              }
            }, 1000)
          } else {
            self.statusMsg = data.msg
          }
        })
      }
    },
    // 验证
    register() {
        let self = this;
        this.$refs['form'].validate((valid) =>{
          if(valid){
            self.$axios.post('/users/signup',{
              username:window.encodeURIComponent(self.form.name),
              // 加密密码 MD5的加密方式 MD5()返回的是数组，需要toString转化成字符串
              password:CryptoJS.MD5(self.form.pwd).toString(),
              email:self.form.email,
              code:self.form.code
            }).then(({status,data})=>{
              if(status === 200){
                if(data&&data.code === 0){
                  location.href = '/login'
                }else{
                  self.error = data.msg
                }
              }else {
                self.error = `服务器出错，错误码：${status}`
              }
              // 定时的清空error信息
              setTimeout(function () {
                self.error = ''
              }, 1500)
            })
          }
        })
    }

  }
}
</script>

<style lang="scss">
    @import "@/assets/css/register/index.scss";
</style>