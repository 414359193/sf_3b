<template>
	<view class="t-login">
		<!-- <image class="img-a" src="@/static/2.png"></image> -->
		<view class="t-t">
			<text>服务设置</text>
		</view>
		<view class="t-a">
			<span>服务ID</span>
			<input placeholder="" v-model="servid" />
		</view>
		<view style="margin-bottom: 50rpx;"><uni-data-select v-model="value" :localdata="range" :clear="false"></uni-data-select></view>
		<view v-if="value===1">
			<view class="t-a">
				<span>服务IP</span>
				<input placeholder="" v-model="servip" />
			</view>
			<view class="t-a">
				<span>UDP端口</span>
				<input placeholder="" v-model="udpport" />
			</view>
			<view class="t-a">
				<span>TCP端口</span>
				<input placeholder="" v-model="tcpport" />
			</view>
		</view>
		<button @click="setServ">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				servid: "", //服务ID
				servip:"",
				udpport: "", //UDP端口
				tcpport: "" ,//TCP端口
				value:0,
				range:[{
					value:0,
					text:"公网部署"
				},
				{
					value:1,
					text:"私网部署"
				}]
	
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
					url: '/cgi-bin/luci/api/xqsystem/getServ', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token: this.token,
					},
					//成功回调
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.servid = res.data.servid
							this.servip = res.data.servip
							this.tcpport = res.data.tcpport
							this.udpport = res.data.udpport
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
						if (this.text ) {
							uni.showToast({ title: this.text, icon: 'none' });	
						}
					}
				});
			},
			setServ:function(e) {
				uni.request({
					url: '/cgi-bin/luci/api/xqsystem/setServ', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token: this.token,
						servid:this.servid,
						servip:this.servip,
						tcpport:this.tcpport,
						udpport:this.udpport,
					},
					//成功回调
					success: (res) => {
						if (res.data.code == 200) {
							this.text = "配置成功，重启服务中..."
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
						this.text = '接口调用失败!';
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

	/* button {
		font-size: 28rpx;
		background: #5677fc;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
	} */
	.t-login button {
		font-size: 28rpx;
		background: #2796f2;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		margin-top: 40rpx;
	}

	.t-t {
		text-align: left;
		font-size: 46rpx;
		color: #000;
		padding: 120rpx 0 120rpx 0;
		font-weight: bold;
	}

	.t-login input {
		padding: 0 20rpx 0 140rpx;
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
		left: 15rpx;
		font-size: 25rpx;
		width: 60px;
		display: inline-block;
		text-align: center;
	}
</style>
