(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-config-index-index"],{"0f60":function(t,n,e){var a=e("5166");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("201e2e3c",a,!0,{sourceMap:!1,shadowMode:!1})},"166a":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"t-login"},[e("v-uni-view",{staticClass:"t-a"},t._l(t.runInfo,(function(n,a){var i=n.text,o=n.value;return e("v-uni-view",{staticClass:"t-b"},[t._v(t._s(i)+":"+t._s(t.renderValue(a,o)))])})),1),e("v-uni-view",{staticClass:"btn"},[e("v-uni-navigator",{attrs:{url:"../network-config/network-config","open-type":"navigate"}},[e("v-uni-button",[t._v("上网设置")])],1),e("v-uni-navigator",{attrs:{url:"../wifi-config/wifi-config","open-type":"navigate"}},[e("v-uni-button",[t._v("Wi-Fi设置")])],1),e("v-uni-navigator",{attrs:{url:"../service-config/service-config","open-type":"navigate"}},[e("v-uni-button",[t._v("服务设置")])],1)],1)],1)},i=[]},"48b4":function(t,n,e){"use strict";(function(t){e("7a82");var a=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e("3835"));e("4fad"),e("13d5"),e("d3b7");var o={data:function(){return{runInfo:{status:{text:"运行状态",value:0},version:{text:"软件版本",value:"0.0.0"},baseStation:{text:"基站地址",value:""},network:{text:"网口状态",value:{LAN:0,WAN:0}},serveId:{text:"门店编码",value:""},serveAdd:{text:"服务地址",value:""}},lansta:0,wansta:0,wanip:"",wifiip:"",servid:"",servip:"",apsoft:"",state:""}},computed:{statusDetail:function(){var t=0===this.runInfo.status.value?0:1;return["离线","在线"][t]},networkDetail:function(){for(var t=["未连接","已连接"],n=Object.assign({},this.runInfo.network.value),e=0,a=Object.entries(this.runInfo.network.value);e<a.length;e++){var o=(0,i.default)(a[e],2),r=o[0],u=o[1];n[r]=t[0===u?0:1]}return Object.entries(n).reduce((function(t,n){var e=(0,i.default)(n,2),a=e[0],o=e[1];return t+a+o+" "}),"")}},methods:{onLoad:function(){var n=this;this.token=uni.getStorageSync("token"),uni.request({url:"http://192.168.16.1/cgi-bin/luci/api/xqsystem/getRunInfo",method:"POST",data:{token:this.token},success:function(e){t("log",e.data," at pages/config/index/index.vue:106"),200==e.data.code?("online"==e.data.state?n.runInfo.status.value=1:n.runInfo.status.value=0,n.runInfo.version.value=e.data.apsoft,n.runInfo.serveId.value=e.data.servid,n.runInfo.serveAdd.value=e.data.servip,n.runInfo.baseStation.value=e.data.wanip,"1"==e.data.lansta&&(n.runInfo.network.value.LAN=1),"1"==e.data.wansta&&(n.runInfo.network.value.WAN=1)):n.text="密码错误"+e.statusCode+e.data},fail:function(e){t("log",e," at pages/config/index/index.vue:131"),n.text="接口调用失败ba!"},complete:function(e){t("log",e," at pages/config/index/index.vue:136"),n.text&&uni.showToast({title:n.text,icon:"none"})}})},renderValue:function(t,n){return this[t+"Detail"]?this[t+"Detail"]:n}}};n.default=o}).call(this,e("0de9")["log"])},"4d3d":function(t,n,e){"use strict";e.r(n);var a=e("48b4"),i=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},"4fad":function(t,n,e){var a=e("23e7"),i=e("6f53").entries;a({target:"Object",stat:!0},{entries:function(t){return i(t)}})},5166:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,".t-login[data-v-38da36eb]{width:%?600?%;margin:0 auto;font-size:%?28?%;color:#000}.t-login uni-button[data-v-38da36eb]{font-size:%?28?%;background:#5677fc;color:#fff;height:%?90?%;line-height:%?90?%;border-radius:%?50?%;box-shadow:0 5px 7px 0 rgba(86,119,252,.2);margin:%?40?%}.t-bc[data-v-38da36eb]{width:100vw;box-sizing:border-box;padding:0 %?60?%;font-size:%?28?%;color:#000}.t-bc uni-button[data-v-38da36eb]{font-size:%?28?%;background:#5677fc;color:#fff;height:%?90?%;line-height:%?90?%;border-radius:%?50?%;box-shadow:0 5px 7px 0 rgba(86,119,252,.2);margin:%?40?%}.btn[data-v-38da36eb]{margin-top:%}.t-a[data-v-38da36eb]{font-size:%?35?%;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:100;display:flex;flex-direction:column;justify-content:center;width:-webkit-max-content;width:max-content;margin:0 auto 0;padding-top:%?40?%;font-family:Times New Roman,Times,serif}.t-b[data-v-38da36eb]{margin:%?10?%}",""]),t.exports=n},"7cc6":function(t,n,e){"use strict";var a=e("0f60"),i=e.n(a);i.a},de54:function(t,n,e){"use strict";e.r(n);var a=e("166a"),i=e("4d3d");for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("7cc6");var r=e("f0c5"),u=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"38da36eb",null,!1,a["a"],void 0);n["default"]=u.exports}}]);