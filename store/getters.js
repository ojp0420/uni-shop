export default {
	count: state => {
		let c = 0
		// 循环统计商品的数量，累加到变量 c 
		state.cart.cart.forEach(goods => c += goods.goods_count)
		return c
	},
	cartData: state => state.cart.cart,
	userAddress: state => state.user.address,
	isAllSelect: state => !state.cart.cart.some(item => item.goods_state === false),
	// 已勾选的商品的总价
	checkedGoodsAmount(state) {
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品
		// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
		// reduce() 的返回值就是已勾选的商品的总价
		// 最后调用 toFixed(2) 方法，保留两位小数
		return state.cart.cart.filter(x => x.goods_state)
			.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
			.toFixed(2)
	}
}
