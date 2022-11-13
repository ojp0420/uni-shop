import {
	BASE_URL
} from '@/env.js'


// 全局请求封装
export default ({
	url,
	method,
	data
}) => {

	uni.showLoading({
		title: "加载中"
	});
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: method || 'get',
			// header: {
			// 	token: token
			// },
			data: data || {},
			success(res) {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(res.errMsg);
				}

			},
			fail(err) {
				reject(err);
				uni.showModal({
					content: err.errMsg,
					showCancel: false
				})
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};
