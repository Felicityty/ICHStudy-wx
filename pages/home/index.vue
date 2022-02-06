<template>
		<view class="content">
			
			<view class="bg">
				<image class="picbg" src="../../static/images/banner.png"></image>
			</view>
			
			<view class="container">
				
				<view class="course">
					
					<view class="row">
						<view class="title">课程</view>
						<view class="allCourse" @click="goCourse()">
							<view class="allText">全部</view>
							<view class="allArrow">
								<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
							</view>
						</view>
					</view>
					
					<view class="listView">
					<!-- <view class="listView" bindtouchstart='touchStart' bindtouchmove='touchMove' bindtouchend='touchEnd' :style="'margin-left:' + left + 'rpx'"> -->
						<view class="listView-tile" v-for="(item, index) in courseItem" :key="index">
							<image class="couPic" :src="item.img"></image>
							<view class="couName">{{item.name}}</view>
						</view>
					</view>
				</view>
				
				<view class="VR">
					
					<view class="row">
						<view class="title">VR</view>
						<view class="allVR" @click="goVR()">
							<view class="allText">全部</view>
							<view class="allArrow">
								<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
							</view>
						</view>
					</view>
					
					<view class="listView">
						<view class="listView-tile" v-for="(item, index) in vrItem" :key="index" @click="goDetail(item.url)">
							<image class="couPic" :src="item.img"></image>
							<view class="couName">{{item.name}}</view>
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
</template>

<script>
	import { getCourseList } from '../../api/course/index.js'
	import { getFileUrl } from '../../common/index.js'
	export default {
		data() {
			return {
				title: '首页',
				courseItem: [],
				vrItem: [
					{
						name: "十里红妆博物馆",
						img: "../../static/images/vrPic/slhz.png",
						url: "./VR/vrDetail"
					},
					{
						name: "舟山博物馆",
						img: "../../static/images/vrPic/zs.png",
						url: ""
					},
					{
						name: "定海古城",
						img: "../../static/images/vrPic/dhgc.png",
						url: ""
					},
				],
				
			}
		},
		onLoad() {
			const token = wx.getStorageSync('token')
			if(!token) {
				uni.reLaunch({
					url: '../index/index'
				})
			} else {
				this.getCourseList()
			}
		},
		methods: {
			goCourse() {
				uni.navigateTo({
					url: "./course/index"
				})
			},
			goVR() {
				uni.navigateTo({
					url: "./VR/index"
				})
			},
			goDetail(e) {
				uni.navigateTo({
					url: e
				})
			},
			getCourseList() {
				getCourseList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						console.log(data)
						const courses = []
						data.forEach(item => {
							courses.push({
								id: item.cindex,
								name: item.cnname,
								img: getFileUrl('img', item.imgpath)
							})
						})
						this.courseItem = courses
						console.log(this.courseItem)
					})
					.catch(err => console.log(err))
			}
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
		/* margin-left: 48rpx; */
		margin-top: 48rpx;
	}
	
	.row{
		width: 654rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 48rpx;
	}
	
	.allCourse{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.allVR{
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
		white-space: nowrap;
		overflow-x: auto;
		padding-left: 48rpx;
	}
	
	/* 隐藏滑动条 */
	::-webkit-scrollbar {
	display: none;
	}
	
	.listView-tile{
		padding-right: 30rpx;
		/* display: inline-block; */
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
