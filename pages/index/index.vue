<template>
	<view class="index">
		index
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		async onLoad() {
			// 测试api
			// const data = {
			// 	email: 'test@a.com',
			// 	password: '123123'
			// }
			// const res = await this.$u.api.authLogin(data)
			// console.log(res);
			
			// 测试vuex
			console.log(this.vuex_version);
			this.$u.vuex('vuex_name', 'bozi')
			console.log(this.vuex_name);
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
