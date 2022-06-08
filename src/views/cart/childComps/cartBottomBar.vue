<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
            class="button" 
            :is-checked='isSelectAll'
            @click.native='checkClick'/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'

  export default {
    name: 'cartBottomBar',
    components: {
      CheckButton
    }, 
    methods: {
      checkClick() {
        if(this.isSelectAll) {//全部选中
          this.cartList.forEach(item => item.checked = false);
        } else {
          //部分选中或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择要购买的商品', 1500)
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preVal, item) => {
          return preVal + item.price * item.count
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false
        //1、使用filter
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        
        //2、使用find
        return !(this.cartList.find(item => !item.checked))
        
        //3、普通遍历
        // for(let item of this.cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        // }
        // return true

      }
    }

  }
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}

.button {
  width: 18px;
  height: 18px;
  display: inline;
  margin-right: 5px;
}

.check-content {
  margin-left: 10px;
  width: 60px;
}

.price {
  margin-left: 15px;
  flex: 1;
}

.calculate {
  width: 90px;
}
</style>