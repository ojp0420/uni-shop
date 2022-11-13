<template>
	<view id="root">
		<view class="search-box">
			<mySearchVue @click="goSearchPage()" />
		</view>
		<view class="box">

			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
				<swiper-item v-for="item in swiperData" :key="item.goods_id">
					<navigator class="swiper-item" :url='"/subpkg/goods_detail/goods_detail?goods_id=" +item.goods_id'>
						<image :src="item.image_src" mode=""></image>
					</navigator>
				</swiper-item>
			</swiper>

			<view class="catItem">
				<view class="item" v-for="(item,index) in catItemsData" :key="index" @click="onNavClick(item)">
					<image :src="item.image_src" mode="widthFix"></image>
				</view>
			</view>

			<view class="floor-list">
				<view class="floor-item" v-for="(item,index) in floorData" :key="index">
					<view class="floor-title">
						<image :src="item.floor_title.image_src" mode=""></image>
					</view>
					<view class="floor-img-box">
						<view class="left-img-box" @click="onFloorClick(item.product_list[0])">
							<image :src="item.product_list[0].image_src"
								:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
						</view>
						<view class="right-img-box">
							<view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2"
								v-if="i2 !== 0" @click="onFloorClick(item2)">
								<image :src="item2.image_src" mode="widthFix"
									:style="{width: item2.image_width + 'rpx'}">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		reqSwiperdata,
		reqCatitems,
		reqFloorData
	} from "@/api/app.js"
	import mySearchVue from "@/components/my-search/my-search.vue"
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperData: [],
				catItemsData: [],
				floorData: [],
			}
		},
		components: {
			mySearchVue
		},
		onLoad() {
			this.getSwiperdata() // 获取轮播图数据
			this.getCatitems() // 获取分类选项列表
			this.getFloorData() // 获取楼层数据
		},
		methods: {
			async getSwiperdata() {
				const res = await reqSwiperdata()
				this.swiperData = res.message
			},
			async getCatitems() {
				const res = await reqCatitems()
				this.catItemsData = res.message
			},
			async getFloorData() {
				const res = await reqFloorData()
				res.message.forEach(item => {
					item.product_list.forEach(floor => {
						floor.url = "/subpkg/goods_list/goods_list?" + floor.navigator_url.split('?')[
							1]
					})
				})
				this.floorData = res.message
			},
			onNavClick(item) {
				console.log(item)
			},
			onFloorClick(item) {
				uni.navigateTo({
					url: item.url
				})
			},
			goSearchPage() {
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#root {
		.box {
			overflow-x: hidden;
		}


		image {
			width: 100%;
			height: 100%;
		}

		.search-box {
			position: sticky;
			top: 0;
			z-index: 999;
		}

		swiper {
			height: 330rpx;
			width: 100vw;

			.swiper-item {
				width: 100%;
				height: 100%;
			}
		}

		.catItem {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30rpx 0;

			.item {
				width: 25%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 65%;
					height: 65%;
				}
			}
		}

		.floor-list {

			.floor-item {
				margin: 18rpx 0;
			}

			.floor-title {
				height: 60rpx;
				width: 100%;
			}

			.floor-img-box {
				display: flex;

				.left-img-box {
					margin: 0 15rpx;
				}

				.right-img-box {
					display: flex;
					flex-wrap: wrap;

					.right-img-item {
						width: 50%;
					}
				}
			}
		}
	}
</style>
