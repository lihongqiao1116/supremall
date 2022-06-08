<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="item.value"
     class="tab-control-item" :class="{active:index === currentIndex}"
     @click='spanClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    props: {
      title:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods:{
      spanClick(index){
        this.currentIndex = index
        //子传父：自定义事件
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style lang="css" scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);

  }
  .tab-control-item span {
    padding: 5px;
  }
</style>