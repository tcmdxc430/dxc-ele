<template>
<!-- 商品详情 -->
<transition name="move">
    <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
            <!-- 头图 -->
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <!-- 描述文字 -->
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <!-- cartcontrol组件以及购物车按钮 -->
                <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
                <transition name="fade">
                <div class="buy" @click.stop.prevent="addFrist" v-show="!food.count || food.count===0">加入购物车</div>
                </transition>
            </div>  
            <split v-show="food.info"></split>
            <div class="info" v-show="food.info">
                <h1 class="title">商铺信息</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                <!-- 评价列表 -->
                <div class="rating-wrapper">
                    <!-- 存在数据数组且不为0 -->
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                            <!-- 用户信息 -->
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img :src="rating.avatar" class="avatar" width="12" height="12">
                            </div>
                            <!-- 日期 -->
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <!-- 评论内容 -->
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <!-- 无数据时 -->
                    <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
                </div>
            </div>
        </div> 
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import Vue from 'vue'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;


     export default {
         props: {
             food: {
                 type: Object
             }
         },
         data() {
             return {
                 showFlag: false,
                 selectType: ALL,
                 onlyContent: true,
                 desc: {
                     all: '全部',
                     positive: '推荐',
                     negative: '吐槽'
                 }
             }
         },
         methods: {
             // 给父组件goods调用
             show() {
                this.showFlag = true
                this.selectType = ALL
                this.onlyContent = false
                this.$nextTick(() => {
                    if(!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food,{
                            click: true
                        })
                    } else {
                        // 如果页面已经添加scroll 重新计算位置
                        this.scroll.refresh()
                    }
                })
             },
             hide() {
                this.showFlag = false
             },
             addFrist(event) {
                 console.log(event)
                 console.log(this.food)
                 // 派发事件,自定义add事件 包含event.target
                //  this.$emit('add', event.target)
                this.$parent._drop(event.target)
                 // food集合中添加一个字段count值为1
                 Vue.set(this.food,'count',1)
             },
             addFood(target) {
                 this.$parent._drop(target)
                // this.$emit('add', target);
            },
            needShow(type,text) {
                // 判断没有内容时返回false
                if(this.onlyContent && !text) {
                    return false
                }
                if(this.selectType === ALL) {
                    return true
                }else {
                    return type === this.selectType
                }
            },
            // 状态传递给父组件
            selectRating(type) {
                this.selectType = type;
                // 异步更新dom和滚动条
                this.$nextTick(() => {
                this.scroll.refresh();
                });
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                this.scroll.refresh();
                });
            }
         },
         filters: {
             formatDate(time) {
                 let date = new Date(time)
                 return formatDate(date,'yyyy-MM-dd hh:mm')
                
             }
         },
         components: {
             cartcontrol,
             split,
             ratingselect
         }
    }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
    .food
        position fixed
        top 0
        left 0
        bottom 48px
        z-index 30  //小于弹出层
        width 100%
        background #fff
        transform: translate3d(0, 0, 0)
        &.move-enter-active, &.move-leave-active
            transition: all 0.2s linear
        &.move-enter, &.move-leave-active
            transform: translate3d(100%, 0, 0)  //x轴从右到左
        .image-header
            position relative
            width 100%
            height 0
            padding-top 100% // 即与宽度保持一致的高度 用以避免页面抖动
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back
                position absolute
                top 10px
                left 0
                .icon-arrow_lift
                    display block
                    padding 10px
                    font-size 20px
                    color #fff
        .content
            position relative
            padding 18px
            .title
                line-height 14px
                margin-bottom 8px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .detail
                margin-bottom 18px
                line-height 10px
                font-size 0
                height 10px
                .sell-count,.rating
                    font-size 10px
                    color rgb(147,153,159)
                .sell-count
                    margin-right 12px
            .price
                font-weight 700
                line-height 24px
                .now
                    margin-right 8px
                    font-size 14px
                    color rgb(240,20,20)
                .old
                    text-decoration line-through //字中划线
                    font-size 10px
                    color rgb(147,153,159)
        
            .cartcontrol-wrapper
                position absolute
                right 12px
                bottom 12px
            .buy
                position absolute
                right 18px
                bottom 18px
                z-index 10
                height 24px
                line-height 24px
                padding 0 12px
                box-sizing border-box
                font-size 10px
                border-radius 12px
                color #ffffff
                background rgb(0,160,220)
                opacity: 1
                &.fade-enter-active, &.fade-leave-active
                    transition: all 0.2s
                &.fade-enter, &.fade-leave-active
                    opacity: 0
                    z-index: -1
        .info
            padding 18px
            .title
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7,17,27)
            .text
                line-height 24px
                color rgb(77,85,93)
                padding 0 8px
                font-size 12px
        .rating
            padding-top 18px
            .title
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7,17,27)
            .rating-wrapper
                padding 0 18px
                .rating-item
                    position relative
                    padding 16px 0
                    border-1px(rgba(7,17,27,.1))
                    .user
                        position absolute
                        right 0
                        top 16px
                        font-size 0
                        line-height 12px
                        .name
                            display inline-block
                            vertical-align top
                            font-size 10px
                            color rgb(147,153,159)
                            margin-right 6px
                        .avatar
                            border-radius 50%
                    .time
                        margin-bottom 6px
                        line-height 12px
                        font-size 10px
                        color rgb(147,153,159)
                    .text
                        line-height 16px
                        font-size 12px
                        color rgb(7,17,27)
                        .icon-thumb_up,.icon-thumb_down
                            line-height 16px
                            margin-right 4px
                            font-size 12px
                        .icon-thumb_up
                            color rgb(0,160,220)
                        .icon-thumb_down
                            color rgb(147,153,159)
                .no-rating
                    padding 16px 0
                    font-size 12px
                    color rgb(147,153,159)


</style>
