<template>
  <div>
    <swiper>
      <swiper-item  v-for="item in banner" :key=item.value>
        <a :href="item.link">
          <img :src="item.image" alt="" @load="ImageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name:'homeSwiper',
    props:{
      banner:{
        type: Array,
        default(){
          return []
        }
      },
    },
    data(){
      return {
        isLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods: {
      ImageLoad(){
        if(!this.isLoad) {
          this.$emit('SwiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style lang="css" scoped>

</style>


