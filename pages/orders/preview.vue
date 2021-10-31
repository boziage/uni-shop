<template>
	<view class="cart">
		<address-card :defaultAddress="defaultAddress"></address-card>
		<block v-for="item in previewList.length ? previewList : []" :key="item.id">
			<preview-card :goods="item"></preview-card>
		</block>
		<cart-bar class="bottom-bar" :totalPrice="totalPrice" btnName="提交订单并支付"></cart-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [],
				defaultAddress: {},
				previewList: [],
				totalPrice: 0,
			}
		},
		async onLoad() {
			this.getPreviewData()
		},
		computed: {
			countPrice() {
				return this.previewList.filter((item) => {
					return item.is_checked === 1
				}).reduce((pre, current) => {
					return pre + current.num * current.goods.price
				}, 0)
			}
		},
		methods: {
			// 获取购物车数据
			async getPreviewData(length) {
				// 调用API
				const params = {
					include: 'goods'
				}
				const previewListResult = await this.$u.api.previewList()

				// 数据绑定
				this.addressList = previewListResult.address
				this.previewList = previewListResult.carts


				this.defaultAddress = previewListResult.address.find((item) => {
					return item.is_default === 1
				})

				console.log(previewListResult);
				console.log(this.defaultAddress);

				// // 总价格计算
				this.totalPrice = this.countPrice
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}

	.all {
		display: flex;
		align-items: center;

		.btn {
			width: 40rpx;
			height: 40rpx;
			margin: 0 20rpx 0 2rpx;
			border-radius: 50%;
			border: 1px solid #ccc;
			color: white;
			display: flex;

			&__icon {
				font-size: 32rpx;
				height: 100%;
				width: 100%;
				justify-content: center;
			}

			&__title {
				font-size: 30rpx;
			}
		}
	}
</style>
