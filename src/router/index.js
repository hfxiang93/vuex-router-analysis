/*
 * @Descripttion: 
 * @Author: xianghaifeng
 * @Date: 2023-03-03 14:57:10
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-03 14:58:59
 */
import Vue from "vue";
// import VueRouter from "vue-router";
import VueRouter from "./myVueRouter";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;