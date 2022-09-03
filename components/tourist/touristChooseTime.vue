<template>
	<view class="choose-time">
		
		<view class="choose-time-tick">
			<image class="choose-time-tick-img" src="/static/images/iCons/tick.png"></image>
		</view>
		<view class="choose-time-asp">
			<view>{{ info.time }}</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:'touristChooseTime',
		props: {
			info:{
				type: Object,
		    default: {}
			}
		},
		data() {
			return {
				selectIndex: 0,
			}
		},
		created() {
			
		}
	}
</script>

<style scoped>
	.choose-time {
		width: 236rpx;
		height: 64rpx;
		border-radius: 10rpx;
		background-color: #F7F3E8;
		border: 1rpx solid #9E9993;
		position: relative;
		margin-right: 16rpx;
	}
	
	.choose-time-tick {
		width: 31rpx;
		height: 35rpx;
		border-radius: 0 10rpx 0 10rpx;
		background-color: #987744;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
	
	.choose-time-tick-img {
		width: 30rpx;
		height: 30rpx;
	}
	
	.choose-time-asp {
		font-size: 26rpx;
		color: #382321;
		line-height: 40rpx;
		position: absolute;
		margin: 10rpx 0 0 32rpx;
	}
</style>
