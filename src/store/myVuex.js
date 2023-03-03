/*
 * @Descripttion: 简易版的vuex
 * @Author: xianghaifeng
 * @Date: 2023-03-03 09:51:36
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 14:53:13
 */
let _Vue = null

function install(Vue) {
    _Vue = Vue
    /**
     *利用Vue.mixin（）方法混入，
     *在beforeCreate生命周期中将Vue（{store}）传入的store设置到vue的原型上
     *子组件从父组件上引用$store,层层嵌套进行设置，
     *在任意一级组件中都能用this.$store找到传入的那个store对象
     */
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
                console.log(this)
            } else if (this.$options?.parent?.$store) {
                Vue.prototype.$store = this.$options.parent.$store
            }
        }
    })
}
class MyStore {
    constructor(options) {
        // 接收createStore（{}）传进来的参数
        this.options = options
        // 利用vue的响应式做双向绑定
        this.state = new _Vue({
            data: { ...options.state }
        })
        this.getters = {}
        // 初始化getters
        this.initGetters(options, this.state)
    }
    initGetters(options, state) {
        // 遍历options中的getters的key，劫持每个getter
        Object.keys(this.options.getters).forEach(getterKey => {
            Object.defineProperty(this.getters, getterKey, {
                get() {
                    return options.getters[getterKey](state)
                }
            })
        })
    }
    commit(type, data) {
        console.log('commitType:', type, data)
        console.log('this', this)
        let curMethod = this.options.mutations[type]
        if (curMethod) {
            // 在执行commit方法的时候，把state当参数穿进去，这也是为什commit的第一个参数是state的原因
            curMethod(this.state, data)
        } else {
            console.error(`error:Mutations不存在type[${type}]方法`)
        }
    }
    dispatch(type, data) {
        console.log('actionType:', type, data)
        console.log('this', this)
        let curMethod = this.options.actions[type]
        if (curMethod) {
            curMethod({
                state: this.state,
                getters: this.getters,
                commit: this.commit.bind(this)
            }, data)
        } else {
            console.error(`error:actions不存在type[${type}]方法`)
        }
    }
}
// ...mapState(["count", "info"]), // { count: () => this.$store.state.count}
function mapState(array) {
    // 其实就是返回 this.$store.state[key]
    let results = {}
    array.forEach(item => {
        results[item] = function () {
            return this.$store.state[item]
        }
    })
    console.log('results:', results)
    return results
}
function createStore(options) {
    return new MyStore(options)
}
export {
    MyStore,
    createStore, mapState, install
}
export default {
    MyStore,
    createStore, mapState, install
}