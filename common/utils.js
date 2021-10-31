const install = (Vue, vm) => {


	// 是否登录
	const isLogin = () => {
		// 如果没有token，跳转到login
		const token = vm.vuex_token
		if (!token) {
			// 记录哪个页面触发跳转
			const currentPages = getCurrentPages().pop()
			// 获取页面路径和请求参数
			const {
				options,
				route
			} = currentPages
			// 参数的key
			const optionsKeys = Object.keys(options)
			let params = ''
			if (optionsKeys.length !== 0) {
				params = optionsKeys.reduce((pre, current) => {
					return `${pre}${current}=${options[current]}&`
				}, '?').slice(0, -1)
			}

			// 缓存当前页
			uni.setStorageSync('back_url', route + params)

			vm.$u.toast('验证失败,请登录')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login'
				})
			}, 1500)
			return false
		}
		return true
	}

	// 更新用户信息
	const updataUserInfo = async () => {
		// 重新请求用户信息
		const userInfo = await vm.$u.api.userInfo()
		// 缓存vuex_user
		vm.$u.vuex('vuex_user', userInfo)
	}

	vm.$u.utils = {
		isLogin,
		updataUserInfo
	}
}

export default {
	install
}
