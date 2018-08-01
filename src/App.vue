<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
      <router-link to="/goods">点菜</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由外链，用于刷新content,keepalive保存路由跳转前的状态 -->
    <keep-alive>
      <router-view :seller="seller"></router-view> 
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import {urlParse} from './common/js/util.js'
import header from './components/header/header.vue'

const ERR_OK = 0

export default{ // 整个作为module.export导出
  data() { // 括号后空格
    return {
      seller: {
        // 商家id
        id:(() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })() // ()立即执行函数
      }
    }
  },
  created() {
    this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        // this.seller = response.data
        this.seller = Object.assign({},this.seller,response.data)// 将this.seller扩展response.data属性 而不是赋值 这样不会把data中seller的属性替换掉
        console.log(this.seller.id)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
@import "./common/stylus/mixin.styl"

  .tab
    display:flex
    width:100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
      
</style>