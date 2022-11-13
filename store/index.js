import Vue from 'vue'
import Vuex from "vuex"
import getters from "./getters.js"
import cart from "./modules/cart.js"
import user from "./modules/user.js"

// 将vuex安装为vue插件
Vue.use(Vuex)

// 创建store的实例对象
const store = new Vuex.Store({
	modules: {
		cart,
		user
	},
	getters
})

export default store
