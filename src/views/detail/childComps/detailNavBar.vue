<template>
  <div>
    <nav-bar class="navbar">
      <div slot='left' class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
        class="title-item" 
        :key=item.value
        :class='{active: index === currentIndex}'
        @click='titleClick(index)'
        >
        {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
  export default {
    name:'detailNavBar',
    data(){
      return {
          titles:['商品','参数','评论','推荐'],
          currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.navbar {
  background-color: #fff;
}
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
  /* border-bottom: ; */
}
.back img {
  margin-top: 10px;


}
</style>