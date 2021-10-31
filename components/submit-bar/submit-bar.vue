<template>
	<view class="navigation">
		<view class="left">
			<view class="item like" :class="isCollect ? 'isCollect' : ''" @click="handleCollectClick">
				<u-icon :name="isCollect ? 'star-fill' : 'star'" :size="40"></u-icon>
				<view class="text u-line-1">{{isCollect ? '取消收藏' : '收藏'}}</view>
			</view>
			<view class="item car" @click="handleToCart">
				<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">购物车</view>
			</view>
		</view>
		<view class="right">
			<view class="cart btn u-line-1" @click="handleAddCartClick">加入购物车</view>
			<view class="buy btn u-line-1" @click="handleBuy">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isCollect: {
				type: Number,
				default: 0
			},
			cartCount: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		methods: {
			handleCollectClick() {
				this.$emit('collect')
			},
			handleToCart() {
				this.$emit('toCart')
			},
			handleAddCartClick() {
				this.$emit('addCart')
			},
			handleBuy() {
				console.log('购买');
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
			justify-content: space-evenly;

			.isCollect {
				color: red;
			}

			.item {
				margin: 0 30rpx;

				&.like {
					text-align: center;
					width: 96rpx;
					flex: 1;
				}

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			flex: 1;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
