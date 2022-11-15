<template>
	<view id="root" v-if="goods_info.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in goods_info.pics" :key="item.goods_id">
				<image :src="item.pics_big_url" mode="" @click="preview(index)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品详情 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 底部导航区域 -->
		<view class="goods-buttom">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onLeftBtn()"
				@buttonClick="onRightBtn()" />
		</view>

	</view>
</template>

<script>
	import {
		reqGoodsDetail
	} from "@/api/app.js"
	import {
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		watch: {
			count: {
				handler(newVal) {
					this.options[1].info = newVal
				},
				immediate: true,
				deep: true
			}
		},
		computed: {
			...mapGetters(['count'])
		},
		onLoad(options) {
			this.getGoodsDetail(options)
		},
		methods: {
			async getGoodsDetail(data) {
				const {
					message
				} = await reqGoodsDetail(data)
				message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
				this.goods_info = message
			},
			preview(current) {
				uni.previewImage({
					urls: this.goods_info.pics.map((item) => item.pics_big_url),
					current: current,
					loop: true
				})
			},
			onLeftBtn({
				index
			}) {
				if (index === 1) {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			onRightBtn({
				index
			}) {
				if (index === 0) {
					// 2. 组织一个商品的信息对象
					const goods = {
						goods_id: this.goods_info.goods_id, // 商品的Id
						goods_name: this.goods_info.goods_name, // 商品的名称
						goods_price: this.goods_info.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					this.$store.commit('cart/addToCart', goods)
					uni.showToast({
						title: '加入购物车成功',
						duration: 2000
					})
				} else {

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#root {
		image {
			width: 100%;
			height: 100%;
		}

		swiper {
			height: 750rpx;
		}

		// 商品信息区域的样式
		.goods-info-box {
			padding: 10px;
			padding-right: 0;

			.price {
				color: #c00000;
				font-size: 18px;
				margin: 10px 0;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-name {
					font-size: 13px;
					padding-right: 10px;
				}

				// 收藏区域
				.favi {
					width: 120px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-left: 1px solid #efefef;
					color: gray;
				}
			}

			// 运费
			.yf {
				margin: 10px 0;
				font-size: 12px;
				color: gray;
			}
		}

		.goods-buttom {
			position: sticky;
			bottom: 0;
			z-index: 9999;
		}
	}
</style>
