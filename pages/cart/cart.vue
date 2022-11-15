<template>
	<view id="root">
		<block v-if="cartData.length !==0">
			<view class="address">
				<myAddress />
				<view class="cart-title">
					<uni-icons type="shop" size="30"></uni-icons>
					<text class="title">购物车</text>
				</view>
			</view>
			<uni-swipe-action>
				<block v-for="item in cartData" :key="item.goods_id">
					<uni-swipe-action-item :auto-close="false" :threshold="0" :right-options="options"
						@click="bindClick($event,item)">
						<myGoodsItem :item="item" @radioChange="radioChange" @valueChange="valueChange"
							@goGoodsDetail="goGoodsDetail" />
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<mySettle @settlement="settlement"></mySettle>
		</block>
		<block v-else>
			<!-- 空白购物车区域 -->
			<view class="empty-cart">
				<image src="/static/cart_empty@2x.png" class="empty-img"></image>
				<text class="tip-text">空空如也~</text>
			</view>
		</block>

	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import myGoodsItem from "./goods-item"
	import myAddress from "./my-address/index.vue"
	import mySettle from "./my-settle/index.vue"
	import {
		mapGetters,
		mapMutations,
	} from "vuex"
	export default {
		mixins: [badgeMix],
		components: {
			myGoodsItem,
			myAddress,
			mySettle
		},
		data() {
			return {
				options: [{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}]
			}
		},
		computed: {
			...mapGetters(['cartData', 'selectCartDate', 'userAddress', 'token'])
		},
		methods: {
			...mapMutations('cart', ['changeGoodsSelect', 'changeGoodsNum', 'removeCartData']),
			// 改变购物车商品选中状态
			radioChange(data) {
				this.changeGoodsSelect(data)
			},
			// 商品数量改变时
			valueChange(data) {
				this.changeGoodsNum(data)
			},
			// 跳转商品详情页
			goGoodsDetail(goods_id) {
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods_id
				})
			},
			bindClick(event, data) {
				this.removeCartData(data)
			},
			settlement() {
				if (this.selectCartDate.length === 0) return uni.showToast({
					title: "选择要结算的商品",
					icon: "none"
				})
				if (JSON.stringify(this.userAddress) === "{}") return uni.showToast({
					title: "选择收货地址",
					icon: "none"
				})
				if (!this.token) return uni.showToast({
					title: '请先登录',
					icon: "none"
				})
				console.log("开始结算.....");
			}
		}
	}
</script>

<style lang="scss" scoped>
	#root {
		padding-bottom: 50px;

		.address {
			position: sticky;
			top: 0;
			z-index: 9999;
			background: #FFF;
		}

		.cart-title {
			display: flex;
			align-items: center;
			padding: 10rpx 0 10rpx 10rpx;

			.title {
				padding-left: 10rpx;
				font-weight: 500;
			}
		}

		.empty-cart {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 150px;

			.empty-img {
				width: 90px;
				height: 90px;
			}

			.tip-text {
				font-size: 12px;
				color: gray;
				margin-top: 15px;
			}
		}
	}
</style>
