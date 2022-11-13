export default {
	namespaced: true, // 为当前模块开启命名空间
	state: {
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync("cart") || "[]")
	},
	actions: {},
	mutations: {
		setStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart) || '[]')
		},
		// 添加购物车
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// 购物车没有这件商品，则直接push,否则只更新数量
			findResult ? findResult.goods_count++ : state.cart.push(goods)

			// 将购物车数据持久化存储到本地
			this.commit('cart/setStorage')
		},
		// 修改购商品选中状态
		changeGoodsSelect(state, data) {
			state.cart.forEach(item => {
				if (item.goods_id === data.goods_id) {
					item.goods_state = !item.goods_state
				}
			})
			this.commit('cart/setStorage')
		},
		// 商品数量改变
		changeGoodsNum(state, data) {
			state.cart.forEach(item => {
				if (item.goods_id === data.goods_id) {
					item.goods_count = data.newGoods_count
				}
			})
			this.commit('cart/setStorage')
		},
		// 删除购物车数据
		removeCartData(state, data) {
			state.cart.forEach((item, index) => {
				if (item.goods_id === data.goods_id) {
					state.cart.splice(index, 1)
				}
			})
			this.commit('cart/setStorage')
		},
		changeAllSelecState(state, selectState) {
			state.cart.forEach((item, index) => {
				item.goods_state = selectState
			})
			this.commit('cart/setStorage')
		}
	},

}
