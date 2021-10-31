<template>
	<view class="oss-upload">
		<u-upload ref="upload" :max-size="5 * 1024 * 1024" max-count="1" :multiple="false" :deletable="false" :custom-btn="true"
			:show-progress="false" :show-upload-list="false" :form-data="formData" :action="action"
			:before-upload="beforeUpload" @on-success="onSuccess">
			<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"></u-avatar>
		</u-upload>
	</view>
</template>

<script>
	let _this
	export default {
		name: "oss-upload",
		data() {
			return {
				// 演示地址，请勿直接使用
				action: '',
				formData: {},
				upFileName: ''
			};
		},
		created() {
			_this = this
		},
		methods: {
			// 上传前的钩子
			// 注意:在小程序中 this 可能会丢失(可用_this = this)
			async beforeUpload(index, list) {

				// 请求API,获取oss token
				const ossToken = await _this.$u.api.authOssToken()
				// 设置上传域名
				_this.action = ossToken.host

				// 处理唯一文件名
				const {
					file
				} = list[0]

				// #ifdef H5
				const fileName = file.name
				// #endif

				// #ifndef H5
				const fileName = file.path
				// #endif

				const suffix = fileName.slice(fileName.lastIndexOf('.'))
				const upFileName = _this.$u.guid(20) + suffix

				_this.upFileName = upFileName

				// 额外参数
				_this.formData = {
					'key': upFileName, // 上传后的文件名
					'policy': ossToken.policy,
					'OSSAccessKeyId': ossToken.accessid,
					'success_action_status': '200', //让服务端返回200,不然，默认会返回204
					'signature': ossToken.signature,
				}

				console.log(ossToken);

				return true;
			},

			// 上传成功之后
			async onSuccess() {
				// 移除预览区域的图片
				this.$refs.upload.remove(0)
				
				// 请求API更新头像
				await this.$u.api.changeAvatar({
					avatar: this.upFileName
				})
				// 更新缓存的用户信息

				this.$u.utils.updataUserInfo()

				this.$u.toast('更新成功')
			}
		},
	}
</script>

<style lang="scss">

</style>
