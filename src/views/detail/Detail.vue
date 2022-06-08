<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick='titleClick'/>
  <scroll class="content" 
          ref="scroll" 
          @scroll="contentScroll" 
          :probe-type=3>
    <!-- 属性值为topImages  传入值为top-images -->
    <detail-swiper :top-images='topImages'/>
    <detail-base-info :goods='goods'/>
    <detail-shop-info :shop='shop'/>
    <detail-goods-info :detail-info='detailInfo' @detailImageLoad='detailImageLoad'/>
    <detail-param-info ref='params' :param-info='paramInfo'/>
    <detail-comment-info ref='comment' :comment-info='commentInfo'/>
    <goods-list ref='recommend' :goods='recommends'/>
    
  </scroll>
  <back-top @click.native='backClick' v-show="isShowBackUp"/>
  <detail-bottom-bar @addCart='addToCart'/>
</div>
</template>

<script>
import detailNavBar from './childComps/detailNavBar'
import detailSwiper from './childComps/detailSwiper'
import detailBaseInfo from './childComps/detailBaseInfo'
import detailShopInfo from './childComps/detailShopInfo'
import detailGoodsInfo from './childComps/detailGoodsInfo'
import detailParamInfo from './childComps/detailParamInfo'
import detailCommentInfo from './childComps/detailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import detailBottomBar from './childComps/detailBottomBar'


import{ getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'

import Scroll from 'components/common/scroll/Scroll'

import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { debounce } from 'common/utils'

  export default {
    name:'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      detailParamInfo,
      detailCommentInfo,
      GoodsList,
      detailBottomBar,
      Scroll
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        //获取轮播图片
        this.topImages = data.itemInfo.topImages
        //获取图片下方详细信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //获取商家信息
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6、获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      }),
      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      //进行防抖操作
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 100)
      
    },
    mounted(){
      
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      detailImageLoad() {
        this.newRefresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        const positionY = -position.y
        this.isShowBackUp = (-position.y) > 1000
      },
      addToCart() {
        //1、获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.count = 0
        //2、将商品添加到购物车里(vuex)
        this.$store.dispatch('addCart', product).then(res => {
          // console.log(this.$toast)
          this.$toast.show(res, 1500)
        })
      }

    }

  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);

}
</style>