<template>
	<view class="container">
		<view class="user" @click="set()">
			<image :src="touxiang" mode="aspectFill" style="width: 104rpx; height: 104rpx;"></image>
			<text class="user_name">{{username}}</text>
			<image :src="arrow" mode="aspectFill" class="user_arrow"></image>
		</view>
		
		<view class="content">
			<view class="point">
				<view class="point_score">{{point}}</view>
				<text class="point_text">积分</text>
			</view>
			<view class="duration">
				<view class="duration_score">{{hour}} H {{minute}} M </view>
				<text class="point_text">学习总时长</text>
			</view>
			<view class="times">
				<text class="times_text">观看视频总次数</text>
				<view class="times_time">{{times}}</view>
			</view>
			<view class="max">
				<text class="max_text">观看最多的视频</text>
				<view class="max_content">
					<view class="max_video">{{maxVideo}}</view>
					<view class="max_time">{{maxTimes}}</view>
				</view>
			</view>
			
			<view class="setting">
				<view class="setting_item" v-for="(item, index) in settingItems" :key="index" @click="go(item.url)">
					<view class="text">{{item.name}}</view>
					<image :src="arrow" mode="aspectFill" class="setting_arrow"></image>
				</view>
			</view>
				
			<view class="shopping">
				<view class="shopping_item" v-for="(item, index) in shoppingItems" :key="index" @click="go(item.url)">
					<view class="text">{{item.name}}</view>
					<image :src="arrow" mode="aspectFill" class="setting_arrow"></image>
				</view>
			</view>
			<button type="default" class="btn">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				touxiang: '../../static/images/iCons/touxiang.png',
				arrow: '../../static/images/iCons/arrowRightLightbrown.png',
				settingItems: [
					{
						name: '历史记录',
						url: 'history'
					},
					{
						name: '语言',
						url: 'language'
					},
					{
						name: '关于',
						url: 'about'
					}
				],
				shoppingItems: [
					{
						name: '我的地址',
						url: ''
					},
					{
						name: '我的订单',
						url: ''
					}
				],
				username: '用户名',
				point: 0,
				hour: 0,
				minute: 0,
				times: 0,
				maxVideo: '扯白糖纪录片',
				maxTimes: 2
			}
		},
		onLoad() {

		},
		methods: {
			set(){
				console.log(1)
				uni.navigateTo({
					url: "./setting/index"
				})
			},
			go(url) {
				if (url === 'history' || url === 'language') {
					uni.navigateTo({
						url: './setting/' + url
					})
				} else if (url === 'about') {
					uni.navigateTo({
						url: './../about/index'
					})
				}
			},
		}
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.text{
		font-size: 28rpx;
		color: #382321;
	}
	
	.times_text{
		font-size: 28rpx;
		color: #73615D;
		margin-left: 30rpx;
	}
	
	.max_text{
		font-size: 24rpx;
		color: #73615D;
		margin-left:30rpx;
		margin-top:24rpx;
	}
	
	.point_text{
		font-size: 28rpx;
		color: #73615D;
	}
	
	.user{
		width: 654rpx;
		height: 108rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		top: 30rpx;
	}
	
	.user_name{
		margin-left: 30rpx;
	}
	
	.user_arrow{
		width: 14rpx;
		height: 28rpx;
		margin-left: 408rpx;
	}
	
	.content{
		width: 654rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: relative;
		top: 76rpx;
	}
	
	.point,.duration{
		width: 312rpx;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content:center;
		border-radius: 20rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #ffffff;
	}
	
	.point_score,.duration_score{
		font-size: 36rpx;
		color: #382321;
		margin-bottom: 10rpx;
	}
	
	.duration{
		margin-left: 30rpx;
	}
	
	.times{
		width: 654rpx;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #ffffff;
	}
	
	.times_time{
		font-size: 36rpx;
		color: #382321;
		margin-top: 4rpx;
		margin-left: 374rpx;
	}
	
	.max{
		width: 654rpx;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #FFFFFF;
	}
	
	.max_content{
		width: 594rpx;
		margin-left: 30rpx;
		margin-top: 14rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.max_video{
		font-size: 28rpx;
		color: #382321;
	}
	
	.max_time{
		font-size: 36rpx;
		color: #382321;
	}
	
	.setting{
		width: 654rpx;
		height: 240rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #FFFFFF;
	}
	
	.setting_arrow{
		width: 14rpx;
		height: 28rpx;
	}
	
	.setting_item{
		width: 594rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		margin-top: 0rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.shopping{
		width: 654rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #FFFFFF;
	}
	
	.shopping_item{
		width: 594rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		margin-top: 0rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.btn{
		width: 654rpx;
		height: 80rpx;
		margin-top: 30rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}
</style>
