<template>
		<view class="content">
			
			<view class="bg">
				<image class="picbg" src="../../static/images/banner.png"></image>
			</view>
			
			<view class="container">
				
				<view class="course">
					
					<view class="row">
						<view class="title">课程</view>
						<view class="allCourse">
							<view class="allText">全部</view>
							<view class="allArrow">
								<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
							</view>
						</view>
					</view>
					
					<view class="listView">
						<view class="cou" v-for="(item, index) in courseItem" :key="index">
							<image class="couPic" :src="item.img"></image>
							<view class="couName">{{item.name}}</view>
						</view>
					</view>
				</view>
				
				<view class="VR">
					
					<view class="row">
						<view class="title">VR</view>
						<view class="allVR">
							<view class="allText">全部</view>
							<view class="allArrow">
								<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
							</view>
						</view>
					</view>
					
					<view class="listView">
						<view class="cou" v-for="(item, index) in vrItem" :key="key">
							<image class="couPic" :src="item.img"></image>
							<view class="couName">{{item.name}}</view>
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '首页',
				courseItem: [
					{
						name: "扯白糖",
						img: "../../static/images/coursePic/course1.png"
					},
					{
						name: "圆木制作",
						img: "../../static/images/coursePic/course3.png"
					},
					{
						name: "十里红妆博物馆",
						img: "../../static/images/coursePic/course4.png"
					},
				],
				vrItem: [
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
				],
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
		height: 620rpx;
	}
	
	.picbg{
		width: 100%;
		height: 620rpx;
	}
	
	.container{
		width: 100%;
		height: 1040rpx;
		background-color: #F9F3EB;
		position: absolute;
		margin-top: 486rpx;
		border-radius: 60rpx 60rpx 0 0;
	}
	
	.title{
		font-size: 32rpx;
		line-height: 46rpx;
		color: #382321;
		font-weight: 600;
		margin-bottom: 36rpx;
	}
	
	.course, .VR{
		margin-left: 48rpx;
		margin-top: 48rpx;
	}
	
	.row{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.allCourse{
		margin-left: 516rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.allVR{
		margin-left: 534rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.arrowRight{
		width: 18rpx;
		height: 20.16rpx;
		margin-left: 10rpx;
		margin-bottom: 3rpx;
	}
	
	.allText{
		font-size: 24rpx;
		color: #382321;
	}
	
	.listView{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.cou{
		margin-right: 30rpx;
	}
	
	.couPic{
		width: 280rpx;
		height: 300rpx;
		border-radius: 20rpx;
	}
	
	.couName{
		font-size: 28rpx;
		line-height: 40rpx;
		color: #382321;
	}
	
</style>
