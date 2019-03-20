<template>
    <div class="m-menu">
        <dl class="nav">
            <dt>全部分类</dt>
            <dd v-for="(item,index) in menu" :key="index">
                <i :class="item.type"></i>{{item.name}} <span class="arrow"></span>
            </dd>
        </dl>
        <div class="detail">
            <!--模块的循环-->
            <template>
                <h4>标题</h4>
                <span>子项</span>
                <span>子项</span>
                <span>子项</span>
            </template>

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return{
      menu:[{
        type:'food',
        name:'美食'
      },{
        type:'takeout',
        name:'外卖'
      },{
        type:'hotel',
        name:'酒店'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      },{
        type:'food',
        name:'美食'
      }]
    }
  }
}
</script>

<style lang="scss">

</style>