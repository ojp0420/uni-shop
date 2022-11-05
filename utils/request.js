import {
	BASE_URL
} from '@/env.js'


// 全局请求封装
export default ({
	url,
	method,
	params
}) => {
	// const token = uni.getStorageSync('token');
	uni.showLoading({
		title: "加载中"
	});
	// if (!token) {
	// 	// 执行没有登录的逻辑

	// 	return;
	// }
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: method || 'get',
			// header: {
			// 	token: token
			// },
			data: params || {},
			success(res) {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(res.errMsg);
				}

			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};
