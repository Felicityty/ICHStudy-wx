<template>
	<view class="container">
		<!-- <view class="course_search_bg">
			<view class="course_search_content">
				<image src="../../../static/images/iCons/search.png" mode="aspectFit" class="course_search_icon"></image>
				<input type="text" placeholder="搜索课程名称" v-show="language===0" class="course_search_input" placeholder-class="phcolor"/>
				<input type="text" placeholder="Search" v-show="language===1" class="course_search_input" placeholder-class="phcolor"/>
			</view>
		</view> -->
		
		<view class="content">
			<view v-for="(item,index) in courseItem" :key="index" v-if="index==0 ||  index==1 || index==3 || index==5 || index==6 || index==8 ||index==10 || index==12 ||index==13 || index==18">
				<CourseItem :info="item" :language="language"></CourseItem>
				<!-- <image :src="item.img" mode="aspectFill" class="course_content_img"></image>
				<text class="course_content_name">{{ item.name }}</text>
				<text class="course_content_intro">{{item.intro}}</text> -->
			</view>
			<view v-for="(item,index) in courseItem" :key="index" v-if="index==2 ||  index==4 || index==7 || index==9 || index==11 || index==14 ||index==15 || index==16 ||index==17">
				<CourseItem :info="item" :language="language"></CourseItem>
			</view>
		</view>
		<tabbar :state="2"></tabbar>
	</view>
</template>

<script>
	import CourseItem from '../../../components/course/CourseItem.vue'
	import { getCourseList } from '../../../api/course/index.js'
	import { getFileUrl } from '../../../common/index.js'
	import tabbar from'../../../components/tabbar/tabbar.vue'
	
	export default {
		data(){
			return{
				courseItem: [],
				language: 0,
				isLanguage: true
			}
		},
		components: {
			CourseItem,
			tabbar
		},
		onShow(){
			const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
		},
		onLoad() {
			const token = wx.getStorageSync('token')
			if(!token) {
				uni.reLaunch({
					url: '../../index/index'
				})
			} else {
				this.getCourseList()
			}
		},
		methods:{
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
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
								cnname: item.cnname,
								cnintro: item.cninfo.slice(0,20),
								enname: item.enname,
								enintro: item.eninfo.slice(0,20),
								img: getFileUrl('img', item.imgpath)
							})
						})
						this.courseItem = courses
						// console.log(this.courseItem)
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style>
	.container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	}
	
	.phcolor{
		color: #73615D;
		font-size: 28rpx;
	}
	
	.course_search_bg{
		width: 750rpx;
		height: 88rpx;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 999;
		background-color: #f9f3eb;
	}
	
	.course_search_content {
		width: 654rpx;
		height: 64rpx;
		position: fixed;
		top: 12rpx;
		left: 48rpx;
		background-color: #ffffff;
		border-radius: 40rpx;
	}
	
	.course_search_icon{
		width: 42.3rpx;
		height: 50rpx;
		position: absolute;
		left: 12.22rpx;
		top: 7rpx;
	}
	
	.course_search_input{
		width: 90%;
		height: 100%;
		line-height: 50%;
		position: absolute;
		left: 65.78rpx;
		font-size: 28rpx;
		color: "#73615D";
	}
	
	.content{
		width: 702rpx;
		/* position: relative;
		top: 112rpx; */
		margin-left: 48rpx;
		margin-top: 36rpx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
</style>
