export default {
	// 开启命名空间
	namespaced: true,

	// state 数据
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync("userAddress") || "{}"),
		token: uni.getStorageSync("token") || "",
		userInfo: JSON.parse(uni.getStorageSync("userInfo") || "{}")
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
		// 存储用户信息
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync('userinfo', JSON.stringify(userInfo))
		},
		saveToken(state, token) {
			state.token = token
			uni.setStorageSync("token", token)
		}
	}
}
