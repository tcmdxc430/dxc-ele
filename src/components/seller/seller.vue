<template>
    <div @click="showDetail">商家</div>
</template>

<script type="text/ecmascript-6">
import global_ from '../../components/HelloWorld.vue'
export default {
  data () {
    return {
      getColor: global_.getRandColor
    }
  },
  methods: {
        showDetail() {
            global_.getRandColor()
        }
    }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
   
</style>