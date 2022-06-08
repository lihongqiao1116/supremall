<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.value" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

  export default {
    name:'RecommendView',
    props: {
      recommend:{
        type:Array,
        default(){
          return []
        }
      }
    }

  }
</script>

<style lang="css" scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 7px;
  }
</style>