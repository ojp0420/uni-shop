<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 打开调试
			uni.setEnableDebug({
				enableDebug: true
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background: #f9f9f9;
	}
</style>
