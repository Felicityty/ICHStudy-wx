<template>
	<view class="container">
		<view class="video_play">
			<video
				class="video"
				:src="toLearnList[play].url"
				autoplay
				ref="av"
				@play="startPlay"
				@ended="endPlay"
				@timeupdate="timeUpdate"
			>
			</video>
			<Track id="track" ref="track"/>
		</view>
		
		<view class="course_details">
			<view class="course_details_name">{{isLanguage? courseinfo[0].enname : courseinfo[0].cnname}}</view>
			<view class="course_details_detail">{{isLanguage? courseinfo[0].enintro : courseinfo[0].cnintro}}</view>
		</view>
		
		<view class="video_list">
			<view class="video_list_click" @click="showAll = !showAll">
				<text class="video_list_headtext">{{title[0]}}</text>
				<image :src="unfold()" mode="aspectFit" class="video_list_img"></image>
			</view>
			<view v-for="(item, index) in showList" :key="index" class="video_list_content" @click="changevideo(index)" :class="{active:play===index}">
				{{isLanguage? item.enname : item.cnname}}
				<image :src="video(index)" mode="aspectFit" class="video_list_content_img"></image>
			</view>
		</view>
		
		<view class="commend">{{title[1]}}</view>
		<view class="course_commend">
			<view v-for="(item,index) in courseItem" :key="index">
				<CourseCommend :info="item" :language="language"></CourseCommend>
				<!-- <image :src="item.img" mode="aspectFill" class="course_commend_img"></image>
				<text class="course_commend_text">{{ item.name }}</text> -->		
			</view>
		</view>
	</view>
</template>

<script>
	import CourseCommend from '../../../components/course/CourseCommend.vue'
	import Track from '../../../components/course/Track'
	import { getCourseList, getSection, uploadMy } from '../../../api/course/index.js'
	import { getFileUrl } from '../../../common/index.js'
	
	export default {
		name: 'av',
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
				courseItem: [],
				userInfo: {
					username: '',
					nickName: '',
				},
				language: 0,
				isLanguage: true
			}
		},
		components: {
			CourseCommend,
			Track
		},
		onShow(){
			// const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
		},
		onLoad(options) {
			const token = wx.getStorageSync('token')
			const userInfo = wx.getStorageSync('userInfo')
			// console.log(userInfo)
			const that = this
			if(!token) {
				uni.reLaunch({
					url: '../../index/index'
				})
			} else {
				this.index = options.id
				that.userInfo.username = userInfo.username
				this.getCourseInfo()
				this.getSections()
				this.getCourseCommend()
			}
		},
		destroyed() {
			this.$refs.av.pause()
		},
		methods:{
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
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
									cnname: data[i].cnname,
									cnintro: data[i].cninfo,
									enname: data[i].enname,
									enintro: data[i].eninfo
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
						this.toLearnList = []
			      data.forEach(item => {
			        this.toLearnList.push({
								sindex: item.sindex,
			          cnname: item.cnname,
			          enname: item.enname,
			          url: getFileUrl('video', item.videopath),
			          sectionId: item.sindex,
			          subpath: item.subtitlespath ? getFileUrl('vtt', item.subtitlespath) : ''
							})
			      })
						if(this.toLearnList[this.play].subpath) {
							this.$refs.track.loadZimu(this.toLearnList[this.play].subpath, this.toLearnList[this.play].sindex)
						}
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
								cnname: item.cnname,
								enname: item.enname,
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
			
			  uploadMy(this.userInfo.username, this.index, this.toLearnList[this.play].sectionId, this.deltaTime)
			    .then(res => {
			      console.log(res)
			    })
			    .catch(err => console.log(err))
			
			  this.stime = this.etime = this.deltaTime = 0
			},
			startPlay () {
				console.log('start')
			  if (!this.stime) {
			    this.stime = new Date()
			  }
			  // console.log(this.stime)
			},
			endPlay () {
				console.log('end')
			  if (!this.etime) {
			    this.etime = new Date()
			    this.deltaTime = this.etime - this.stime
			  }
			  // console.log(this.etime)
			  this.upload()
			},
			timeUpdate (e) {
				this.$refs.track.videoChangeEvent(e.target.currentTime * 1000)
			}
		},
		computed:{
			showList(){
				if(this.showAll === false){  //当数据不需要完全显示的时候
				  let showList = [];　　　　　　　　　　　　　
				  return showList;　　　　　　　　　　　　　　　　 
				}else{
				  return this.toLearnList;
				}
			},
			title() {
			  if (this.language) {
					return ['Video List', 'Recommend']
			  } else {
			    return ['视频列表', '推荐']
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
		margin-bottom: 60rpx;
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
	
	video {
		width: 100%;
	}
	
	.video{
		position: fixed;
		top: 6rpx;
		left: 0rpx;
		z-index: 999;
	}
	
	#track {
		height: 0rpx;
		width: 100%;
		position: relative;
		left: 0rpx;
		top: 0rpx;
	}
	
	.course_details{
		width: 654rpx;
		margin-top: 502rpx;
	}
	
	.course_details_name{
		font-size: 32rpx;
		line-height: 46rpx;
		font-weight: 600;
		color: #382321; 
	}
	
	.course_details_detail{
		color: #73615D; 
		font-size: 24rpx; 
		margin-top: 20rpx;
		line-height: 40rpx;
		/* text-indent: 48rpx; */
	}
	
	.video_list{
		width: 654rpx;
		margin-top: 48rpx;
	}
	
	.video_list_headtext{
		color: #382321; 
		font-size: 32rpx;
		line-height: 46rpx;
		font-weight: 600;
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
		font-size: 32rpx;
		line-height: 46rpx;
		font-weight: 600;
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
