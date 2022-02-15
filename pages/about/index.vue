<template>
		<view class="content">
			
			<view class="logo-group">
				<image class="logo" :src="logo"></image>
				<view class="name">{{name}}</view>
				<view class="platform">{{platform}}</view>
			</view>
			
			<view class="buttons">
				
				<view class="list-items" v-for="(item, index) in buttonItems" :key="index" @click="goDetail(item.url)">
					<!-- v-for 里一定要把item放前面 -->
					<view class="button">
						<view class="text-btn">{{item.name}}</view>
						<view class="arrow-btn">
							<image class="arrow-right" :src="arrowRight"></image>
						</view>
					</view>
					<view class="divide"></view>
				</view>
				
			</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '关于',
				logo: "../../static/images/iCons/logo.png",
				name: "国际研学",
				platform: "中国非遗对外服务平台",
				arrowRight: "../../static/images/iCons/arrowRightGrey.png",
				buttonItems: [
					{
						name: "平台介绍",
						url: "./platformIntro"
					},
					{
						name: "关于我们",
						url: "./aboutUs"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: e
				})
			},
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
	
	.buttons{
		width: 654rpx;
		height: 152rpx;
		background: #FFFBF8;
		box-shadow: 0 4rpx 4rpx rgba(0, 0, 0, 0.12);
		border-radius: 20rpx;
		margin: 60rpx 0 0 48rpx;
	}
	
	.button{
		display: flex;
		align-items: center;
		height: 76rpx;
	}
	
	.text-btn{
		margin-left: 20.42rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #382321;
	}
	
	.arrow-right{
		width: 23rpx;
		height: 25.7rpx;
		/* margin-left: 480rpx; */
		position: absolute;
		right: 10%;
		transform: translateY(-40%);
	}
	
	.divide{
		width: 617.16rpx;
		height: 1rpx;
		background-color: #E5E5E5;
		margin-left: 18.42rpx;
	}
	
</style>
