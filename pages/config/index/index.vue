<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="@/static/2.png"></image> -->
		<view class="t-a">
			<view class="t-b"  v-for="({text,value},key) in runInfo">{{text}}:{{ renderValue(key,value)}}</view>
		</view>
		
		<!-- <image class="img-b" src="@/static/3.png"></image> -->
		<view class="t-c">
			<view class="t-d">
				<uni-link href="" text="高级模式>" fontSize="15" showUnderLine="false"></uni-link>
			</view>
			<navigator  hover-class="none" url="../network-config/network-config" open-type="navigate">
				<view class="t-t">
					<uni-icons custom-prefix="iconfont" type="icon-fuwushezhi" size="35"></uni-icons>
					<text>服务设置</text>
				</view>
				<view class="t-t">
					<uni-icons custom-prefix="iconfont" type="icon-shangwang" size="35"></uni-icons>
					<text>上网设置</text>
				</view>
				<view class="t-t">
					<uni-icons custom-prefix="iconfont" type="icon-wifi2" size="35"></uni-icons>
					<text>Wi-Fi设置</text>
				</view>
			</navigator>
			<!-- <navigator hover-class="none" url="../wifi-config/wifi-config" open-type="navigate">
				<button hover-class='none'>Wi-Fi设置</button>
			</navigator>
			<navigator hover-class="none" url="../service-config/service-config" open-type="navigate">
				<button hover-class='none'>服务设置</button>
			</navigator> -->
		</view>	
	</view>


</template>

<script>
	export default {
		data() {
			return {
				runInfo:{
					status:{
						text:'运行状态',
						value:0 // 0 or 1 
					},
					version:{
						text:'软件版本',
						value:'0.0.0'
					},
					baseStation:{
						text:'基站地址',
						value:""
					},
					network:{
						text:"网口状态",
						value:{
							LAN:0,
							WAN:0
						}
					},
					serveId:{
						text:"门店编码",
						value:""
					},
					serveAdd:{
						text:"服务地址",
						value:""
					}
				},
				lansta:0,
				wansta:0,
				wanip:"",
				wifiip:"",
				servid:"",
				servip:"",
				apsoft:"",
				state:"",
			}
		},
		computed:{
			// status==key     Detail
			statusDetail:function(){
				let statue = ["离线","在线"]
				const target = this.runInfo.status.value===0 ?0:1
				return statue[target]
			},
			networkDetail(){
				let statue = ["未连接","已连接"]
				let v = Object.assign({},this.runInfo.network.value)
				/*
				{    [text]:[value]
					LAN:1,
					WAN:1	
				}
				
				[[lan,1],[wan,1]]
				*/
			   
			   for (let [text,value] of Object.entries(this.runInfo.network.value) ) {
			   	    v[text] = statue[value===0 ?0:1]
			   }
				return Object.entries(v).reduce((pre,[text,value])=>pre+text+value+' ','')
			}
		},
		methods: {
			onLoad() {
				this.token = uni.getStorageSync("token")
				uni.request({
					url: 'http://192.168.16.1/cgi-bin/luci/api/xqsystem/getRunInfo', //仅为示例，并非真实接口地址。
					method:'POST',
					// 参数
					data: {
						token: this.token,
					},
					//成功回调
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 200) {
								if (res.data.state == "online") {
									this.runInfo.status.value = 1
								} else {
									this.runInfo.status.value = 0
								}
								this.runInfo.version.value = res.data.apsoft
								this.runInfo.serveId.value = res.data.servid
								this.runInfo.serveAdd.value = res.data.servip
								this.runInfo.baseStation.value = res.data.wanip
								if (res.data.lansta == "1") {
									this.runInfo.network.value.LAN = 1
								}
								if (res.data.wansta == "1") {
									this.runInfo.network.value.WAN = 1
								}
								
								
						} else {
							this.text = '密码错误'+res.statusCode+res.data;
						}
					},
					// 失败回调
					fail:(err)=>{
						console.log(err);
						this.text = '接口调用失败ba!';
					},
					// 结束回调（成功失败都会执行）
					complete: (val) => {	
						console.log(val)
						if (this.text ) {
							uni.showToast({ title: this.text, icon: 'none' });	
						}
						
					}			
				});
			},
			renderValue(key,value){
				if(this[key+'Detail']) return this[key+'Detail']
				return value
			},
		}
	}
</script>

<style>
.t-login {

	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

/* .t-login button {
	font-size: 28rpx;
	background: #2796f2;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	font-weight: bold;
	margin: 40rpx;
} */
.t-bc {	
	width: 100vw;
	box-sizing: border-box;
	padding: 0 60rpx;
	font-size: 28rpx;
	color: #000;
}

/* .t-bc button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
	margin: 40rpx;
} */
.t-a {
	font-size: 35rpx;
	transform:translate3d(0,0,0);
	z-index: 100;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: max-content;
	padding-top: 150rpx;
	font-family: "Times New Roman", Times, serif;
	/* text-align: center; */
    width: 600rpx;
	margin: 0 auto;
}
.t-b {
	margin: 10rpx;
}
.t-d {
	margin-left: 79%;
	margin-bottom: 10px;
	/* margin:  80rpx; */
	/* text-align: center; */
	font-family: "Times New Roman", Times, serif;
	}
.t-login .t-c{

padding: 0 70rpx 120rpx;
	position: fixed;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
}
.t-c navigator {
	
	display: flex;
	justify-content: space-between;
}
.t-t {
	flex-direction: column;
	align-items: center;
	display: flex;
	width: 70px;
	height: 90px;
	padding: 30rpx;
	/* margin: 20px; */
	/* padding: 13px; */
	background-color: #f8f7fc;
}
.t-t text {
	padding-bottom: 30px;
}
</style>
