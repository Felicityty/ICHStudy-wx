<template>
	<view class="tourist-item" @click="go(info.id)">
		<image :src="info.img" mode="aspectFill" class="tourist-item-img"></image>
		<view class="tourist-item-info">
			<view class="tourist-item-info-name">{{ language ? info.enname : info.cnname }}</view>
			<view class="tourist-item-info-add">
				<image class="icon" :src='iconSrc.addr'></image>
				<text class="text">{{ language ? info.enlocation : info.cnlocation }}</text>
			</view>
			<view class="tourist-item-info-time">
				<image class="icon" :src='iconSrc.time'></image>
				<text class="text">{{ language ? 'As of' + info.deadline : info.deadline + '截止' }}</text>
			</view>
			<view class="tourist-item-info-price">{{ language ? '$' + info.price : '￥' +info.price }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'touristItem',
		props: {
			info:{
				type: Object,
			  default: {}
			},
			language:{
				type: Number,
			  default: 1
			}
		},
		data() {
			return {
				iconSrc: {
					'addr': '/static/images/iCons/addr.png',
					'time': '/static/images/iCons/time.png'
				}
			}
		},
		methods: {
			go(id) {
				const that = this
				uni.navigateTo({
					url: '/subPackages/pages/tourist/tourDetail?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	.tourist-item {
		width: 654rpx;
		display: flex;
		justify-content: space-between;
		margin: 36rpx 0 36rpx 48rpx;
	}
	
	.tourist-item-img {
		width: 264rpx;
		height: 264rpx;
		border-radius: 20rpx;
	}
	
	.tourist-item-info {
		width: 360rpx;
		margin-left: 24rpx;
		position: relative;
	}
	
	.tourist-item-info-name {
		font-size: 32rpx;
		color: #382321;
		margin-bottom: 12rpx;
	}
	
	.tourist-item-info-add {
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #73615D;
		margin-bottom: 12rpx;
	}
	
	.tourist-item-info-time {
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #73615D;
		margin-bottom: 12rpx;
	}
	
	.text {
		width: 320rpx;
	}
	.icon {
		height: 32rpx;
		width: 32rpx;
		margin-right: 4rpx;
	}
	
	.tourist-item-info-price {
		font-size: 28rpx;
		color: #FB8539;
		/* 子盒子固定在父盒子底部 */
		position: absolute;
		bottom: 0;
	}
	
	
</style>
