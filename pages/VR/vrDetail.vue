<template>
		<view class="content">
			<view class="bg">
				<image class="picbg" src="../../static/images/vrPic/slhz.png"></image>
			</view>
			<view class="container">
				
				<view class="intro">
					<view class="title">{{intro.title}}</view>
					<div class="introduction" v-html="intro.text"></div>
					<!-- 要换行只能用div和v-html诶  -->
				</view>
				
				<view class="zhankai">
					<view class="fold">展开更多</view>
					<view class="arrow">
						<image class="arrowDown" src="../../static/images/iCons/arrowDownGrey.png"></image>
					</view>
				</view>
				
				<view class="recommend">
					<view class="title">推荐</view>
					
					<view class="listView">
						<view class="rec" v-for="(item, index) in recItem" :key="index">
							<image class="recPic" :src="item.img"></image>
							<view class="recName">{{item.name}}</view>
						</view>
					</view>
					
				</view>
				
				<view class="quanjing">
					<view class="title">VR全景</view>
					<image class="vr360" :src="vr360.img"></image>
				</view>
				
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'VR详情',
				intro: {
					title: "十里红妆博物馆",
					text: "十里红妆博物馆：宁海“十里红妆”博物馆创建于2003年9月，2004年5月正式对外开放，它是一家展示古代女子生活的专题博物馆，也是省内规模最大的民间民俗博物馆。<br/>博物馆采用场景布展和藏品归类布展相结合，有嫁妆场景，有木桶房、绣房、闺房、书房、婚房、妾房和百床风情等展厅。"
				},
				recItem: [
					{
						name: "沙村",
						img: "../../static/images/vrPic/sc.png"
					},
					{
						name: "舟山博物馆",
						img: "../../static/images/vrPic/zs.png"
					},
					{
						name: "定海古城",
						img: "../../static/images/vrPic/dhgc.png"
					},
				],
				vr360:{
					img: "../../static/images/vrPic/vr360.png"
				}
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
	
	.bg{
		position: absolute;
		width: 100%;
		height: 542rpx;
	}
	
	.picbg{
		width: 100%;
		height: 542rpx;
	}
	
	.container{
		width: 100%;
		height: 1170rpx;
		background-color: #F9F3EB;
		position: absolute;
		margin-top: 446rpx;
		border-radius: 60rpx 60rpx 0 0;
	}
	
	.intro{
		margin: 48rpx 48rpx 24rpx 48rpx;
	}
	
	.title{
		font-size: 32rpx;
		line-height: 46rpx;
		color: #382321;
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	
	.introduction{
		font-size: 24rpx;
		letter-spacing: 0.02em;
		color: #73615D;
	}
	
	.zhankai{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.arrowDown{
		width: 18rpx;
		height: 20.16rpx;
		margin-left: 10rpx;
	}
	
	.fold{
		font-size: 24rpx;
		color: #382321;
	}
	
	.recommend{
		margin-left: 48rpx;
		margin-top: 48rpx;
	}
	
	.listView{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.rec{
		margin-right: 30rpx;
	}
	
	.recPic{
		width: 280rpx;
		height: 300rpx;
		border-radius: 20rpx;
	}
	
	.recName{
		font-size: 28rpx;
		line-height: 40rpx;
		color: #382321;
	}
	
	.quanjing{
		margin-top: 48rpx;
		margin-left: 48rpx;
	}
	
	.vr360{
		width: 652rpx;
		height: 346.12rpx;
		border-radius: 20rpx;
		margin-bottom: 48rpx;
	}
	
</style>
