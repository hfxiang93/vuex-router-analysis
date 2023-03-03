/*
 * @Descripttion: 
 * @Author: xianghaifeng
 * @Date: 2023-03-03 09:51:24
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 11:39:29
 */
import Vuex, { createStore } from "./myVuex"
import Vue from "vue"
Vue.use(Vuex)
export default createStore({
    state: {
        num: 1,
        info: 'ddsss'
    },
    getters: {
        doubleNum: (state) => {
            return state.num * 2
        }
    },
    mutations: {
        changeNum(state, payload = 0) {
            state.num += payload
        }
    },
    actions: {
        getNum({ commit }, payload) {
            setTimeout(() => {
                commit('changeNum', payload)
            }, 1000)
        }
    }
})