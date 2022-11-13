export default {
	// 开启命名空间
	namespaced: true,

	// state 数据
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync("userAddress") || "{}"),
	}),

	// 方法
	mutations: {
		setStorage(state) {
			uni.setStorageSync('userAddress', JSON.stringify(state.address) || "{}")
		},
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			this.commit('user/setStorage')
		},
	}
}
