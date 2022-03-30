<template>
		<view class="content">
			
			<view class="bg">
				<image class="picbg" src="../../static/images/banner.png"></image>
			</view>
			
			<view class="container">
				
				<view class="course">
					
					<view class="row">
						<view class="title">{{isLanguage ? 'Courses' : '课程'}}</view>
						<!-- <navigator url="./course/index" open-type="switchTab"> -->
							<navigator url="./course/index">
							<view class="allCourse">
								<view class="allText">{{isLanguage ? 'more' : '全部'}}</view>
								<view class="allArrow">
									<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
								</view>
							</view>
						</navigator>
						
					</view>
					
					<view class="listView">
						<view class="listView-tile" v-for="(item, index) in courseItem" :key="index" 
							 v-if="index == 0 || index == 7 || index == 6 || index == 9" @click="goCourseDetail(item.id)">
							<image class="couPic" :src="item.img" mode="aspectFill"></image>
							<view class="couName">{{isLanguage ? item.enname : item.cnname}}</view>
						</view>
					</view>
				</view>
				
				<view class="VR">
					
					<view class="row">
						<view class="title">VR</view>
						<!-- <navigator url="./VR/index" open-type="switchTab"> -->
							<navigator url="./VR/index">
							<view class="allVR">
								<view class="allText">{{isLanguage ? 'more' : '全部'}}</view>
								<view class="allArrow">
									<img class="arrowRight" src="../../static/images/iCons/arrowRightGrey.png">
								</view>
							</view>
						</navigator>
					</view>
					
					<view class="listView">
						<view class="listView-tile" v-for="(item, index) in vrItem" :key="index" 
							v-if="index == 0 || index == 4 || index == 1" @click="goVrDetail(item.id)">
							<image class="couPic" :src="item.img" mode="aspectFill"></image>
							<view class="couName">{{isLanguage ? item.enname : item.cnname}}</view>
						</view>
					</view>
				</view>
				
			</view>
			<tabbar :state="1"></tabbar>
		</view>
</template>

<script>
	import { getCourseList } from '../../api/course/index.js'
	import { getFileUrl } from '../../common/index.js'
	import { getVrList } from '../../api/vr/index.js'
	import {tabbar} from'../../components/tabbar/tabbar.vue'
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				title: '首页',
				courseItem: [],
				vrItem: [],
				language: 1,
				isLanguage: true
			}
		},
		// onLoad() {
		// 	this.getLanguage()
		// },
		onShow() {
			const token = wx.getStorageSync('token')
			this.getLanguage()
			if(!token) {
				uni.reLaunch({
					url: '../index/index'
				})
			} else {
				this.getCourseList()
				this.getVrList()
			}
		},
		methods: {
			getLanguage() {
				const that = this
				if(wx.getStorageSync('language') === 1) {
					this.isLanguage = true
				} else if (wx.getStorageSync('language') === 0) {
					that.isLanguage = false
				} else {
					wx.getSystemInfoAsync({
						success(res) {
							if(res.language === 'zh_CN') {
								that.language = 0
								that.isLanguage = false
							} else {
								that.language = 1
								that.isLanguage = true
							}
							uni.setStorage({
								key: 'language',
								data: that.language
							})
						}
					})
				}
			},
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
			goVrDetail(id) {
				uni.navigateTo({
					url: './VR/vrDetail?id=' + id
				})
			},
			goCourseDetail(id){
				uni.navigateTo({ 
					url: './course/detail?id=' + id
				})
			},
			getCourseList() {
				getCourseList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						const courses = []
						data.forEach(item => {
							courses.push({
								id: item.cindex,
								cnname: item.cnname,
								enname: item.enname,
								img: getFileUrl('img', item.imgpath)
							})
						})
						this.courseItem = courses
						// console.log(this.courseItem)
					})
					.catch(err => console.log(err))
			},
			getVrList() {
				getVrList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						const vrs =[]
						data.forEach(item => {
							vrs.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						this.vrItem = vrs
						// console.log(this.vrItem)
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
