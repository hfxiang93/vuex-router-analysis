/*
 * @Descripttion: 简易版vueRouter
 * @Author: xianghaifeng
 * @Date: 2023-03-03 14:57:23
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 16:14:12
 */
let _Vue = null
class MyVueRouter {
    constructor(options) {
        this.options = options
        // 存储路由和组件的对应关系
        this.routeMap = {}
        // 利用vue的响应式去动态更新视图组件
        this.app = new _Vue({
            data: {
                curRoute: ''
            }
        })
    }
    static install(Vue) {
        _Vue = Vue
        Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }
    init() {
        // 初始化路由组件对应关系
        this.createRouteMap()
        // 初始化路由组件 RouterView和RouterLink
        this.initComponent()
        // 监听hashchange事件
        this.listenerChange()
    }
    createRouteMap() {
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }
    initComponent() {
        _Vue.component('RouterView', {
            render: (h) => {
                let component = this.routeMap[this.app.curRoute]
                return h(component)
            }
        })
        _Vue.component('RouterLink', {
            props: {
                to: String
            },
            render(h) {
                const options = {
                    attrs: {
                        href: `#${this.to}`
                    }
                }
                return h('a', options, this.$slots.default)
            }
        })
    }
    listenerChange() {
        // 初始化页面时监听
        window.addEventListener('load', () => {
            this.app.curRoute = window.location.hash.slice(1) || '/'
        })
        // hash发生变化时
        window.addEventListener('hashchange', (e) => {
            console.log(e)
            let hashPath = new URL(e.newURL).hash
            hashPath = hashPath[0] === '#' ? hashPath.substring(1) : '/'
            this.app.curRoute = hashPath
        })
    }
    // this.$router.push()
    push(path) {
        // 如果routeMap中有这个地址，则进行跳转
        if (Object.keys(this.routeMap).indexOf(path) > 0) {
            this.app.curRoute = path
            window.location.hash = `#${path}`
        } else {
            console.error(`not found page ${path}`)
        }
    }
}
export default MyVueRouter