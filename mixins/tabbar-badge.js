import {
	mapGetters,
	mapMutations
} from "vuex"
export default {
	computed: {
		...mapGetters(['count'])
	},
	onShow() {
		uni.setTabBarBadge({
			index: 2,
			text: this.count + ''
		})
	},
	watch: {
		count: {
			handler(newVal) {
				// 调用 uni.setTabBarBadge() 方法，为tarBar设置右上角的徽标
				uni.setTabBarBadge({
					index: 2,
					text: newVal + ''
				})
			},
			immediate: true,
			deep: true
		}
	}
}
