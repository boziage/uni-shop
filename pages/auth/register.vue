<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎使用图书商城</view>
			<input class="u-border-bottom" v-model="name" placeholder="请输入用户名" />
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirmation" placeholder="请再次确认密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
			<view class="alternative">
				<view class="issue" @tap="handleLoginClick">已有账户? 登录</view>
				<view class="password">忘记密码?</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				password_confirmation: ''
			}
		},
		onLoad() {

		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.name && this.$u.test.email(this.email) && this.password && this.password_confirmation) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {

			// 执行注册

			async submit() {
				// 1.表单验证
				if (!this.name || !this.$u.test.email(this.email) || !this.password || !this.password_confirmation)
					return
				if (this.password !== this.password_confirmation) {
					this.$u.toast('请确认两次密码一致')
					return
				}
				// 处理登录参数
				const params = {
					name: this.name,
					email: this.email,
					password: this.password,
					password_confirmation: this.password_confirmation
				}
				// // 请求API进行注册
				await this.$u.api.authRegister(params)

				// 注册成功后跳转到登录页
				this.$u.toast('注册成功')

				setTimeout(() => {
					this.$u.route({
						type: 'redirect',
						url: '/pages/auth/login'
					})
				}, 1000)
			},

			handleLoginClick() {
				this.$u.route({
					type: 'redirect',
					url: '/pages/auth/login'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		margin-bottom: 40rpx !important;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
