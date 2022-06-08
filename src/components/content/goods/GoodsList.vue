<template>
  <div class="goods">
  <goods-item v-for="item in goods" :key="item.value" :goodsItem="item"/>
  </div>
</template>

<script>

import GoodsItem from './GoodsItem.vue'
  export default {
    name: 'GoodsList',
    components:{
      GoodsItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
  }
</style>