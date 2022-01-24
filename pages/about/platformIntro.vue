<template>
		<view class="content">
			
			<view class="logo-group">
				<image class="logo" :src="logo"></image>
				<view class="name">{{name}}</view>
				<view class="platform">{{platform}}</view>
			</view>
			
			<view class="text">{{introText}}</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '平台介绍',
				logo: "../../static/images/iCons/logo.png",
				name: "国际研学",
				platform: "中国非遗对外服务平台",
				introText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0我们以留学生为主要服务群体，以非传统、民间工艺等中国传统文化为教学内容，开发线上线下研究平台。"
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.content{
		width: 750rpx;
		height: 100%;
		position: relative;
	}
	
	.logo-group{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	
	.logo{
		height: 141.72rpx;
		width: 160rpx;
		margin-top: 48rpx;
	}
	
	.name{
		margin-top: 16.28rpx;
		font-size: 40rpx;
		line-height: 58rpx;
		color: #382321;
	}
	
	.platform{
		font-size: 24rpx;
		line-height: 34rpx;
		color: #382321;
	}
	
	.text{
		font-size: 28rpx;
		line-height: 36rpx;
		letter-spacing: 0.02em;
		color: #382321;
		margin:60rpx 48rpx 0 48rpx;
	}
	
</style>
