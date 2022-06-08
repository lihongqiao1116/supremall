<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control :title="['流行', '新款', '精选']" 
                    @tabClick='tabClick'
                    ref='tabControl1' 
                    class='tab-control'
                    v-show="isTabFixed"/>
    <scroll class="content" 
            ref='scroll' 
            :probeType="3" 
            :pullUpLoad="true" 
            @scroll='contentScroll'
            @pullingUp='loadMore'
            >
      <home-swiper :banner=banner @SwiperImageLoad="SwiperImageLoad"></home-swiper>
      <recommend-view :recommend=recommend></recommend-view>
      <popular-view/>
      <tab-control :title="['流行', '新款', '精选']" 
                    @tabClick='tabClick'
                    ref='tabControl2'/>
      <goods-list :goods="showGoods"/>
      
    </scroll>
    <back-top @click.native='backClick' v-show="isShowBackUp"/>
      
    
  </div>
</template>

<script>
//公共的组件
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList'

//home组件自身内容
import homeSwiper from './childComps/homeSwiper'
import recommendView from './childComps/recommendView'
import PopularView from './childComps/popularView.vue'

//请求数据
import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import Scroll from 'components/common/scroll/Scroll.vue'

//工具函数
import { itemListenerMixin, backTopMixin } from 'common/mixin'
  export default {
    name: "Home",
    data(){
      return{
        banner:[],
        recommend:[],
        goods:{
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]}
        },
        currentType:'pop',
        tabOffSetTop: 0,
        isTabFixed: false,
        saveY: 0
      }   
    },
    mixins: [itemListenerMixin, backTopMixin],
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    components: {
      NavBar,
      TabControl,
      GoodsList,
      homeSwiper,
      recommendView,
      PopularView,
      Scroll,
    },
    created() {
      //请求轮播图和推荐数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      
    },
    mounted(){
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0) 
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener )
      
    },
    methods:{
      /**事件监听相关的方法 */
      tabClick(index){
        // console.log(index)
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position){
        //控制backtop的显示与隐藏
        this.isShowBackUp = (-position.y) > 1000
        //控制tabcontrol的吸顶效果
        this.isTabFixed = (-position.y) > this.tabOffSetTop
      },
      //上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      //监听轮播图图片加载完成，拿到准确的offset
      SwiperImageLoad() {
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffSetTop)
      },
      /**网络请求相关的方法 */
      getHomeMultidata(){
         getHomeMultidata().then(res => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res =>{
        // console.log(res)
        this.goods[type].list.push(...res.data.list)//扩展运算符
        this.goods[type].page += 1
      })
      }
    }
  }
</script>

<style lang="css" scoped>
  #home {
    padding-top: 44px;
    height: 100vh;/**viewport height*/
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }



</style>
