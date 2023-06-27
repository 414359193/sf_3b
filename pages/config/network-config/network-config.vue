<template>
	<!-- 上网设置 -->
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="@/static/2.png"></image> -->
		<!-- <image class="img-b" src="@/static/3.png"></image> -->
		<view class="t-b">
			<text>上网设置</text>
		</view>
		<uni-data-select v-model="value" :localdata="range" :clear="false"></uni-data-select>
		<view v-if="value===1">
			<view class="t-a">
				<span>IP</span>
				<input placeholder="请输入IP" v-model="ipaddr" />
			</view>
			<view class="t-a">
				<span>掩码</span>
				<input placeholder="请输入掩码" v-model="netmask" />
			</view>
			<view class="t-a">
				<span>网关</span>
				<input placeholder="请输入网关" v-model="gateway" />
			</view>
			<view class="t-a">
				<span>DNS</span>
				<input placeholder="请输入DNS" v-model="dns" />
			</view>
		</view>
		<view v-if="value===2">
			<view class="t-a">
				<span>名称</span>
				<input placeholder="请输入Wifi名称" v-model="wifiName" />
			</view>
			<view class="t-a">
				<span>密码</span>
				<input placeholder="请输入Wifi密码" v-model="wifiPassword" />
			</view>
		</view>
		<button @click="onSave" :loading="isLoad">保存</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				range: [{
						value: 0,
						text: "自动(DHCP)"
					},
					{
						value: 1,
						text: "手动"
					},
					{
						value: 2,
						text: "无线连接"
					},
				],
				modetype:0,
				ipaddr: "", //ip
				netmask: "", //掩码
				gateway: "", //网关
				dns: "", //DSN
				wifiName:"", //wifi名称
				wifiPassword: "", //wifi密码
				proto:"",
				isLoad:false

			}
		},
		methods: {
			save() {
				uni.navigateTo({
					url: '/pages/config/index/index'
				})
			},
			onSave() {
				this.isLoad=true
				this.token = uni.getStorageSync("token")
				if (this.value == 1) {
					this.proto = "static"
				} else if (this.value == 2) {
					this.proto = "apcli"
				} else {
					this.proto = "dhcp"	
				}
				let date = new Date();
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? "0" + MM : MM;
				let d = date.getDate();
				d = d < 10 ? "0" + d : d;
				let h = date.getHours();
				h = h < 10 ? "0" + h : h;
				let m = date.getMinutes();
				m = m < 10 ? "0" + m : m;
				let s = date.getSeconds();
				s = s < 10 ? "0" + s : s;
				let dateStr =  y+"/"+MM+"/"+d+"/"+h+":"+m+":"+s;
				
				uni.request({
					url: '/cgi-bin/luci/api/xqsystem/setWan', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token:this.token,
						modetype:this.value,
						proto:this.proto,
						ipaddr:this.ipaddr,
						netmask:this.netmask,
						gateway:this.gateway,
						wifiName:this.wifiName,
						wifiPassword:this.wifiPassword,
						utc: parseInt(new Date().getTime()/1000),
						date:dateStr,
						dns:this.dns,
					},
					//成功回调
					success: (res) => {
						if (res.data.code == 200) {
							// 读数据
							this.modetype = res.data.modetype
							this.proto = res.data.proto
							this.ipaddr = res.data.ipaddr
							this.netmask = res.data.netmask
							this.gateway = res.data.gateway
							if (res.data.dns) {
								this.dns = res.data.dns
							} else {
								this.dns = "res.data.dns"
							}
							if (this.modetype == 2) {
								this.value = 2
							} else if (res.data.proto == "static") {
								this.value = 1;	
							} else {
								this.value = 0
							}
						} else {
							this.text = '密码错误,请重新登录';
						}
					},
					// 失败回调
					fail:(err)=>{
						this.text = '网络设置-接口调用失败!';
					},
					// 结束回调（成功失败都会执行）
					complete: (val) => {
						this.isLoad=false
						if (this.text ) {
							uni.showToast({ title: this.text, icon: 'none' });
						}
					}
				});
			},
			onLoad() {
				this.token = uni.getStorageSync("token")
				uni.request({
					url: '/cgi-bin/luci/api/xqsystem/getWan', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token: this.token,
					},
					//成功回调
					success: (res) => {
						if (res.data.code == 200) {
							// 读数据
							this.value = res.data.index,
							this.ipaddr = res.data.ipaddr
							this.netmask = res.data.netmask
							this.proto = res.data.proto
							this.modetype = res.data.modetype
							this.gateway = res.data.gateway
							this.wifiName = res.data.wifiName
							this.wifiPassword = res.data.wifiPassword
									
							if (res.data.dns) {
								this.dns = res.data.dns	
							}
							if (this.modetype == 2) {
								this.value = 2
							} else if (res.data.proto == "static") {
								this.value = 1;	
							} else {
								this.value = 0
							}
						} else {
							this.text = '密码错误,请重新登录';
						}
					},
					// 失败回调
					fail:(err)=>{
						this.text = '网络配置-接口调用失败!';
					},
					// 结束回调（成功失败都会执行）
					complete: (val) => {
						if (this.text ) {
							uni.showToast({ title: this.text, icon: 'none' });	
						}
					}
				});
			},
			setLan:function(e) {
				uni.request({
					url: '/cgi-bin/luci/api/xqsystem/getRunInfo', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token:this.token,
						proto:this.proto,
						ipaddr:this.ipaddr,
						netmask:this.netmask,
						dns:this.dns,
					},
					//成功回调
					success: (res) => {
						if (res.data.code == 200) {
						
						} else {
							this.text = '密码错误!';
						}
					},
					// 失败回调
					fail:(err)=>{
						this.text = '网络设置-接口调用失败!';
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
	/* margin: 40rpx; */
	margin-top: 70rpx;
}
	.t-b {
		text-align: left;
		font-size: 24px;
		color: #000;
		padding: 120rpx 0 120rpx 0;
		font-weight: bold;
	}

	.t-login .t-a {
		position: relative;
	}

	.t-login .t-a span {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 15rpx;
		width: 50px;
		display: inline-block;
		text-align: center;
	}

	.t-login input {
		padding: 0 20rpx 0 120rpx;
		height: 42px;
		line-height: 90rpx;
		margin-bottom: 50rpx;
		background: #f8f7fc;
		border: 1px solid #e9e9e9;
		font-size: 28rpx;
		border-radius: 50rpx;
		margin-top: 10%;
	}
</style>
