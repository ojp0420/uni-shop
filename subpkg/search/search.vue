<template>
	<view id="root">
		<uni-search-bar cancelButton="none" :radius="18" placeholder="请输入搜索内容" bgColor="#fefefe" v-model="kw"
			@input="inputEvent" @confirm="gotoGoodsList()" :focus="true" />

		<!-- 搜索建议 -->
		<view class="qsearch" v-if="qsearch.length">
			<view class="qsearch-item" v-for="item in qsearch" :key="item.goods_id" @click="gotoDetail(item.goods_id)">
				<text>{{item.goods_name}}</text>
				<uni-icons type="forward" size="18"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="searchHistory" v-if="!qsearch.length && searchHistory.length">
			<view class="searchHistory-head">
				<view class="searchHistory-title">搜索历史</view>
				<uni-icons type="trash-filled" size="24" @click="onClearHistory"></uni-icons>
			</view>
			<view class="searchHistory-item-box">
				<text v-for="(item,index) in searchHistory" :key="index" @click="onItemHistory(item)">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqQsearch
	} from "@/api/app.js"
	import {
		addSearchHistory
	} from "../search/util.js"
	export default {
		data() {
			return {
				timer: null,
				kw: "",
				qsearch: [],
				searchHistory: []
			}
		},
		onLoad() {
			this.searchHistory = JSON.parse(uni.getStorageSync("searchHistory") || "[]") 
		},
		methods: {
			inputEvent(e) {
				// 防抖处理
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getQsearch(this.kw)
				}, 200)
			},
			async getQsearch(kw) {
				if (kw == "") {
					this.qsearch = []
					return
				}
				const {
					message
				} = await reqQsearch({
					query: kw
				})
				this.qsearch = message
				this.searchHistory = addSearchHistory({
					searchHistory: this.searchHistory,
					kw
				})
			},
			gotoDetail(goods_id) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			onClearHistory() {
				this.searchHistory = []
				uni.removeStorageSync("searchHistory")
			},
			onItemHistory(item) {
				this.kw = item
				this.gotoGoodsList()
			},
			gotoGoodsList() {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + this.kw
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-searchbar {
		position: sticky !important;
		top: 0;
		z-index: 999;
		background: #C00000;
	}

	.qsearch {
		margin: 10px 5px;
		box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.08);
		border-radius: 20px 20px 20px 20px;
		overflow: auto;
		height: 60vh;
		background: #fff;

		.qsearch-item {
			display: flex;
			align-items: center;
			border-bottom: solid #ccc 1px;
			margin: 0 5px;
			height: 100rpx;
			font-size: 28rpx;

			text {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 3px;
				display: block;
			}
		}
	}

	.searchHistory {
		.searchHistory-head {
			display: flex;
			margin: 0 10px;
			padding: 15rpx 0;
			border-bottom: 1px solid #ccc;

			.searchHistory-title {
				flex: 1;
			}
		}

		.searchHistory-item-box {
			display: flex;
			flex-wrap: wrap;

			text {
				background: #e8e8e8;
				border-radius: 10rpx;
				padding: 15rpx 30rpx;
				margin: 5px;
			}
		}
	}
</style>
