<template>
	<view class="coursePage">	
		<view class="content">
			<view v-for="(item,index) in courseItem" :key="index" v-if="index==0 ||  index==1 || index==3 || index==5 || index==6 || index==8 ||index==10 || index==12 ||index==13 || index==19">
				<CourseItem :info="item" :language="language"></CourseItem>
			</view>
			<view v-for="(item,index) in courseItem" :key="index" v-if="index==2 ||  index==4 || index==7 || index==9 || index==11 || index==14 ||index==15 || index==16 || index==17 || index==18">
				<CourseItem :info="item" :language="language"></CourseItem>
			</view>
		</view>
	</view>
</template>

<script>
	import CourseItem from './CourseItem.vue'
	import { getFileUrl } from '../../common/index.js'
	import { getCourseList, getCourseList_tourist } from '../../api/course/index.js'
	
	export default {
		name:'coursePage',
		props:{
			language:{
				type: Number,
			  default: 1
			},
		},
		data(){
			return{
				courseItem: [],
			}
		},
		components: {
			CourseItem
		},
		created() {
			const token = wx.getStorageSync('token')
			if(token) {
				this.getCourseList()
				// this.getBannerList()
				console.log("有token啦")
			} else {
				this.getCourseList_tourist()
				// this.getBannerList()
				console.log("游客模式开启")
			}
			// this.getCourseList_tourist()
		},
		methods:{
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
			},
			getCourseList_tourist() {
				getCourseList_tourist()
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
	/* .container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	} */
	
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
