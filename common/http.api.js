// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index'; // API数量多的话，就不写在这里了

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 定义api属性
	vm.$u.api = {}

	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index', params);

	// 认证相关
	vm.$u.api.authLogin = params => vm.$u.post('/api/auth/login', params)
	vm.$u.api.authRegister = params => vm.$u.post('/api/auth/register', params)
	vm.$u.api.authLogout = params => vm.$u.post('/api/auth/logout', params)
	vm.$u.api.authOssToken = () => vm.$u.get('/api/auth/oss/token') // 获取oss token

	// 用户数据
	vm.$u.api.userInfo = () => vm.$u.get('/api/user') // 用户数据
	vm.$u.api.changeUserInfo = params => vm.$u.put('/api/user', params) // 修改用户信息
	vm.$u.api.changeAvatar = params => vm.$u.patch('/api/user/avatar', params) // 修改用户头像

	// 商品数据
	vm.$u.api.goodsList = (params = {}) => vm.$u.get('/api/goods', params) // 商品分类
	vm.$u.api.goodsInfo = id => vm.$u.get(`/api/goods/${id}`) // 商品详情
	vm.$u.api.goodsCollect = id => vm.$u.post(`/api/collects/goods/${id}`) // 商品详情

	// 购物车相关
	vm.$u.api.addCart = params => vm.$u.post('/api/carts', params) // 加入购物车
	vm.$u.api.cartList = (params = {}) => vm.$u.get('/api/carts', params) // 购物车列表
	vm.$u.api.cartCount = (cart, params) => vm.$u.put(`/api/carts/${cart}`, params) // 购物车商品数量变化
	vm.$u.api.cartChecked = params => vm.$u.patch('/api/carts/checked', params) // 购物车商品选择变化
	vm.$u.api.cartDelete = cart => vm.$u.delete(`/api/carts/${cart}`) // 移出购物车
	
	// 订单相关
	vm.$u.api.previewList = () => vm.$u.get('/api/orders/preview') // 订单预览
	

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	// vm.$u.api = {
	// 	index,
	// 	authLogin
	// };
}

export default {
	install
}
