<template>
    <div class="cartcontrol">
        <transition name="move">
        <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
     export default {
         props: {
             food: {
                 type: Object
             }
         },
         created() {
             console.log(this.food)
         },
         methods: {
             addCart() {
                 console.log(6)
                 if (!this.food.count) {
                    //  给this.food的count属性赋值为1，count变化会被dom检测到
                     Vue.set(this.food, 'count', 1)
                 } else {
                     this.food.count++
                 }
                 // 派发事件,自定义add事件 包含event.target
                 this.$emit('add', event.target)
             },
             decreaseCart() {
                 if (this.food.count) {
                     this.food.count--
                 }
             }
         }
    }
</script>

<style lang="stylus" type="stylesheet/stylus">
    .cartcontrol
        font-size 0
        .cart-decrease
            display inline-block
            padding 6px
            opacity: 1
            // 唤起硬件加速
            transform translate3d(0,0,0)
            .inner
                display inline-block
                font-size 24px
                line-height 24px
                color rgb(0,160,220)
                // 缓动
                transition all 0.3s linear
                transform rotate(0)
            &.move-enter-active,&.move-leave-active
                transition: all 0.3s linear
            &.move-enter,&.move-leave-active
                opacity 0
                transform translate3d(24px,0,0)// 减号移动24px
                .inner
                    transform rotate(180deg)
        .cart-count
            display inline-block
            vertical-align top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147,153,159)
        .cart-add
            display inline-block
            padding 6px
            font-size 24px
            line-height 24px
            color rgb(0,160,220)
</style>