<template>
	<view>
		<myLogin v-if="!token"></myLogin>
		<myUserInfo v-else></myUserInfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import myLogin from "./components/my-login/index.vue"
	import myUserInfo from "./components/my-userInfo/index.vue"
	import {
		mapState
	} from "vuex"
	export default {
		mixins: [badgeMix],
		components: {
			myLogin,
			myUserInfo
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState('user', ['token']),
		},
		methods: {

		}
	}
</script>

<style>

</style>
