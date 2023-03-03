<!--
 * @Descripttion: 
 * @Author: xianghaifeng
 * @Date: 2023-03-03 09:49:07
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 16:02:42
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h2>num:{{ num }}</h2>
    <h2>info:{{ $store.state.info }}</h2>
    <h2>doubleNum:{{ $store.getters.doubleNum }}</h2>
    <button @click="addNum">num+1</button>
    <button @click="getNum">getNum</button>
    <button @click="goPage">手动跳转页面</button>
    <router-view />
    <router-link to="/">home</router-link>|
    <router-link to="/about">about</router-link>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import {mapState} from '@/store/myVuex'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  computed:{
    ...mapState(['num'])
  },
  mounted(){
    console.log(this)
  },
  methods:{
    addNum(){
      this.$store.commit('changeNum',1)
    },
    getNum(){
      this.$store.dispatch('getNum',20)
    },
    goPage(){
      this.$router.push('/about')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
