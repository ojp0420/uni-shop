<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getuserinfo">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	import {
		userLogin
	} from "@/api/app.js"
	import {
		randomInt
	} from "crypto"
	export default {
		methods: {
			...mapMutations('user', ['updateUserInfo', 'saveToken']),
			async getuserinfo(e) {
				// 判断是否获取用户信息成功
				if (e.detail.errMsg !== "getUserInfo:ok") return uni.showToast({
					title: "登录失败",
					icon: "error"
				})
				this.updateUserInfo(e.detail.userInfo)
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
				const info = e.detail
				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				let {
					message
				} = await userLogin(query)
				message = '111111111111111'
				this.saveToken(message)

			}

		}
	}
</script>

<style lang="scss" scoped>
	page,
	.my-container {
		height: 100%;
	}

	.login-container {
		// 登录盒子的样式
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
