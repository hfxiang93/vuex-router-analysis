/*
 * @Descripttion: 
 * @Author: xianghaifeng
 * @Date: 2023-03-03 09:49:07
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 15:35:31
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
