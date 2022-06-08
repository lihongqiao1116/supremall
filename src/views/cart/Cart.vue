<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar  class="nav">
      <div slot='center'>购物街({{length}})</div>
    </nav-bar>
    <!-- 商品列表展示 -->
    <cart-list/>
    <cart-bottom-bar/>
  </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/cartList'
import cartBottomBar from './childComps/cartBottomBar'

import { mapGetters } from 'vuex'


  export default {
    name: "Cart",
    components: {
      NavBar,
      cartList,
      cartBottomBar
    },
    computed: {
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength'
      })
    }
    
  }
</script>

<style scoped>
.nav {
  background-color: var(--color-tint);
  color: white;
}

.cart {
  height: 100vh;
}
</style>
