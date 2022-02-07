<template>
	<view class="content">
		<view class="index-bg">
			<image class="bg-pic" src="../../static/images/indexPic.png" mode="widthFix"></image>
		</view>
		<view class="btns">
			<view class="index-btn" @click="go('login')">登录</view>
			<view class="index-btn" @click="go('register')">注册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			go(url){
				uni.navigateTo({
					url,
				})
			}				
		}
	}
</script>

<style>
	.content {
		width: 750rpx;
		height: 100%;
		position: relative;
	}
	
	.index-bg{
		position: absolute;
		width: 100%;
		height: 542rpx;
	}
	
	.bg-pic{
		width: 100%;
	}
	
	.btns{
		display: flex;
		flex-direction: row;
		position: absolute;
		left: 72rpx;
		right: 72rpx;
		top: 1314rpx;
		justify-content: space-between;
	}
	
	.index-btn {
		width: 268rpx;
		height: 82rpx;
		border-radius: 20rpx;
		background-color: #987744;
		text-align: center;
		line-height: 82rpx;
		font-size: 36rpx;
		color: #FFFFFF;
	}
	
</style>
