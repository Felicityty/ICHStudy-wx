<template>
	<view class="tabbar">
		
		<view class="home">
			<image class="home_pic_select" src="../../static/images/buttomIcons/home-2.png"
			mode="aspectFill" v-if="state===1"></image>
			<image class="home_pic" src="../../static/images/buttomIcons/home-1.png"
			mode="aspectFill" v-if="state===2||state===3||state===4" @click="go(1)"></image>
			<view class="title">{{isLanguage ? 'Home' : '首页'}}</view>
		</view>
		
		<view class="tourist">
			<image class="tourist_pic_select" src="../../static/images/buttomIcons/tourist-2.png"
			mode="aspectFill" v-if="state===2"></image>
			<image class="tourist_pic" src="../../static/images/buttomIcons/tourist-1.png"
			mode="aspectFill" v-if="state===1||state===3||state===4" @click="go(2)"></image>
			<view class="title">{{isLanguage ? 'Learn' : '学习'}}</view>
		</view>
		
		<view class="product">
			<image class="product_pic_select" src="../../static/images/buttomIcons/product-2.png"
			mode="aspectFill" v-if="state===3"></image>
			<image class="product_pic" src="../../static/images/buttomIcons/product-1.png"
			mode="aspectFill" v-if="state===1||state===2||state===4" @click="go(3)"></image>
			<view class="title">{{isLanguage ? 'HIBL' : '研学'}}</view>
		</view>
		
		<view class="me">
			<image class="me_pic_select" src="../../static/images/buttomIcons/me-2.png"
			mode="aspectFill" v-if="state===4"></image>
			<image class="me_pic" src="../../static/images/buttomIcons/me-1.png"
			mode="aspectFill" v-if="state===1||state===2||state===3" @click="go(4)"></image>
			<view class="title">{{isLanguage ? 'My' : '我的'}}</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				language: 1,
				isLanguage: true
			};
		},
		props:{
			state:{
				type: Number,
				default: 1
			}
		},
		onReady() {
			// const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
		},
		methods:{
			go(num){
				// 不在一个层级很难跳转 -> 写成绝对路径不就好啦
				if(num===1){
					uni.redirectTo({
						url:"/pages/home/index",
					})
				}else if(num===2){
					uni.redirectTo({
						url:"/pages/products/index",
					})
				}else if(num===3){
					uni.redirectTo({
						url:"/pages/tourist/index",
					})
				}else{
					uni.redirectTo({
						url:"/pages/me/index",
					})
				}
			},
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
		},
		
	}
</script>

<style>
	.tabbar{
		/* border: 1px solid #E6DECC; */
		box-shadow: 0 -1rpx 10rpx #E6DECC;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		/* height: 132rpx; */
		height: auto;
		padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
		width: 750rpx;
		display: flex;
		justify-content: space-around;
		background-color: #FEFBF3;
		z-index: 900;
		align-items: center;
	}
	
	.home, .tourist, .product, .me{
		width: 200rpx;
		height: 120rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.tabbar image{
		width: 50rpx;
		height: 50rpx;
		padding-top: 12rpx;
	}
	
	.title{
		margin-top: 8rpx;
		font-size: 24rpx;
		padding-bottom: 12rpx;
	}
	
</style>
