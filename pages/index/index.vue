<template>
	<view class="index">
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>
		<u-tabs :list="sortList" :is-scroll="false" :current="currentIndex" @change="handleSortChange"></u-tabs>
		<u-row class="u-skeleton" gutter="16">
			<u-col span="6" v-for="(item, index) in goodsList" :key="index">
				<goods-card :goods="item" />
			</u-col>
		</u-row>

		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>

		<u-loadmore margin-top="30" margin-bottom="26" font-size="32" :status="status" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [{
						name: '默认'
					},
					{
						name: '销量'
					},
					{
						name: '推荐'
					},
					{
						name: '最新'
					}
				],
				currentIndex: 0,
				slides: [],
				goodsList: [{}, {}, {}, {}, {}, {}],
				page: 1,
				loading: false,
				status: 'loadmore'
			}
		},
		onLoad() {
			this.getIndexData()
		},
		methods: {
			handleSortChange(index) {
				this.currentIndex = index
				this.goodsList = [{}, {}, {}, {}, {}, {}]
				this.page = 1
				this.getIndexData()
			},
			// 获取首页数据
			async getIndexData() {

				this.loading = true // 显示骨架屏

				const params = {
					page: this.page
				}
				// 增加排序条件
				if (this.currentIndex === 1) params.sales = 1
				if (this.currentIndex === 2) params.recommend = 1
				if (this.currentIndex === 3) params.new = 1
				const indexData = await this.$u.api.index(params)

				this.loading = false

				if (!this.slides.length) {
					this.slides = indexData.slides
				}
				if (indexData.goods.data.length) {
					this.status = 'loadmore'
					this.goodsList =
						this.goodsList.pop().title ? [...this.goodsList, ...indexData.goods.data] : indexData
						.goods.data
				} else {
					this.status = 'nomore'
				}
			}
		},
		onReachBottom() {
			if (this.status !== 'nomore') {
				this.page++
				this.status = 'loading'
				this.getIndexData()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
