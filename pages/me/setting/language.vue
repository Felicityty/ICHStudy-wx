<template>
	<view class="container">
		<view class="chinese">
			<text style="font-size: 32rpx;color: #382321;">简体中文</text>
			<image src="../../../static/images/iCons/check.png" mode="aspectFill" class="check"></image>
		</view>
		
		<view class="english">
			<text style="font-size: 32rpx;color: #382321;">English</text>
			<image src="../../../static/images/iCons/check.png" mode="aspectFill" class="check"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.check{
		width: 40rpx;
		height: 40rpx;
	}
	
	.chinese,.english{
		width: 654rpx;
		height: 79rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.english{
		margin-top: 0rpx;
	}
</style>
