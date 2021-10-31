<template>
	<view class="cart-card">
		<view class="content">
			<u-image class="u-skeleton-fillet" width="200rpx" height="200rpx" :src="goods.goods.cover_url">
			</u-image>
			<view class="content-box">
				<view class="content-box__title">
					<view>{{goods.goods.title}}</view>
				</view>
				<view class="content-box__details">
					<view class="price">￥ {{goods.goods.price}}</view>
					<view class="btns">
						<view class="btns__delete">
							<view class="num">x {{goods.num}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "cart-card",
		props: {
			goods: {
				type: Object,
				default: () => ({})
			},
		},
		data() {
			return {};
		},
		mounted() {},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin: 20rpx 30rpx 0 30rpx;
		padding: 10rpx;
		background-color: #eee;

		.content-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 200rpx;
			padding: 10rpx;

			&__title {
				font-weight: 700;
				font-size: 26rpx;
			}

			&__details {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					color: red;
				}
			}
		}
	}
</style>
