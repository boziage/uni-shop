<template>
	<navigator class="goods-item" :url="'/pages/goods/show?id=' + goods.id">
		<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="goods.cover_url">
		</u-image>
		<view class="title u-skeleton-rect u-line-1">{{goods.title ? goods.title : 'loading..'}}</view>
		<view class="u-flex u-row-between">
			<view class="price u-skeleton-fillet">￥ {{goods.price}}</view>
			<view class="sales u-skeleton-fillet u-text-right">销量: {{goods.sales}}</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name: "goods-card",
		props: {
			goods: {
				type: Object,
				default: () => ({})
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		padding: 40rpx;
		margin-top: 30rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, .3);

		.title {
			width: 100%;
			margin: 10rpx 0;
			font-weight: 700;
			font-size: 32rpx;
		}

		.price {
			color: red;
			width: 40%
		}

		.sales {
			color: #888;
			width: 40%;
		}
	}
</style>
