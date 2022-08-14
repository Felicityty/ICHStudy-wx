<template>
	<view class="container" :style="{'position': darkBackQ, 'background-color': darkQ}">
		<!-- <view class="video_play">
			<video
				id="video-player"
				class="video"
				:src="toLearnList[play].url"
				autoplay
				@play="startPlay"
				@ended="endPlay"
				@timeupdate="timeUpdate"
			>
				<cover-view class="watermark">
					<cover-image src="../../../static/images/watermark.png"></cover-image>
				</cover-view>
			</video>
			
			<Track id="track" ref="track"/>
			<view class="end-img" v-show="showEndImg">
				<view class="QRcode">
					<image src="../../../static/images/QRcode.jpg" mode="aspectFit"></image>
				</view>
				<view class="divide"></view>
				<view class="restart" @click="restart()">
					<image src="../../../static/images/iCons/restart.png" mode="aspectFit"></image>
				</view>
			</view>
		</view> -->
		
		<view class="video_play">
			<view class="video">
				<txv-video :vid="toLearnList[play].vid"
					playerid="txv1" 
					id="video-player"
					autoplay
					@play="startPlay"
					@ended="endPlay"
					@timeupdate="timeUpdate"
				>
					<cover-view class="watermark">
						<cover-image src="../../../static/images/watermark.png"></cover-image>
					</cover-view>
				</txv-video>
			</view>
			<Track id="track" ref="track"/>
		</view>
		
		<view class="questionBox" :style="{'display': showQ}">
			<view class="question-title">
				<view>{{question[numQ].type}}</view>
				<image src='../../../static/images/iCons/cha.png' mode="aspectFit" class="question-img" @click="closeBox(index)"></image>
			</view>
			<view class="question">{{question[numQ].q}}</view>
			<view class="choice" v-for="(itemq, indexq) in questionChoice" :key="indexq" @click="changAns(itemq, indexq, question[numQ].type)">
				<view v-show="isRadio" :class = "isActiveAns === indexq ? 'activeAns' : 'choice-num'">{{ String.fromCharCode(itemq.id + 65) }}</view>
				<view v-show="!isRadio" :class = "checkboxList.indexOf(itemq) != -1 ? 'activeAns' : 'choice-num'">{{ String.fromCharCode(itemq.id + 65) }}</view>
				<view class="choice-content">{{ itemq.content }}</view>
			</view>
			<button class="question-btn" @click="DoneQ()">确定</button>
			<view v-show="isDone" class="question-ans">{{'正确答案：' + question[numQ].ans}}</view>
		</view>
		
		<view class="course_details">
			<view class="course_details_name">{{isLanguage? courseinfo[0].enname : courseinfo[0].cnname}}</view>
			<view :class="!showing ?'course_details_detail':'course_details_complete'">{{isLanguage? courseinfo[0].enintro : courseinfo[0].cnintro}}</view>
		</view>
		<view class="zhankai" @click="showing = !showing">
			<view class="fold">
				{{(showing) ? (isLanguage ? 'See More' : '展开更多') : (isLanguage ? 'See Less' : '收起更多')}}
				</view>
			<view class="arrow">
				<image class="arrowDown" :src="folded()"></image>
			</view>
		</view>
		
		<view class="video_list">
			<view class="video_list_click" @click="showAll = !showAll">
				<text class="video_list_headtext">{{title[0]}}</text>
				<image :src="unfold()" mode="aspectFit" class="video_list_img"></image>
			</view>
			<view class="video_list_container">
				<view v-for="(item, index) in showList" :key="index" class="video_list_content" @click="changevideo(index)" :class="{active:play===index}">
					{{isLanguage? item.enname : item.cnname}}
					<image :src="video(index)" mode="aspectFit" class="video_list_content_img"></image>
				</view>
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
		
		<view class="safe-area"></view>
	</view>
</template>

<script>
	import CourseCommend from '../../../components/course/CourseCommend.vue'
	import Track from '../../../components/course/Track'
	import { getCourseList, getSection, uploadMy, getQuestion } from '../../../api/course/index.js'
	import { getFileUrl } from '../../../common/index.js'
	import { getSection_tourist, getCourseList_tourist } from '../../../api/course/index.js'
	
	export default {
		name: 'av',
		data() {
			return{
				index: '',
				courseinfo: [],
				stime: 0,
				etime: 0,
				deltaTime: 0,
				toLearnList:[],
				vid: 0,
				play: 0,
			  showAll: true,
				showEndImg: false,
				bofang: '../../../static/images/iCons/zhengzaibofang.png',
				courseItem: [],
				userInfo: {
					username: '',
					nickName: '',
				},
				language: 0,
				isLanguage: true,
				screenWidth: 0,
				showing: true,
				currentTime: 0,
				showQ: 'none',
				darkBackQ: 'static',
				darkQ: 'none',
				isActiveAns: false,
				isRadio: true,
				isDone: false,
				numQ: 0,
				checkboxList: [],
				question: []
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
			// if(!token) {
			// 	uni.reLaunch({
			// 		url: '../../index/index'
			// 	})
			// } else {
			// 	this.index = options.id
			// 	that.userInfo.username = userInfo.username
			// 	this.getCourseInfo()
			// 	this.getSections()
			// 	this.getCourseCommend()
			// 	// uni.getSystemInfo({
			// 	// 	success(res){
			// 	// 		console.log(res);
			// 	// 		that.screenWidth = res.screenWidth;
			// 	// 		console.log(that.screenWidth);
			// 	// 	}
			// 	// })
			// }
			this.index = options.id
			that.userInfo.username = userInfo.username
			this.getCourseInfo()
			// this.getSection_tourist()
			// this.getSections()
			if(token) {
				this.getSection()
				this.getQuestion()
				// this.getBannerList()
				console.log("有token啦")
			} else {
				this.getSection_tourist()
				// this.getBannerList()
				console.log("游客模式开启")
			}
			this.getCourseCommend()
		},
		beforeDestroy() {
			console.log('onUnload')
			let video = uni.createVideoContext('video-player')
			video.pause()
			this.upload()
		},
		destroyed() {
			console.log('destroryed')
		},
		methods:{
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			folded(){
				if(this.showing == false){
				  return '../../../static/images/iCons/arrowUpBrown.png'    // false
				}else{
				  return '../../../static/images/iCons/arrowDownBrown.png'  // true
				} 
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
				this.numQ = 0
				this.getQuestion()
			},
			restart() {
				this.showEndImg = false
				let video = uni.createVideoContext('video-player')
				video.play()
			},
			video(index){
				if(this.play === index){
				    return '../../../static/images/iCons/zhengzaibofang.png'
				  }else{
				    return ''
				}
			},
			getCourseInfo () {
			  getCourseList_tourist()
			    .then(res => {
			      const data = JSON.parse(res.data).endata.data
			      // console.log(data)
			      for (let i = 0; i < data.length; i++) {
							if( data[i].cindex === this.index){
								this.courseinfo.push({
									id: data[i].cindex,
									cnname: data[i].cnname,
									cnintro: "\xa0\xa0\xa0\xa0\xa0\xa0\xa0"+data[i].cninfo,
									enname: data[i].enname,
									enintro: data[i].eninfo
								})
							}
			      }
			    })
			    .catch(err => console.log(err))	
			},
			getSection() {
			  getSection(this.index)
			    .then(res => {
			      const data = JSON.parse(res.data).endata.data
			      // console.log(data)
						this.toLearnList = []
			      data.forEach(item => {
							if(item.vidfortx == 'vidfortx') { return }
			        this.toLearnList.push({
								sindex: item.sindex,
			          cnname: item.cnname,
			          enname: item.enname,
								vid: item.vidfortx,
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
			getSection_tourist() {
			  getSection_tourist(this.index)
			    .then(res => {
			      const data = JSON.parse(res.data).endata.data
			      // console.log(data)
						this.toLearnList = []
			      data.forEach(item => {
							if(item.vidfortx == 'vidfortx') { return }
			        this.toLearnList.push({
								sindex: item.sindex,
			          cnname: item.cnname,
			          enname: item.enname,
								vid: item.vidfortx,
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
				getCourseList_tourist()
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
			getRandomArrayElements(arrList, num){
				let tempArr = arrList.slice(0)
				let newArrList=[]
				while(newArrList.length < num) {
					const random = Math.floor(Math.random() * (tempArr.length - 1))
					const arr = tempArr[random]
					if(arr.id !== this.index) {
						tempArr.splice(random, 1)
						newArrList.push(arr)
					}
				}
			  return newArrList;
			},
			upload () {
			  if (!this.stime) {
					console.log('sss')
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
				this.showEndImg = true
			  if (!this.etime) {
			    this.etime = new Date()
			    this.deltaTime = this.etime - this.stime
			  }
			  // console.log(this.etime)
			  this.upload()
			},
			timeUpdate (e) {
				this.$refs.track.videoChangeEvent(e.target.currentTime * 1000)
				this.currentTime = Math.floor(e.target.currentTime * 10);
				if(this.question.length !== 0){
					if(this.currentTime < this.question[this.numQ].qtime * 10 + 11
					&& this.currentTime > this.question[this.numQ].qtime * 10 + 7){
						this.upload();
						const TxvContext = requirePlugin("tencentvideo");  
						let txvContext = TxvContext.getTxvContext('txv1');
						txvContext.pause();
						this.showQ = 'block';
						this.darkBackQ = 'fixed';
						this.darkQ = 'rgba(12, 12, 12, 0.4)';
					}
				}
				
			},
			getQuestion () {
				getQuestion()
					.then(res => {
						const data = JSON.parse(res.data).endata.data;
						console.log(data)
						let qItem = [];
						let answer = [];
						// console.log(this.toLearnList[this.play])
						data.forEach(item => {
							if(this.toLearnList[this.play].sindex === item.sindex){
								answer.push(
									{id: 0, content: item.answerA},
									{id: 1, content: item.answerB},
									{id: 2, content: item.answerC},
									{id: 3, content: item.answerD},
								)
								qItem.push({
									id: item.id,
									type: item.question_type,
									q: item.stem,
									choice: answer,
									qtime: item.time,
									ans: item.solution,
									sindex: item.sindex
								})
								answer = [];
							}
						})
						this.question = qItem;
					})
					.catch(err => console.log(err))
			},
			changAns (item, index, type) {
				const that = this;
				if(that.isDone === false){
					if(type === '单选题'){
						that.isRadio = true;
						that.isActiveAns = index;
					} else {
						that.isRadio = false;
						if (that.checkboxList.indexOf(item) !== -1) {
							that.checkboxList.splice(that.checkboxList.indexOf(item), 1) //取消
						} else {
							that.checkboxList.push(item) //选中添加到数组里
						}
					}
				}
			},
			DoneQ () {
				const that = this;
				if(that.isActiveAns !== false){
					that.isDone = true;
				} else if (that.checkboxList.length !== 0){
					that.isDone = true;
				}
			},
			closeBox (index) {
				const that = this;
				const TxvContext = requirePlugin("tencentvideo");  
				let txvContext = TxvContext.getTxvContext('txv1');
				if (that.isDone === true){
					txvContext.play();
					that.showQ = 'none';
					that.darkBackQ = 'static';
					that.darkQ = 'none';
					that.isActiveAns = false;
					that.checkboxList = [];
					that.isDone = false;
					if(that.numQ < that.question.length - 1){
						that.numQ++;
					}else{
						that.numQ = that.question.length - 1;
					}
				}
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
			},
			questionChoice() {
				if(this.question.length === 0){
					return [];
				}else{
					return this.question[this.numQ].choice;
				}
			}
		}
	}
</script>

<style>
	.watermark{
		height: 55rpx;
		width: 85rpx;
		position: fixed;
		top: 30rpx;
		right: 12%;
	}
	
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
		height: 450rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 100;
	}
	
	txv-video {
		z-index: 100;
	}
	
	.video{
		z-index: 100;
		width: 750rpx;
		height: 450rpx;
	}
	
	.end-img {
		height: 450rpx;
		width: 100%;
		background-color: #000000;
		position: fixed;
		z-index: 101;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.end-img .QRcode {
		height: 150rpx;
		width: 150rpx;
	}	
	
	.end-img .divide {
		width: 4rpx;
		height: 40rpx;
		background-color: #ffffff;
		margin: 0 50rpx;
	}
	
	.end-img .restart {
		height: 60rpx;
		width: 60rpx;
	}
	
	.end-img .QRcode image, .end-img .restart image {
		height: 100%;
		width: 100%;
	}
	
	#track {
		height: 0rpx;
		width: 100%;
		position: relative;
		left: 0rpx;
		top: 0rpx;
	}
	
	.questionBox{
		width: 80%;
		height: auto;
		border-radius: 20rpx;
		padding: 20px;
		background-color: #FFFFFF;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.15);
		position: absolute;
		top: 35%;
		left: 50%;
		transform: translate(-50%, -35%);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: space-between;
		display: none;
	}
	
	.question-title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: #382321;
	}
	
	.question{
		width: 100%;
		height: auto;
		margin-top: 24rpx;
		justify-content: flex-start;
		word-wrap: break-word;
    word-break: normal;
	}
	
	.question-img{
		width: 32rpx;
		height: 32rpx;
	}
	
	.choice{
		width: 102%;
		height: auto;
		background-color: #F7F3E8;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-top: 28rpx;
		margin-left: -3%;
		padding-top: 20rpx;
		padding-left: 4%;
		padding-bottom: 20rpx;
	}
	
	.choice-num{
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		border-radius: 40rpx;
		background-color: #FFFFFF;
		border: #d1d1d1 1rpx solid;
	}
	
	.activeAns{
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		border-radius: 40rpx;
		background-color: #382321;
		color: #FFFFFF;
		border: #d1d1d1 1rpx solid;
	}
	
	.choice-content{
		width: 85%;
		margin-left: 24rpx;
		word-wrap: break-word;
    word-break: normal;
	}
	
	.question-btn{
		width: 104%;
		margin-left: -2%;
		background-color: #987744;
		color: #FFFFFF;
		font-size: 26rpx;
		margin-top: 30rpx;
	}
	
	.question-ans{
		margin-top: 24rpx;
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
	
	.course_details_complete{
		color: #73615D;
		font-size: 24rpx; 
		margin-top: 20rpx;
		line-height: 40rpx;
		overflow: hidden;
		white-space: nowrap; 
		text-overflow: ellipsis;
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
	
	.video_list{
		width: 654rpx;
		margin-top: 48rpx;
	}
	
	.video_list_container {
		max-height: 300rpx;
		overflow: auto;
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
		width: 702rpx;
		margin-top: 20rpx;
		margin-left: 48rpx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
