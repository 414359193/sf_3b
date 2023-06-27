<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="@/static/2.png"></image> -->
		<view class="t-b">
			<text>Wi-Fi设置</text>
		</view>
		<view class="t-a">
			<span>Wi-Fi名称</span>
			<input placeholder="" v-model="wifiName" />
		</view>
		<view class="t-a">
			<span>Wi-Fi密码</span>
			<input placeholder="请输入WiFi密码" v-model="wifiPassword">
		</view>
		<button @click="setWiFi">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wifiName: "",
				wifiPassword: ""
			}
		},
		methods: {
			save() {
				uni.navigateTo({
					url: '/pages/config/index/index'
				})
			},
			onLoad() {
				this.token = uni.getStorageSync("token")
				uni.request({
					url: '/cgi-bin/luci/api/xqsystem/getWiFi', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token: this.token,
					},
					//成功回调
					success: (res) => {
						if (res.data.code == 200) {
							this.wifiName = res.data.wifiName
							this.wifiPassword = res.data.wifiPassword
						} else {
							uni.navigateTo({
								url:"/main"
							})
						}
					},
					fail:(err)=>{
						this.text = 'WiFi设置-接口调用失败!';
					},
					complete: (val) => {
						if (this.text ) {
							uni.showToast({ title: this.text, icon: 'none' });
						}
					}
				});
			},
			setWiFi:function(e) {
				uni.request({
					url: '/cgi-bin/luci/api/xqsystem/setWiFi', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token: this.token,
						wifiName:this.wifiName,
						wifiPassword:this.wifiPassword,
					},
					//成功回调
					success: (res) => {
						if (res.data.code == 200) {
							this.text = "配置成功，Wi-Fi正在重启..."
							uni.navigateTo({
								url:"/main"
							})
						} else {
							uni.navigateTo({
								url:"/main"
							})
						}
					},
					// 失败回调
					fail:(err)=>{
						this.text = '接口调用失败x!';
					},
					// 结束回调（成功失败都会执行）
					complete: (val) => {
						if (this.text ) {
							uni.showToast({ title: this.text, icon: 'none' });
						}
					}
				});
			}
		}
	}
</script>

<style>
	.img-a {
		position: absolute;
		width: 100%;
		/* top: -280rpx; */
		right: -100rpx;
	}

	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		margin-bottom: -200rpx;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		color: #000;
	}

	.t-login button {
		font-size: 28rpx;
		background: #2796f2;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
	}

	.t-b {
		text-align: left;
		font-size: 46rpx;
		color: #000;
		padding: 120rpx 0 120rpx 0;
		font-weight: bold;
	}

	.t-login input {
		padding: 0 20rpx 0 120rpx;
		height: 80rpx;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #f8f7fc;
		border: 1px solid #e9e9e9;
		font-size: 28rpx;
		border-radius: 50rpx;
	}

	.t-login .t-a {
		position: relative;
	}

	.t-login .t-a span {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 10rpx;
		font-size: 12px;
		width: 75px;
		display: inline-block;
		text-align: center;
	}
	
::v-deep .uni-input-wrapper {
		left: 20px;
	}
</style>
