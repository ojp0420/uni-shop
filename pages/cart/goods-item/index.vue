<template>
	<view id="root">
		<view class="item-box" >
			<view class="item-cover" @click="goGoodsDetail()">
				<radio :checked="item.goods_state" color="#c00000" @click.stop="radioChange()" />
				<image :src="item.goods_small_logo" mode="heightFix"></image>
			</view>
			<view class="item-right-content">
				<view class="content" @click="goGoodsDetail()">{{item.goods_name}}</view>
				<view class="dataDetail">
					<view class="price">￥{{item.goods_price}}.00</view>
					<uni-number-box :min='1' :max="10" :value="item.goods_count" @change.stop="valueChange()" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		data() {
			return {

			}
		},
		methods: {
			radioChange() {
				this.$emit('radioChange', this.item)
			},
			valueChange(e) {
				this.$emit('valueChange', {
					...this.item,
					newGoods_count: e
				})
			},
			goGoodsDetail() {
				this.$emit('goGoodsDetail', this.item.goods_id)
			}
		}

	}
</script>

<style lang="scss" scoped>
	#root {
		.item-box {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx;

			.item-cover {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 200rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.item-right-content {
				display: flex;
				padding-left: 20rpx;
				flex-direction: column;
				justify-content: space-around;

				.content {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
					margin: 20px 0;
				}

				.dataDetail {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.price {
						color: #C00000;
					}
				}
			}
		}
	}
</style>
