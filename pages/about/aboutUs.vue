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
				title: '关于我们',
				logo: "../../static/images/iCons/logo.png",
				name: "国际研学",
				platform: "中国非遗对外服务平台",
				introText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0我们的团队由数字媒体技术中本科生、研究生和国际信息学院学生组成，拥有在媒体制作和技术开发方面的经验。"
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
