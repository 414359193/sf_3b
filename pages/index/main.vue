<!-- 蓝色登录页面2 -->
<template>
	<view>
		<view class="img-a">
			<view class="t-b">
				您好，
				<br />
				欢迎使用E3B
			</view>
		</view>
		<view class="login-view" style="">
			<view class="t-login">
				<form class="cl">
				<!-- 	<view class="t-a">
						<text class="txt">手机号</text>
						<input type="number" name="phone" placeholder="请输入您的手机号" maxlength="11" v-model="phone" />
					</view> -->
					<view class="t-a">
						<text class="txt">密码</text>
						<view class="t-p">
							<input type="text" :password="showPassword" name="code" maxlength="18" placeholder="请输入您的密码" v-model="pwd" />
							<uni-icons :type="showPassword?'eye':'eye-slash'" size="30" @click="showPwd"></uni-icons>
						</view>
						
					</view>
					<button @tap="login()">登 录</button>
					<!-- <view class="reg" @tap="reg()">注 册</view> -->
				</form>
			<!-- 	<view class="t-f"><text>—————— 第三方账号登录 ——————</text></view>
				<view class="t-e cl">
					<view class="t-g" @tap="wxLogin()">
						<image src="@/static/wx.png"></image>
					</view>
					<view class="t-g" @tap="zfbLogin()">
						<image src="@/static/qq.png"></image>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		/**
		 * 2020年12月8日   李新雷编写（练习）  适用所有app登录
		 * vue版本简洁又美观的登录页面（个人感觉插件市场的登录都不太好看，哈哈 O(∩_∩)O）
		 * 该模板只是登录模板，如果需要注册，直接复制该页面稍微改动即可
		 */
		data() {
			return {
				phone: '', //手机号码
				pwd: '' ,//密码
				showPassword: true,
			};
		},
		onLoad() {},
		methods: {
			//当前登录按钮操作
			login() {
				var that = this;
				// if (!that.phone) {
				// 	uni.showToast({ title: '请输入用户', icon: 'none' });
				// 	return;
				// }
				if (!that.pwd) {
					uni.showToast({ title: '请输入密码', icon: 'none' });
					return;
				}
				// 接口验证
				uni.request({
					url: '/cgi-bin/luci/api/xqsystem/login', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						username: that.phone,
						password: that.pwd
					},
					//成功回调
					success: (res) => {
						if (res.data.code == 200) {
							uni.setStorageSync("token",res.data.token)
							// this.text = '登录成功!';
							uni.navigateTo({
								url:"/pages/config/index/index"
							})
						} else {
							this.text = '密码错误!';
						}
					},
					// 失败回调
					fail:(err)=>{
						this.text = '接口调用失败!';
					},
					// 结束回调（成功失败都会执行）
					complete: (val) => {
						uni.showToast({ title: this.text, icon: 'none' });
					}
				});
			},
			showPwd:function(){
				this.showPassword =!this.showPassword
				
			}
		}
		
	};
</script>
<style>
	.txt {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin-right: 20rpx;
	}

	.img-a {
		width: 100%;
		height: 450rpx;
		background-image: url(../../static/head.png);
		background-size: 100%;
	}

	.reg {
		font-size: 28rpx;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		background: #f5f6fa;
		color: #000000;
		text-align: center;
		margin-top: 30rpx;
	}

	.login-view {
		width: 100%;
		position: relative;
		margin-top: -120rpx;
		background-color: #ffffff;
		border-radius: 8% 8% 0% 0;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		padding-top: 80rpx;
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

	.t-login .t-p input {
		height: 90rpx;
		line-height: 90rpx;
		border-bottom: 1px solid #e9e9e9;
		font-size: 28rpx;
		flex: 1;
	}
	.t-login .t-p .uni-icons{
		top: 6px;
		right: 3px;
		position: absolute;
	}
 .t-login .t-p{
	 flex: 1;
	 position: relative;
 }
	.t-login .t-a {
		position: relative;
		display: flex;
		flex-direction: column;
		
		margin-bottom: 50rpx;
        width: 100%;
	}

	.t-b {
		text-align: left;
		font-size: 42rpx;
		color: #ffffff;
		padding: 130rpx 0 0 70rpx;
		font-weight: bold;
		line-height: 70rpx;
	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}

/* 	.t-login .t-f {
		text-align: center;
		margin: 150rpx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	} */

	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}

	.cl {
		zoom: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
/* 	.t-p{
		display: flex;

	} */


</style>
