<template>
	<view>
		<template v-if="commentList.length">
			<view class="comment" v-for="(res, index) in commentList" :key="res.id">
				<view class="left">
					<image :src="res.user.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.user.name }}</view>
					</view>
					<view class="content">{{ res.content }}</view>
					<view class="bottom">
						{{ res.created_at }}
					</view>
				</view>
			</view>
		</template>
		<view v-else class="u-text-center" style="color: #c6c6c6;">
			暂无评论
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentsList: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				commentList: [],
				test: []
			};
		},
		mounted() {
			this.commentList = [...this.commentsList]
			console.log(this.commentsList);
		},
		methods: {
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/template/comment/reply'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
