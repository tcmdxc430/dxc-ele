<template>
    <div class="seller" ref="seller">
        <!-- 商家简介 -->
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remake">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="(item,index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../../components/star/star'
import split from '../../components/split/split'
import BScroll from 'better-scroll'
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
        
        }
    },
    // watch: {
    //     'seller'() {
    //         console.log('watch')
    //         this._initScroll()
    //     }
    // },
    // dom渲染前执行
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    // dom渲染完成后执行
    mounted() {
        this.scroll = new BScroll(this.$refs.seller,{
            click: true
        })
        // console.log('ready')
        // this._initScroll()
    },
    methods: {
        // _initScroll() {
        //     if (!this.scroll) {
        //         this.scroll = new BScroll(this.$refs.seller,{
        //             click: true
        //         })
        //     } else {
        //         alert(33)
        //         this.scroll.refresh()
        //     }
        // }
    },
    components: {
        star,
        split
    }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
   .seller
       position absolute
       top 174px // 这是header的预留高度
       bottom 0
       width 100%
       left 0
       overflow hidden
       .overview
           padding 4.8vw
           .title
               margin-bottom 8px
               line-height 14px
               color rgb(7,17,27)
               font-size 3.7vw
            .desc
                padding-bottom 18px
                font-size 0
                border-1px(rgba(7,17,27,.1))
                .star
                    display inline-block
                    vertical-align top
                    margin-right 2.7vw
                .text
                    display inline-block
                    vertical-align top
                    margin-right 3.2vw
                    font-size 2.7vw
                    color rgb(77,85,93)
                    line-height 18px
            .remake
                display flex
                padding-top 18px
                .block
                    flex 1
                    text-align center
                    border-right 1px solid rgba(7,17,27,.1)
                    &:last-child
                        border none
                    h2
                        margin-bottom 4px
                        line-height 10px
                        font-size 2.7vw
                        color rgb(147,153,159)
                    .content
                        line-height 24px
                        font-size 2.7vw
                        color rgb(7,17,27)
                        .stress
                            font-size 6.4vw
        .bulletin
            padding 4.8vw 4.8vw 0 4.8vw
            .title
                margin-bottom 8px
                line-height 14px
                color rgb(7,17,27)
                font-size 3.7vw
            .content-wrapper
                padding 0 3.2vw 4.5vw 3.2vw
                border-1px(rgba(7,17,27,.1))
                .content
                    line-height 24px
                    font-size 3.2vw
                    color rgb(240,20,20)
            .supports
                .support-item
                    padding 4.3vw 3.2vw
                    font-size 0
                    border-1px(rgba(7,17,27,.1))
                    &:last-child
                        border-none()
                .icon
                    display: inline-block
                    width: 16px
                    height: 16px
                    vertical-align: top
                    margin-right: 6px
                    background-size: 16px 16px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_4')
                    &.discount
                        bg-image('discount_4')
                    &.guarantee
                        bg-image('guarantee_4')
                    &.invoice
                        bg-image('invoice_4')
                    &.special
                        bg-image('special_4')
                .text
                    line-height: 16px
                    font-size: 12px
                    color: rgb(7, 17, 27)

</style>