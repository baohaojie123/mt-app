<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item,index) in cur"
        :key="index">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [{
          img:'//p1.meituan.net/tdchotel/__24567842__1490663.jpg@368w_208h_1e_1c',
          title:'Zsmart智尚酒店',
          pos:'新客超值优惠',
          price:'321'
          }, {
          img:'//p0.meituan.net/dnaimgdark/07c40e67bc073d082f9d1c9d562432292881497.jpg@368w_208h_1e_1c',
          title:'北京建国门亚朵轻居酒店',
          pos:'酒店套餐',
          price:'561',
         },{
          img:'//p0.meituan.net/tdchotel/c18ea1b579e24e47b2b50ddda12b70961441228.png@368w_208h_1e_1c',
          title:'维也纳国际酒店',
          pos:'天天特价',
          price:'614',
        },{
          img:'//p1.meituan.net/tdchotel/__24567842__1490663.jpg@368w_208h_1e_1c',
          title:'Zsmart智尚酒店',
          pos:'新客超值优惠',
          price:'321'
        }, {
          img:'//p0.meituan.net/dnaimgdark/07c40e67bc073d082f9d1c9d562432292881497.jpg@368w_208h_1e_1c',
          title:'北京建国门亚朵轻居酒店',
          pos:'酒店套餐',
          price:'561',
        },{
          img:'//p0.meituan.net/tdchotel/c18ea1b579e24e47b2b50ddda12b70961441228.png@368w_208h_1e_1c',
          title:'维也纳国际酒店',
          pos:'天天特价',
          price:'614',
        }],
        part: [{
          img:'//p0.meituan.net/msmerchant/f0f72ccd78773cc5a0156b1c00d588c0961404.jpg@368w_208h_1e_1c',
          title:'大董（王府井店）',
          pos:'糖醋黄鱼午市套餐，建议4人使用',
          price:'1296'
        }, {
          img:'//p0.meituan.net/msmerchant/f271cc526b6ad104ccd0f849f0317e42320376.jpg@368w_208h_1e_1c',
          title:'云海肴（合景·摩方店）',
          pos:'宠爱四人套餐，提供免费WiFi',
          price:'368',
        },{
          img:'//p1.meituan.net/mogu/7d1f835ad15a60fb964d1d60468c0ba345442.jpg@368w_208h_1e_1c',
          title:'小吾厨房（建国门店）',
          pos:'双人套餐A，提供免费WiFi',
          price:'218',
        },{
          img:'//p0.meituan.net/msmerchant/f0f72ccd78773cc5a0156b1c00d588c0961404.jpg@368w_208h_1e_1c',
          title:'大董（王府井店）',
          pos:'糖醋黄鱼午市套餐，建议4人使用',
          price:'1296'
        }, {
          img:'//p0.meituan.net/msmerchant/f271cc526b6ad104ccd0f849f0317e42320376.jpg@368w_208h_1e_1c',
          title:'云海肴（合景·摩方店）',
          pos:'宠爱四人套餐，提供免费WiFi',
          price:'368',
        },{
          img:'//p1.meituan.net/mogu/7d1f835ad15a60fb964d1d60468c0ba345442.jpg@368w_208h_1e_1c',
          title:'小吾厨房（建国门店）',
          pos:'双人套餐A，提供免费WiFi',
          price:'218',
        }],
        spa: [{
          img:'//p1.meituan.net/tdchotel/__24567842__1490663.jpg@368w_208h_1e_1c',
          title:'Zsmart智尚酒店',
          pos:'新客超值优惠',
          price:'321'
        }, {
          img:'//p0.meituan.net/dnaimgdark/07c40e67bc073d082f9d1c9d562432292881497.jpg@368w_208h_1e_1c',
          title:'北京建国门亚朵轻居酒店',
          pos:'酒店套餐',
          price:'561',
        },{
          img:'//p0.meituan.net/tdchotel/c18ea1b579e24e47b2b50ddda12b70961441228.png@368w_208h_1e_1c',
          title:'维也纳国际酒店',
          pos:'天天特价',
          price:'614',
        },{
          img:'//p1.meituan.net/tdchotel/__24567842__1490663.jpg@368w_208h_1e_1c',
          title:'Zsmart智尚酒店',
          pos:'新客超值优惠',
          price:'321'
        }, {
          img:'//p0.meituan.net/dnaimgdark/07c40e67bc073d082f9d1c9d562432292881497.jpg@368w_208h_1e_1c',
          title:'北京建国门亚朵轻居酒店',
          pos:'酒店套餐',
          price:'561',
        },{
          img:'//p0.meituan.net/tdchotel/c18ea1b579e24e47b2b50ddda12b70961441228.png@368w_208h_1e_1c',
          title:'维也纳国际酒店',
          pos:'天天特价',
          price:'614',
        }],
        movie: [{
          img:'//p0.meituan.net/msmerchant/f0f72ccd78773cc5a0156b1c00d588c0961404.jpg@368w_208h_1e_1c',
          title:'大董（王府井店）',
          pos:'糖醋黄鱼午市套餐，建议4人使用',
          price:'1296'
        }, {
          img:'//p0.meituan.net/msmerchant/f271cc526b6ad104ccd0f849f0317e42320376.jpg@368w_208h_1e_1c',
          title:'云海肴（合景·摩方店）',
          pos:'宠爱四人套餐，提供免费WiFi',
          price:'368',
        },{
          img:'//p1.meituan.net/mogu/7d1f835ad15a60fb964d1d60468c0ba345442.jpg@368w_208h_1e_1c',
          title:'小吾厨房（建国门店）',
          pos:'双人套餐A，提供免费WiFi',
          price:'218',
        },{
          img:'//p0.meituan.net/msmerchant/f0f72ccd78773cc5a0156b1c00d588c0961404.jpg@368w_208h_1e_1c',
          title:'大董（王府井店）',
          pos:'糖醋黄鱼午市套餐，建议4人使用',
          price:'1296'
        }, {
          img:'//p0.meituan.net/msmerchant/f271cc526b6ad104ccd0f849f0317e42320376.jpg@368w_208h_1e_1c',
          title:'云海肴（合景·摩方店）',
          pos:'宠爱四人套餐，提供免费WiFi',
          price:'368',
        },{
          img:'//p1.meituan.net/mogu/7d1f835ad15a60fb964d1d60468c0ba345442.jpg@368w_208h_1e_1c',
          title:'小吾厨房（建国门店）',
          pos:'双人套餐A，提供免费WiFi',
          price:'218',
        }],
        travel: [{
          img:'//p1.meituan.net/tdchotel/__24567842__1490663.jpg@368w_208h_1e_1c',
          title:'Zsmart智尚酒店',
          pos:'新客超值优惠',
          price:'321'
        }, {
          img:'//p0.meituan.net/dnaimgdark/07c40e67bc073d082f9d1c9d562432292881497.jpg@368w_208h_1e_1c',
          title:'北京建国门亚朵轻居酒店',
          pos:'酒店套餐',
          price:'561',
        },{
          img:'//p0.meituan.net/tdchotel/c18ea1b579e24e47b2b50ddda12b70961441228.png@368w_208h_1e_1c',
          title:'维也纳国际酒店',
          pos:'天天特价',
          price:'614',
        },{
          img:'//p1.meituan.net/tdchotel/__24567842__1490663.jpg@368w_208h_1e_1c',
          title:'Zsmart智尚酒店',
          pos:'新客超值优惠',
          price:'321'
        }, {
          img:'//p0.meituan.net/dnaimgdark/07c40e67bc073d082f9d1c9d562432292881497.jpg@368w_208h_1e_1c',
          title:'北京建国门亚朵轻居酒店',
          pos:'酒店套餐',
          price:'561',
        },{
          img:'//p0.meituan.net/tdchotel/c18ea1b579e24e47b2b50ddda12b70961441228.png@368w_208h_1e_1c',
          title:'维也纳国际酒店',
          pos:'天天特价',
          price:'614',
        }]
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },

  methods: {
    over(e){
        let dom = e.target
        let tag = dom.tagName.toLowerCase()
        let self = this
        if (tag === 'dd') {
            this.kind = dom.getAttribute('kind')
        }
    }
  },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
