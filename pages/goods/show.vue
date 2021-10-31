<template>
	<view class="show">
		<view style="text-align: center">
			<img height="220" :src="goodsInfo.cover_url" />
		</view>
		<view class="goods-details">
			<view class="title u-line-2">{{goodsInfo.title}}</view>
			<view class="u-flex u-row-between u-p-b-10">
				<view class="price">￥ {{goodsInfo.price}}</view>
				<view class="sales u-text-right">销量: {{goodsInfo.sales}}</view>
			</view>
		</view>
		<view>
			<u-tabs :list="sortList" :is-scroll="false" :current="currentIndex" @change="handleSortChange"></u-tabs>
		</view>

		<view v-if="currentIndex === 0" class="content parse">
			<u-parse :html="goodsInfo.details"></u-parse>
		</view>
		<view v-else-if="currentIndex === 1" class="content">
			<comment :commentsList="commentsList"></comment>
			<view class="to-comment">
				<image src="../../static/icon/pencil.png"></image>
			</view>
		</view>
		<view v-else-if="currentIndex === 2" class="content">
			<u-row class="u-skeleton" gutter="16">
				<u-col span="6" v-for="(item, index) in goodsList" :key="index">
					<goods-card :goods="item" />
				</u-col>
			</u-row>
		</view>
		<submit-bar class="bottom-bar" ref="submitBarRef" :isCollect="isCollect" :cartCount="cartCount"
			@collect="handleCollect" @addCart="handleAddCart" @toCart="handleToCart">
		</submit-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [{
						name: '商品详情'
					},
					{
						name: '商品评论',
						count: 0
					},
					{
						name: '推荐商品'
					}
				],
				currentIndex: 0,
				goodsId: null,
				commentsList: [],
				goodsList: [{}, {}, {}, {}, {}, {}],
				goodsInfo: {},
				isCollect: 0,
				cartCount: 0
			};
		},
		onLoad(query) {
			this.goodsId = query.id
			this.getData()
			this.getCartCount()
		},
		methods: {
			async getData() {
				const res = await this.$u.api.goodsInfo(this.goodsId)
				this.commentsList = res.goods.comments
				this.sortList[1].count = res.goods.comments.length
				this.goodsList = res.like_goods
				this.goodsInfo = res.goods
				this.isCollect = res.goods.is_collect
			},
			handleSortChange(index) {
				this.currentIndex = index
			},
			async handleCollect() {
				// 请求收藏API
				await this.$u.api.goodsCollect(this.goodsId)

				// 收藏成功之后,提示消息,并改变按钮状态
				if (this.isCollect === 0) {
					this.isCollect = 1
					this.$u.toast('收藏成功')
				} else {
					this.isCollect = 0
					this.$u.toast('取消收藏')
				}
				console.log(this.isCollect);
			},
			async handleAddCart() {
				const params = {
					goods_id: this.goodsId
				}
				await this.$u.api.addCart(params)
				this.$u.toast('添加成功')
				// 重新获取购物车数据
				this.getCartCount()
			},

			// 获取购物车数量
			async getCartCount() {
				const cartListResult = await this.$u.api.cartList()
				this.cartCount = cartListResult.data.length
			},

			// 跳转到购物车
			handleToCart() {
				console.log(111);
				this.$u.route({
					type: 'switchTab',
					url: 'pages/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-details {
		padding: 0 30rpx;

		.title {
			width: 100%;
			margin: 20rpx 0;
			font-weight: 700;
			font-size: 32rpx;
		}

		.price {
			color: red;
			width: 40%;
			font-weight: 700;
		}

		.sales {
			color: #888;
			width: 40%;
		}
	}

	.content {
		padding: 20rpx 20rpx 140rpx 20rpx;
	}

	.parse {
		padding: 0rpx 0rpx 140rpx 0rpx;
	}

	.to-comment {
		right: 20rpx;
		bottom: 130rpx;
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		border: 1px solid red;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 80%;
			height: 80%;
		}
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
