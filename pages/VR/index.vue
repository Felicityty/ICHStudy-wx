<template>
		<view class="content">
			
			<view class="searchBox">
				<image src="../../static/images/iCons/search.png" class="searchIcon"></image>
				<view class="searchText">搜索VR/AR名称</view>
			</view>
			
			<view class="listView">
				<view class="listItem" v-for="(item, index) in vrItem" :key="index">
					<image class="listViewPic" :src="item.img"></image>
					<view class="listViewText">{{item.name}}</view>
				</view>
			</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'VR',
				vrItem: [
					{
						name: "沙村",
						img: "../../static/images/vrPic/sc.png"
					},
					{
						name: "十里红妆博物馆",
						img: "../../static/images/vrPic/slhz.png"
					},
					{
						name: "舟山博物馆",
						img: "../../static/images/vrPic/zs.png"
					},
					{
						name: "定海古城",
						img: "../../static/images/vrPic/dhgc.png"
					},
					{
						name: "龙珠",
						img: "../../static/images/vrPic/lz.png"
					},
					{
						name: "金沙",
						img: "../../static/images/vrPic/js.png"
					}
				]
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
	
	.searchBox{
		width: 654rpx;
		height: 64rpx;
		margin: 12rpx 48rpx 0;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	
	.searchIcon{
		width: 36rpx;
		height: 40rpx;
		margin-left: 18.22rpx;
	}
	
	.searchText{
		font-size: 28rpx;
		line-height: 40rpx;
		color: #73615D;
		margin-left: 11.28rpx;
	}
	
	.listView{
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 36rpx 48rpx;
	}
	
	.listViewPic{
		width: 654rpx;
		height: 312rpx;
		border-radius: 20rpx;
	}
	
	.listViewText{
		margin-top: 20rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		line-height: 20px;
		color: #382321;
	}
	
</style>
