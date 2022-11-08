<template>
	<view id="root">
		<template v-if="goodsList.length !== 0">
			<view class="goods-item" v-for="(item,index) in goodsList" v-if="item.goods_big_logo"
				@click="goGoodsDetail(item.goods_id)" :key="index">
				<view class="goods-item-left">
					<image :src="item.goods_big_logo" mode=""></image>
				</view>
				<view class="goods-item-right">
					<view class="goods-item-right-title">{{item.goods_name}}</view>
					<view class="goods-item-right-price">￥{{item.goods_price | tofixed}}</view>
				</view>
			</view>
		</template>

		<view class="dataEmpty" v-if="goodsList.length === 0">数据为空</view>
	</view>
</template>

<script>
	import {
		reqGoodsList
	} from "@/api/app.js"
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				total: null, // 数量总数
				goodsList: [], // 商品数据
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				isLoading: true
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		onLoad(options) {
			this.queryObj.cid = options.cid || ""
			this.queryObj.query = options.query || ""
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = false
				const {
					message
				} = await reqGoodsList(this.queryObj)
				this.total = message.total
				this.goodsList = [...this.goodsList, ...message.goods]
				this.isLoading = true
				cb && cb()
			},
			goGoodsDetail(goods_id) {
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods_id
				})
			}
		},
		onReachBottom() {
			// 上拉加载数据
			if (!this.isLoading) return
			if (this.total === this.goodsList.length) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			// 监听用户下拉刷新
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = true
			this.goodsList = []
			const cb = () => uni.stopPullDownRefresh()
			this.getGoodsList(cb)
		}
	}
</script>

<style lang="scss" scoped>
	#root {
		.goods-item {
			display: flex;
			align-items: center;
			padding: 20rpx;
			height: 240rpx;

			.goods-item-left {
				image {
					width: 240rpx;
					height: 120rpx;
				}
			}

			.goods-item-right {
				display: flex;
				flex-direction: column;
				margin-left: 10px;



				.goods-item-right-title {
					font-size: 26rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.goods-item-right-price {
					margin: 10px 0;
					color: #c00000;
					font-weight: 700;
				}
			}
		}

		.dataEmpty {
			text-align: center;
			font-size: 28px;
			margin-top: 20px;
		}
	}
</style>
