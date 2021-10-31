<template>
	<view class="goods u-wrap">
		<view class="u-search-box">
			<u-search placeholder="输入商品名称" v-model="keyword" @custom="handleSearch" @clear="handleChear"></u-search>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view">
				<view v-for="(item, index) in categories" :key="item.id">
					<view v-for="(item1,index1) in item.children" :key="item1.id" class="u-tab-item"
						:data-current="item1.id" :class="[current == item1.id ? 'u-tab-item-active' : '']"
						@tap.stop="swichMenu(item1.id)">
						<text class="u-line-1">{{item1.name}}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="right-box" @scrolltolower="scrollEvent">
				<view class="page-view">
					<view class="class-item">
						<view class="item-container">
							<navigator class="thumb-box u-p-t-40 u-p-b-40" v-for="(item, index) in goodsList"
								:key="item.id" :url="'/pages/goods/show?id=' + item.id">
								<image class="item-menu-image" :src="item.cover_url" mode=""></image>
								<view class="item-menu-name">{{item.title}}</view>
							</navigator>

							<view v-if="goodsList.length == 0" class="u-flex-1 u-p-t-80 u-p-b-80">
								<u-empty text="暂无数据" mode="list"></u-empty>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: null, // 预设当前项的值
				categories: [], // 左侧列表
				goodsList: [], // 右侧列表
				page: 1,
				keyword: '', // 搜索内容
				isLast: false // 是否最后一页
			}
		},
		computed: {

		},
		created() {
			this.goodsListData()
		},
		methods: {
			// 获取商品分类数据
			async goodsListData() {
				const params = {
					page: this.page,
					title: this.keyword
				}

				if (this.current) params.category_id = this.current

				const goodsListResult = await this.$u.api.goodsList(params)
				this.categories = goodsListResult.categories
				this.goodsList = [...this.goodsList, ...goodsListResult.goods.data]
				// this.isLast = goodsListResult.next_page_url ? false : true
				this.isLast = !goodsListResult.goods.next_page_url
			},
			// 处理搜索
			handleSearch() {
				this.page = 1
				this.goodsList = []
				this.goodsListData()
			},
			// 清空
			handleChear() {
				this.keyword = ''
				this.handleSearch()
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				this.handleChear()
			},
			// 右侧区域滚动到底部,加载下一页
			scrollEvent(e) {
				if (this.isLast) return
				this.page++
				this.goodsListData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		margin-top: 10rpx;
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 50%;
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
