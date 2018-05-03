<template>
    <div class="ratings" ref="ratings" >
        <!-- 如果ratings-content超出ratings会撑开滚动 -->
        <div class="ratings-content">
            <!-- 商家概况 -->
            <div class="overview">
                <div class="overwiew-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边单家{{seller.rankRate}}%</div>
                </div>
                <div class="overwiew-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryPrice}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
                        <!-- 头像 -->
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                       
                        <div class="content">
                            <!-- 用户名 -->
                            <h1 class="name">{{rating.username}}</h1>
                            <!-- 星级 -->
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <!-- 送达时间 -->
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
                            </div>
                            <!-- 内容 -->
                            <p class="text">{{rating.text}}</p>
                            <!-- 菜品 -->
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span v-for="item in rating.recommend" class="item">{{item}}</span>
                            </div>
                            <!-- 评价时间 -->
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../../components/star/star'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import Vue from 'vue'
import axios from 'axios'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date'


    const ALL = 2;
     export default{
         props: {
             seller: {
                 type: Object
             }
         },
         data() {
            return {
                ratings: [],
                selectType: ALL,
                onlyContent: false
            };
        },
         created() {
             let self = this
             axios({
                    method:"get",
                    url:'/api/ratings',
                    data:{}
                }).then(function(res){
                    res = res.data
                    if (res.errno === 0) {
                        self.ratings = res.data
                        self.$nextTick(() => {
                            self.scroll = new BScroll(self.$refs.ratings,{
                            click: true
                        })
                        })         
                    }
                }).catch(function(err){
                    console.log(err);
                });

            // axios.get(url,{},config)
            //     .then(function(res){
            //         alert(66)
            //         console.log(res);
            //     })
            //     .catch(function(err){
            //         console.log(err);
            //     })

            // this.$http.get('/api/ratings').then((response) => {
            //     response = response.body
            //     if(response.errno === 0) {
            //         this.ratings = response.data
            //         console.log(this.ratings)
            //     }
            // })
         },
         methods: {
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
             star,
             split,
             ratingselect
         }
    }
</script>

<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
   .ratings
       position absolute
       top 174px // 这是header的预留高度
       bottom 0
       width 100%
       left 0
       overflow hidden
       .overview
           display flex
           padding 4.8vw 0
           .overwiew-left
               flex 0 0 36.5vw
               width 36.5vw
               border-right 1px solid rgba(7,17,27,.1)
               text-align center
               padding 1.6vw 0
               .score
                   line-height 28px
                   font-size 6.4vw
                   color rgb(255,153,0)
                   margin-bottom 1.6vw
               .title
                   line-height 12px
                   font-size 12px
                   color rgb(7,17,27)
                   margin-bottom 8px
                .rank
                    line-height 10px
                    font-size 10px
                    color rgb(147,153,159)  
           .overwiew-right
               flex 1
               padding 1.6vw 0 1.6vw 6.4vw
               .score-wrapper
                   margin-bottom 8px
                   font-size 0
                   .title
                       display inline-block
                       vertical-align top
                       font-size 3.2vw
                       color rgb(7,17,27)
                       line-height 18px
                    .star
                        display inline-block
                        vertical-align top
                        margin 0 3.2vw
                    .score
                        display inline-block
                        vertical-align top
                        font-size 3.2vw
                        color rgb(255,153,0)
                        line-height 18px
                .delivery-wrapper
                    font-size 0
                    .title
                       font-size 3.2vw
                       color rgb(7,17,27)
                       line-height 18px
                    .delivery
                        font-size 3.2vw
                        color rgb(147,153,159)
                        margin-left 3.2vw
        .rating-wrapper
            padding 0 18px
            .rating-item
                display flex
                padding 18px 0
                border-1px(rgba(7,17,27,.1))
                .avatar
                    flex 0 0 28px // 不放大不缩小固定宽高
                    width 28px
                    margin-right 12px
                    img
                        border-radius 50%
                .content
                    flex 1
                    position relative
                    .name
                        line-height 3.2vw
                        font-size 2.66vw
                        color rgb(7,17,27)
                        margin-bottom 4px
                    .star-wrapper
                        margin-bottom 6px
                        font-size 0
                        .star
                            display inline-block
                            vertical-align top
                            margin-right 1.6vw
                        .delivery
                            display inline-block
                            vertical-align top
                            line-height 3.2vw
                            font-size 2.66vw
                            color rgb(147,153,159)
                    .text
                        line-height 18px
                        color rgb(7,17,27)
                        font-size 3.2vw
                        margin-bottom 8px
                    .recommend
                        line-height 16px
                        font-size 0
                        .icon-thumb_up,.item
                            display inline-block
                            margin 0 2.1vw 1vw 0
                            font-size 2.4vw
                        .icon-thumb_up
                            color rgb(0,160,220)
                        .item
                            padding 0 1.6vw
                            border 1px solid rgba(7,17,27,.1)
                            border-radius 1px
                            color rgb(147,153,159)
                            background #ffffff
                    .time
                        position absolute
                        top 0
                        right 0
                        line-height 12px
                        font-size 3vw
                        color rgb(147,153,159)


</style>