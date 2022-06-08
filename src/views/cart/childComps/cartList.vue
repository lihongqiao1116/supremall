<template>
  <div class="list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
              v-for="(item, index) in cartList" 
              :key='index' 
              :item-info='item'/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import cartListItem from './cartListItem'

  export default {
    name: 'cartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      cartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }

  }
</script>

<style scoped>
.list {
  height: calc(100% - 44px - 49px - 40px);
  margin-top: 44px;
}
.content {
  height: 100%
}
</style>