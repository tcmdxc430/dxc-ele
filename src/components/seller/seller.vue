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
                <!-- 收藏按钮 -->
                <div class="favorite" @click="toogleFavorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <!-- 活动与公告 -->
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
            <split></split>
            <!-- 图片滚动 -->
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <!-- 底部文字信息 -->
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../../components/star/star'
import split from '../../components/split/split'
import BScroll from 'better-scroll'
import {saveToLocal,loadFromLocal} from '../../common/js/store'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            // 从本地存储读取favorite状态
            favorite: (() => {
                return loadFromLocal(this.seller.id,'favorite',false)
            })()
        }
    },
    computed: {
        favoriteText() {
            return this.favorite?'已收藏':'收藏'
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
        this.$nextTick(() => {
        
        this._initPics();
      });
        
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
        _initPics() {
            if(this.seller.pics) {
            let picWidth = 120
            let margin = 6
            // 计算总图片宽度
            let width = (picWidth+margin)*this.seller.pics.length-margin
            this.$refs.picList.style.width = width + 'px'
            this.$nextTick(() => {
                this.picScroll = new BScroll(this.$refs.picWrapper,{
                    scrollX: true,
                    // 横向滚动同时也可以纵向
                    eventPassrhrough: 'vertical'
                })
            })
        }
        },
        // 收藏
        toogleFavorite() {
            this.favorite = !this.favorite
            console.log(this.seller.id)
            saveToLocal(this.seller.id,'favorite',this.favorite)
        }
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
           position relative
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
            .favorite
                position absolute
                width 13vw
                right 11px
                top 4.8vw
                text-align center
                .icon-favorite
                    display block
                    color #d4d6d9
                    line-height 24px
                    font-size 6.4vw
                    margin-bottom 4px
                    &.active
                        color rgb(240,20,20)
                .text
                    line-height 10px
                    font-size 2.7vw
                    color rgb(77,85,93)
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
        .pics
            padding 4.8vw
            .title
                margin-bottom 12px
                line-height 14px
                color rgb(7,17,27)
                font-size 3.7vw
            .pic-wrapper
                width 100%
                overflow hidden
                white-space nowrap //不折行
                .pic-list
                    font-size 0
                    .pic-item
                        display inline-block
                        margin-right 1.6vw
                        width 120px
                        height 90px
                        &:last-child
                            margin 0
        .info
            padding 4.8vw 4.8vw 0 4.8vw
            .title
                padding-bottom 12px
                line-height 14px
                color rgb(7,17,27)
                font-size 3.7vw
                border-1px(rgba(7,17,27,.2))
            .info-item
                padding 4.5vw 3.2vw
                line-height 16px
                border-1px(rgba(7,17,27,.1))
                color rgb(7,17,27)
                font-size 3.2vw
                &:last-child
                    border-none()

</style>