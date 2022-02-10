<template>
	<view class="content">
		<view class="back" @click="goOff()">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<view class="input-box">
			<input type="text" placeholder="请输入邮箱" v-model="email" placeholder-class="phcolor">
		</view>
		<view class="identify-code">
			<view class="identify-box">
				<input type="password" placeholder="请输入验证码" v-model="password" placeholder-class="phcolor">
			</view>
			<view class="identify-btn" @click="">发送验证码</view>
		</view>
		<view class="index-btn" @click="">注册</view>
		<image class="bg" src="../../static/images/indexBG.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			goOff() {
				uni.navigateBack({
				});
			},
		},
	}
</script>

<style>
	.back{
		height: 58rpx;
		width: 58rpx;
		background-color: #FFFFFF;
		border-radius: 100rpx;
		position: absolute;
		top: 90rpx;
		left: 48rpx;
	
	}
	
	.arrow-left{
		margin-top: 7rpx;
		height: 43rpx;
		width: 57rpx;
	}
	
	.bg {
	  width: 100%;
		height: 100%;
	  position: fixed;
	  top: 0;
	  left:0;
	  z-index: -99;
	}
	
	.content {
		padding-top: 31vh;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-left: 48rpx;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.identify-code{
		width: 654rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 54rpx;
	}
	
	.identify-box{
		width: 400rpx;
		border-bottom: 2rpx solid #D6CEBD;
	}
	
	.identify-box input{
		width: 400rpx;
	}
	
	.identify-btn{
		width: 210rpx;
		height: 68rpx;
		color: #FFFFFF;
		background-color: #987744;
		text-align: center;
		font-size: 28rpx;
		line-height: 68rpx;
		border-radius: 20rpx;
	}
	
	.index-btn{
		width: 654rpx;
		height: 84rpx;
		margin-top: 114rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 84rpx;
	}
</style>
