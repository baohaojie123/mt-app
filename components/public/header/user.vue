<template>
    <div class="m-user">
        <template v-if="user">
            欢迎您，<span class="username">{{user}}</span>
            <nuxt-link to="/exit">退出</nuxt-link>
        </template>
        <template v-else>
            <nuxt-link class="login" to="/login">立即登录</nuxt-link>
            <nuxt-link class="register" to="/register">注册</nuxt-link>
        </template>
    </div>
</template>

<script>
export default {
  data(){
    return{
      user:''
    }
  },
  // 1
  // mounted(){
  //    // get()返回一个promise
  //   this.$axios.get('/users/getUser').then()
  // }
  // 2
  async mounted(){
    // 解构赋值 status获取http响应状态的 数据结构是data部分 data里面的才是返回的内容
    const {status,data:{user}} = await this.$axios.get('/users/getUser')
    if(status === 200){
      this.user = user
    }
  }
}
</script>

<style scoped>

</style>