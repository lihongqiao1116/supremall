
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart({state, commit}, payload) {
    return new Promise((resolve, reject) => {
      //payload为新添加的商品
      
      //  查找之前数组中是否有该商品 一：
      // let oldProduct = null
      // for(let item of state.cartList) {
      //   if(item.iid = payload.iid) {
      //     oldProduct = item
      //   }
      // }

      //  查找之前数组中是否有该商品 二：
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        // oldProduct.count += 1
        commit(ADD_COUNTER, oldProduct)
        resolve('商品数量加一')
      } else {
        payload.count += 1
        // state.cartList.push(payload)
        commit(ADD_TO_CART, payload)
        resolve('添加了新商品')
      }
    })
  }
}