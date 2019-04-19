<template>
  <div class=""/>
</template>

<script>
export default {
  layout: 'blank',
  // 用中间件的原因：我们并不是点击退出按钮执行这个动作，而是必须要到达这个页面自动去执行，利用中间件机制
  middleware: async (ctx) => {
    let {status,data} = await ctx.$axios.get('/users/exit')
    if(status === 200 && data && data.code === 0){
      window.location.href = '/'
    }
  }
}
</script>
