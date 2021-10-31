<template>
	<view class="cart">
		<view class="content">
			<view v-for="item in goodsList.length ? goodsList : []" :key="item.id">
				<cart-card :goods="item" @down="down" @up="up" @delete="deleteCart" @checked="checked"></cart-card>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<cart-bar class="bottom-bar" :totalPrice="totalPrice" @toPreview="toPreview">

			<view class="all" slot="left" @click="handleAll">
				<view class="btn" :class="isAll ? 'isAll' : ''">
					<u-icon class="btn__icon" name="checkbox-mark"></u-icon>
				</view>
				<view class="btn__title">
					<view class="text u-line-1">{{isAll ? '取消全选' : '全选'}}</view>
				</view>
			</view>
		</cart-bar>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<cart-bar class="bottom-bar-app" :totalPrice="totalPrice" @toPreview="toPreview">

			<view class="all" slot="left" @click="handleAll">
				<view class="btn" :class="isAll ? 'isAll' : ''">
					<u-icon class="btn__icon" name="checkbox-mark"></u-icon>
				</view>
				<view class="btn__title">
					<view class="text u-line-1">{{isAll ? '取消全选' : '全选'}}</view>
				</view>
			</view>
		</cart-bar>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				totalPrice: 0,
				isAll: false
			}
		},
		async onShow() {
			this.getCartData()
		},
		computed: {
			countPrice() {
				return this.goodsList.filter((item) => {
					return item.is_checked === 1
				}).reduce((pre, current) => {
					return pre + current.num * current.goods.price
				}, 0)
			}
		},
		methods: {
			// 获取购物车数据
			async getCartData(length) {
				// 调用API
				const params = {
					include: 'goods'
				}
				const cartListResult = await this.$u.api.cartList(params)

				// 数据绑定
				this.goodsList = cartListResult.data
				console.log(this.goodsList);

				// 总价格计算
				this.totalPrice = this.countPrice

				// 全选联动
				const checkedObj = this.goodsList.filter((item) => {
					return item.is_checked === 1
				})
				if (this.goodsList.length === checkedObj.length && checkedObj.length !== 0) {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},
			async changeCartCount(data) {
				const {
					cart,
					params,
					type
				} = data
				await this.$u.api.cartCount(cart, params)
				this.getCartData()
			},
			async cartDelete(id) {
				await this.$u.api.cartDelete(id)
				this.$u.toast('删除成功')
				this.getCartData()
			},
			async cartChecked(cart_ids) {
				const params = {
					cart_ids
				}
				await this.$u.api.cartChecked(params)
				this.getCartData()
			},
			// 商品数目相关
			down(data) {
				this.changeCartCount(data)
			},
			up(data) {
				this.changeCartCount(data)
			},
			deleteCart(id) {
				this.cartDelete(id)
			},
			checked(id) {

				let cart_ids = []

				if (id) {
					const checkedArr = this.goodsList.filter((item) => {
						return item.is_checked === 1
					}).map((item1) => {
						return item1.id
					})
					if (checkedArr.indexOf(id) === -1) {
						cart_ids = [...checkedArr, id]
					} else {
						checkedArr.splice(checkedArr.indexOf(id), 1)
						cart_ids = [...checkedArr]
					}
				} else {
					if (this.isAll) {
						cart_ids = this.goodsList.map(item => {
							return item.id
						})
					}

				}

				this.cartChecked(cart_ids)

			},
			// 全选按钮
			handleAll() {
				if (this.goodsList.length === 0) return
				this.isAll = !this.isAll
				this.checked()
			},
			// 去支付跳转
			toPreview() {
				this.$u.route({
					url: '/pages/orders/preview'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin-bottom: 130rpx;
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 100rpx;
		z-index: 999;
	}
	
	.bottom-bar-app {
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

	.isAll {
		background-color: #4591bf;
	}
</style>
