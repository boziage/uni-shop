<template>
	<view class="cart-card">
		<view class="box">
			<view class="btn" :class="goods.is_checked === 1 ? 'isChecked' : ''" @click="handleChecked">
				<u-icon class="btn__icon" name="checkbox-mark"></u-icon>
			</view>
			<view class="content">
				<u-image class="u-skeleton-fillet" width="200rpx" height="200rpx" :src="goods.goods.cover_url">
				</u-image>
				<view class="content-box">
					<view class="content-box__title">
						<view>{{goods.goods.title}}</view>
						<view class="subtitle">{{goods.goods.description}}</view>
					</view>
					<view class="content-box__details">
						<view class="price">￥ {{goods.goods.price}}</view>
						<view class="btns">
							<view class="btns__count">
								<u-button :disabled="goods.num === 1" class="todo" size="mini" @click="handleDown">-
								</u-button>
								<u-button class="num" disabled size="mini">{{goods.num}}</u-button>
								<u-button class="todo" size="mini" @click="handleUp">+</u-button>
							</view>
							<view class="btns__delete" @click="handleDelete">
								<u-icon class="btns__delete-icon" name="trash"></u-icon>
							</view>
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
		methods: {
			handleDown() {
				this.$emit('down', {
					params: {
						num: this.goods.num - 1,
					},
					cart: this.goods.id
				})
			},
			handleUp() {
				this.$emit('up', {
					params: {
						num: this.goods.num + 1
					},
					cart: this.goods.id
				})
			},
			handleDelete() {
				this.$emit('delete', this.goods.id)
			},
			handleChecked() {
				this.$emit('checked', this.goods.id)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin: 20rpx 30rpx 0 0;

		.btn {
			width: 40rpx;
			height: 40rpx;
			margin: 0 20rpx;
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
		}

		.content {
			flex: 1;
			display: flex;
			padding: 10rpx;
			background-color: #eee;

			.content-box {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 0 10rpx;

				&__title {
					font-weight: 700;
					font-size: 26rpx;

					.subtitle {
						margin-top: 2rpx;
						font-weight: 300;
						color: #aaa;
					}
				}

				&__details {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.price {
						color: red;
					}

					.btns {
						display: flex;
						justify-content: space-evenly;
						align-items: center;

						&__count {
							display: flex;
							align-items: center;

							.todo {
								width: 50rpx;
							}

							.num {
								margin: 0 8rpx;
							}
						}
					}
				}
			}
		}
	}

	.btns__delete-icon {
		color: red;
		margin: 0 12rpx;
		font-size: 42rpx;
	}

	.isChecked {
		background-color: #4591bf;
	}
</style>
