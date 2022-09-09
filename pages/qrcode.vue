<template>
	<view
		style="height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;">
		<!--显示图片用的标签-->
		<image class="container-4-item-v-ewm" 
		:src="ewmImg"
		style="background:#fff;
		width: 200px;
		height: 200px;"
		></image>
		<!--创建一个画布，将它移出屏幕外看不到的地方-->
		<canvas class="canvas-code" canvas-id="myQrcode" style="background:#fff;width: 200px;height: 200px; display:block; left:-800rpx;position:absolute;"/>

	</view>
</template>

<script>
	import QRCode from '../utils/weapp-qrcode.js';
	export default {
		data() {
			return {
				ewmImg: ''
			}
		},
		methods: {
			
		},
		onLoad(){
			new QRCode('myQrcode',{
				text: '123',   // 扫出来的内容
				width: 141,	//canvas 画布的宽
				height: 141,	//canvas 画布的高
				padding: 0, // 生成二维码四周自动留边宽度，不传入默认为0
				correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
				callback: (res) => {
					//工具回调数据
					// 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
					wx.hideLoading()
					console.log("生成二维码",res)
					//将图片路劲放入data中，显示在wxml的image标签上
					this.ewmImg = res.path
					// that.setData({
					// 	ewmImg:res.path,
					// 	showEwmIndex:e.currentTarget.dataset.index
					// })
				
				}
			})
			console.log(this.ewmImg)
		}
	}
</script>

<style>
body{height: 100%;}
</style>
