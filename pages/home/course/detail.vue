<template>
	<view class="container">
		<view class="video_play">
			<video controls :src="toLearnList[play].url" 
			type="video/mp4" 
			@play="startPlay"
			@ended="endPlay"
			style="width: 750rpx height: 100%;">
				<!-- <source :src="toLearnList[play].url" type="video/mp4" style="width: 750rpx height: 100%;"> -->
				<track :src="toLearnList[play].subpath" kind="subtitles" default>
			</video>
		</view>
		
		<view class="course_details">
			<view class="course_details_name">{{courseinfo[0].name}}</view>
			<view class="course_details_detail">{{courseinfo[0].intro}}</view>
		</view>
		
		<view class="video_list">
			<view class="video_list_click" @click="showAll = !showAll">
				<text class="video_list_headtext">视频列表</text>
				<image :src="unfold()" mode="aspectFit" class="video_list_img"></image>
			</view>
			<view v-for="(item, index) in showList" :key="index" class="video_list_content" @click="changevideo(index)" :class="{active:play===index}">
				{{item.cnname}}
				<image :src="video(index)" mode="aspectFit" class="video_list_content_img"></image>
			</view>
		</view>
		
		<view class="commend">推荐</view>
		<view class="course_commend">
			<view v-for="(item,index) in courseItem" :key="index">
				<CourseCommend :info="item"></CourseCommend>
				<!-- <image :src="item.img" mode="aspectFill" class="course_commend_img"></image>
				<text class="course_commend_text">{{ item.name }}</text> -->		
			</view>
		</view>
	</view>
</template>

<script>
	import CourseCommend from '../../../components/course/CourseCommend.vue'
	import { getCourseList, getSection, uploadMy } from '../../../api/course/index.js'
	import { getFileUrl } from '../../../common/index.js'
	
	export default {
		data(){
			return{
				index: '',
				courseinfo: [],
				stime: 0,
				etime: 0,
				deltaTime: 0,
				toLearnList:[],
				play: 0,
			  showAll: false,
				bofang: '../../../static/images/iCons/zhengzaibofang.png',
				courseItem: []
			}
		},
		components: {
			CourseCommend
		},
		onLoad(options) {
			const token = wx.getStorageSync('token')
			if(!token) {
				uni.reLaunch({
					url: '../../index/index'
				})
			} else {
				this.index = options.id
				// console.log(options.id)
				this.getCourseInfo()
				this.getSections()
				this.getCourseCommend()
			}

		},
		methods:{
			unfold(){　//对箭头进行处理
				if(this.showAll == false){
				    return '../../../static/images/iCons/arrowDownBrown.png'
				  }else{
				    return '../../../static/images/iCons/arrowUpBrown.png'
				} 
			},
			changevideo(index){
				this.upload()
				this.play = index
			},
			video(index){
				if(this.play === index){　　　　　　　　　　　
				    return '../../../static/images/iCons/zhengzaibofang.png'
				  }else{
				    return ''
				}
			},
			getCourseInfo () {
			  getCourseList()
			    .then(res => {
			      const data = JSON.parse(res.data).endata.data
			      // console.log(data)
			      for (let i = 0; i < data.length; i++) {
							if( data[i].cindex === this.index){
								this.courseinfo.push({
									id: data[i].cindex,
									name: data[i].cnname,
									intro: data[i].cninfo
								})
							}
			      }
			    })
			    .catch(err => console.log(err))	
			},
			getSections() {
			  getSection(this.index)
			    .then(res => {
			      const data = JSON.parse(res.data).endata.data
			      // console.log(res.data)
			      data.forEach(item => {
			        this.toLearnList.push({
			          cnname: item.cnname,
			          enname: item.enname,
			          url: getFileUrl('video', item.videopath),
			          sectionId: item.sindex,
			          subpath: getFileUrl('vtt', item.subtitlespath)
							})
			      })
			    })
			    .catch(err => console.log(err))
			},
			getCourseCommend() {
				getCourseList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						let courses = []
						data.forEach(item => {
							courses.push({
								id: item.cindex,
								name: item.cnname,
								intro: item.cninfo,
								img: getFileUrl('img', item.imgpath)
							})
						})
						courses = this.getRandomArrayElements(courses, 4)
						this.courseItem = courses
						// console.log(this.courseItem)
					})
					.catch(err => console.log(err))
			},
			// 随机获取指定数目的数据
			getRandomArrayElements(arrList,num){
			  let tempArr=arrList.slice(0);
			  let newArrList=[];    
			  for(let i=0;i<num;i++){
			    let random=Math.floor(Math.random()*(tempArr.length-1));
			    let arr=tempArr[random];
			    tempArr.splice(random, 1);
			    newArrList.push(arr);    
				}
			  return newArrList;
			},
			upload () {
			  if (!this.stime) {
			    return
			  }
			  if (!this.etime) {
			    this.etime = new Date()
			  }
			  this.deltaTime = Math.ceil((this.etime - this.stime) / 60000)
			  console.log(this.deltaTime)
			
			  // uploadMy(this.$store.state.user.id, this.index, this.toLearnList[this.play].sectionId, this.deltaTime)
			  //   .then(res => {
			  //     console.log(res)
			  //   })
			  //   .catch(err => console.log(err))
			
			  this.stime = this.etime = this.deltaTime = 0
			},
			startPlay () {
			  if (!this.stime) {
			    this.stime = new Date()
			  }
			  // console.log(this.stime)
			},
			endPlay () {
			  if (!this.etime) {
			    this.etime = new Date()
			    // this.deltaTime = this.etime - this.stime
			  }
			  // console.log(this.etime)
			  this.upload()
			},
		},
		computed:{
			showList(){
				if(this.showAll === false){  //当数据不需要完全显示的时候
				  let showList = [];　　　　　　　　　　　　　
				  return showList;　　　　　　　　　　　　　　　　 
				}else{
				  return this.toLearnList;
				}
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
	}
	
	.video_play{
		width: 750rpx;
		height: 422rpx;
		background-color: #000000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 99;
	}
	
	.course_details{
		width: 654rpx;
		margin-top: 462rpx;
	}
	
	.course_details_name{
		color: #382321; 
		font-size: 32rpx;
	}
	
	.course_details_detail{
		color: #73615D; 
		font-size: 24rpx; 
		margin-top: 20rpx;
	}
	
	.video_list{
		width: 654rpx;
		margin-top: 48rpx;
	}
	
	.video_list_headtext{
		color: #382321; 
		font-size: 32rpx;
	}
	
	.video_list_click{
		width: 654rpx;
		height: 64rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.video_list_img{
		width: 20rpx; 
		height: 34rpx; 
	}
	
	.video_list_content{
		width: 654rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #382321;
		margin-top: 20rpx;
	}
	
	.active{
		color: #FB8539;
	}
	
	.video_list_content_img{
		 width: 24rpx;
		 height: 24rpx;
	}
	
	.commend{
		width: 654rpx;
		height: 46rpx;
		margin-top: 72rpx;
	}
	
	.course_commend{
		width: 654rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
</style>
