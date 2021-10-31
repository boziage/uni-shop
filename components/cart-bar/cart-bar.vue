<template>
	<view class="navigation">
		<view class="left">
			<slot name="left"></slot>
		</view>
		<view class="right">
			合计:
			<view class="price">￥{{totalPrice.toFixed(2)}}</view>
			<view class="cart btn u-line-1" @click="handlePreview">{{btnName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			totalPrice: {
				type: Number,
				default: 0
			},
			btnName: {
				type: String,
				default: '结算'
			}
		},
		data() {
			return {}
		},
		methods: {
			handleCollectClick() {
				this.$emit('collect')
			},
			handleAddCartClick() {
				this.$emit('addCart')
			},
			handlePreview() {
				this.$emit('toPreview')
			},
		},
	};
</script>

<style lang="scss" scoped>
	.navigation {
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 16rpx;
		width: 100%;

		.left {
			display: flex;
			font-size: 20rpx;
			justify-content: flex-start;
			flex: 1;
		}

		.right {
			display: flex;
			font-size: 28rpx;
			justify-content: space-evenly;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 60rpx;
				margin-left: 20rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}
		}
	}

	.price {
		color: red;
		font-weight: 700;
		font-size: 28rpx;
		padding: 0 6rpx;
	}
</style>
