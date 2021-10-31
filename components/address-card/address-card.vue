<template>
	<view v-if="defaultAddress.id" class="content u-flex">
		<view class="u-flex-1">
			<view class="u-font-16 u-p-b-20">
				{{defaultAddress.province + defaultAddress.city + defaultAddress.county + defaultAddress.address}}
			</view>
			<view class="u-font-14 u-tips-color">
				{{defaultAddress.name + ' ' + defaultAddress.phone}}
			</view>
		</view>
		<view class="u-m-l-10 u-p-10">
			<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			defaultAddress: {
				type: Object,
				default: () => ({})
			},
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		border-bottom: 1px solid #eee !important;
		padding: 20rpx 30rpx;
	}
</style>
