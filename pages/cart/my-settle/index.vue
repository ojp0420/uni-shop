<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio">
			<radio color="#C00000" :checked="isAllSelect" @click="onAllSelecState()" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement()">结算(0)</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {}
		},
		computed: {
			...mapGetters(['isAllSelect', 'checkedGoodsAmount'])
		},
		methods: {
			...mapMutations('cart', ['changeAllSelecState']),
			onAllSelecState() {
				this.changeAllSelecState(!this.isAllSelect)
			},
			settlement(){
				this.$emit('settlement')
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
