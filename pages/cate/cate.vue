<template>
	<view id="root">
		<view class="search-box">
			<mySearchVue @click="goSearchPage()" />
		</view>
		<view class="scroll-view-container">
			<scroll-view scroll-y="true">
				<view class="left-scroll-view-item" :class="[index===active?'active':'']"
					v-for="(cate,index) in cateGories" :key="index" @click="changeActive(index)">{{cate.cat_name}}
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" :scroll-top="scrollTop">
				<view class="right-scroll-view-item" v-for="(item,index) in secondLevel" :key="index">
					<view class="title">/ {{item.cat_name}} /</view>
					<view class="container">
						<view class="container-item" v-for="(item2,index2) in item.children" :key="index2"
							@click="gotoGoodsList(item2)">
							<image :src="item2.cat_icon" mode=""></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		reqCateGories
	} from "@/api/app.js"
	import mySearchVue from "@/components/my-search/my-search.vue"
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				scrollTop: 0,
				active: 0,
				cateGories: [],
				secondLevel: [], // 二级分类
			}
		},
		components: {
			mySearchVue
		},
		onLoad() {
			this.getCateGories() // 获取分类数据
		},
		methods: {
			async getCateGories() {
				const {
					message
				} = await reqCateGories()
				this.secondLevel = message[0].children
				this.cateGories = message
			},
			changeActive(index) {
				this.active = index
				this.secondLevel = this.cateGories[index].children
				this.scrollTop = this.scrollTop == 0 ? 0.1 : 0
			},
			// 点击三级分类项跳转到商品列表页面
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
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

		.search-box {
			position: sticky;
			top: 0;
			z-index: 999;
		}

		.scroll-view-container {
			display: flex;

			scroll-view {
				height: calc(100vh - 100rpx);

				&:nth-child(1) {
					width: 120px;
				}
			}

			.left-scroll-view-item {
				line-height: 50px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}

			.right-scroll-view-item {
				.title {
					font-size: 14px;
					font-weight: 900;
					text-align: center;
					padding: 10px 0;
				}

				.container {
					display: flex;
					flex-wrap: wrap;

					.container-item {
						width: 33.33%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size: 12px;
						font-weight: 700;
						padding-bottom: 10px;

						image {
							width: 120rpx;
							height: 120rpx;
							margin-bottom: 5px;
						}
					}
				}
			}
		}
	}
</style>
