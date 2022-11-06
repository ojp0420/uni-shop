<template>
	<view class="my-search-container" :style="{'background-color': bgColor}" @click="onClickEvent()">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgColor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {

			};
		},
		methods:{
			onClickEvent(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		background-color: #c00000;
		height: 100rpx;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>
