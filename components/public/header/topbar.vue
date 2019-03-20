<template>
    <!--header出口文件 gutter为padding span综合24-->
        <el-row class="m-header">
            <el-col :span="5">
                <geo></geo>
            </el-col>
            <el-col :span="5">
                <user></user>
            </el-col>
            <el-col :span="14"><div class="grid-content bg-purple">
                <navbar></navbar>
            </div></el-col>
        </el-row>
</template>

<script>
import Geo from './geo'
import User from './user'
import Navbar from './nav'
export default {
  components:{
    Geo, User, Navbar
  }
}
</script>

<style lang="scss">
 @import "@/assets/css/public/layout.scss";
</style>