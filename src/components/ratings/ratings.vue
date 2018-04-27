<template>
    <div class="ratings">
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
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../../components/star/star'
     export default{
         props: {
             seller: {
                 type: Object
             }
         },
         components: {
             star
         }
    }
</script>

<style lang="stylus" type="stylesheet/stylus">
   .ratings
       position absolute
       top 174px // 这是header的预留高度
       bottom 0
       width 100%
       left 0
       overflow hidden
       .overview
           display flex
           padding 18px 0
           .overwiew-left
               flex 0 0 137px
               width 137px
               border-right 1px solid rgba(7,17,27,.1)
               text-align center
               padding 6px 0
               .score
                   line-height 28px
                   font-size 24px
                   color rgb(255,153,0)
                   margin-bottom 6px
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
               padding-left 24px
               .score-wrapper
                   margin-bottom 8px
                   font-size 0
                   .title
                       display inline-block
                       vertical-align top
                       font-size 12px
                       color rgb(7,17,27)
                       line-height 18px
                    .star
                        display inline-block
                        vertical-align top
                        margin 0 12px
                    .score
                        display inline-block
                        vertical-align top
                        font-size 12px
                        color rgb(255,153,0)
                        line-height 18px
                .delivery-wrapper
                    font-size 0
                    .title
                       font-size 12px
                       color rgb(7,17,27)
                       line-height 18px
                    .delivery
                        font-size 12px
                        color rgb(147,153,159) 
                        margin-left 12px

</style>