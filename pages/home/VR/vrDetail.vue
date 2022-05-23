<template>
		<view class="content">
			
			<view class="bg">
				<image class="picbg" :src="intro[0].img"></image>
			</view>
			
			<view class="back" @click="goOff()" :style="{top: scrollTop + 'rpx'}">
				<image class="arrow-left" src="../../../static/images/iCons/arrowLeftBrown.png"></image>
			</view>
			
			<view class="container">
				<!-- 介绍 -->
				<view class="intro">
					<view class="title">{{isLanguage ? intro[0].entitle : intro[0].cntitle}}</view>
					<view :class="!showing?'introduction-ellipsis':'introduction-complete'">{{isLanguage ? intro[0].entext : intro[0].cntext}}</view>
					<!-- <div class="introduction" v-html="showLen"></div> -->
					<!-- 要换行只能用div和v-html诶  -->
				</view>
				
				<view class="zhankai" @click="showing = !showing">
					<view class="fold">
						{{(showing) ? (isLanguage ? 'See More' : '展开更多') : (isLanguage ? 'See Less' : '收起更多')}}
						</view>
					<view class="arrow">
						<image class="arrowDown" :src="folded()"></image>
					</view>
				</view>
				
				<!-- 推荐 -->
				<view class="recommend">
					<view class="name">{{isLanguage ? 'Recommend' : '推荐'}}</view>
					
					<view class="listView">
						<view class="rec" v-for="(item, index) in recItem" :key="index" 
							@click="goDetail(item.id)">
							<image class="recPic" :src="item.img"></image>
							<view class="recName">{{isLanguage ? item.enname : item.cnname}}</view>
						</view>
					</view>
					
				</view>
				
				<!-- 全景 -->
				<view class="quanjing">
					<view class="name">{{isLanguage ? 'VR Panorama' : 'VR全景'}}</view>
					<image class="vr360" :src="intro[0].img360" @click="goUrl(intro[0].vrUrl)"></image>
				</view>
				
			</view>
			
			<view class="safe-area"></view>
		</view>
</template>

<script>
	import { getVrList } from '../../../api/vr/index.js'
	import { getFileUrl } from '../../../common/index.js'
	export default {
		data() {
			return {
				index: null,
				intro: [],
				showing: true,
				recItem: [],
				language: 1,
				isLanguage: true,
				scrollTop: 0
			}
		},
		onLoad(options) {
			this.getVrList()
			this.index = options.id
			console.log('index', this.index)
			this.getVrRec()
			this.getTop()
			this.scrollTop = this.scrollTop * 2 +14
			
		},
		onShow() {
			// const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			this.language = language
			console.log(this.language)
			this.getLanguage()
			console.log(this.isLanguage)
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goOff() {
				uni.navigateBack({
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: './vrDetail?id=' + id
				})
			},
			getTop() {
			  const that = this
			    wx.getSystemInfo({
			      success: function (res) {
			        that.scrollTop = res.statusBarHeight
							// console.log(that.scrollTop)
			      },
			    });
			},
			folded(){
				if(this.showing == false){
				  return '../../../static/images/iCons/arrowUpBrown.png'    // false
				}else{
				  return '../../../static/images/iCons/arrowDownBrown.png'  // true
				} 
			},
			getVrList() {
				getVrList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						console.log(data)
						for (let i=0; i<data.length; i++) {
							if(data[i].id == this.index) {
								this.intro.push({
								id: data[i].id,
								cntitle: data[i].vrcnname,
								entitle: data[i].vrenname,
								img: getFileUrl('img', data[i].cover),
								img360: getFileUrl('img', data[i].vr_panoramic_cover),
								cntext: data[i].vrcninfo,
								vrUrl: data[i].vrpath,
								entext: data[i].vreninfo,
								})
							}
						}
					})
					.catch(err => console.log(err)) 
			},
			goUrl(url) {
				console.log(url)
				uni.navigateTo({
					url: './vr?url=' + url
				})
			},
			getVrRec() {
				getVrList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						let vrRec = []
						data.forEach(item => {
							vrRec.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						vrRec = this.getRandomArrayElements(vrRec, 4)
						this.recItem = vrRec
						// console.log(this.recItem)
					})
					.catch(err => console.log(err))
			},
			// 随机获取指定数目的数据
			getRandomArrayElements(arrList, num) {
				let tempArr = arrList.slice(0)
				let newArrList=[]
				while(newArrList.length < num) {
					const random = Math.floor(Math.random() * (tempArr.length - 1))
					const arr = tempArr[random]
					if(arr.id.toString() !== this.index) {
						tempArr.splice(random, 1)
						newArrList.push(arr)
					}
				}
				return newArrList
			},
		}
	}
</script>

<style scoped>
	.content{
		width: 750rpx;
		height: 100%;
		position: relative;
		bottom: 60rpx;
	}
	
	.back{
		height: 60rpx;
		width: 60rpx;
		/* background-color: #bbbbbb; */
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 100rpx;
		position: fixed;
		left: 18rpx;
		z-index: 999;
	}
	
	.arrow-left{
		margin-top: 8rpx;
		margin-left: 4rpx;
		height: 46rpx;
		width: 46rpx;
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
		overflow: hidden;
	}
	
	.title{
		font-size: 32rpx;
		line-height: 46rpx;
		color: #382321;
		font-weight: 600;
		margin-bottom: 20rpx;
	}
	
	.name{
		font-size: 32rpx;
		line-height: 46rpx;
		color: #382321;
		font-weight: 600;
		margin-bottom: 20rpx;
		margin-left: 48rpx;
	}
	
	.introduction-ellipsis{
		font-size: 24rpx;
		letter-spacing: 0.02em;
		color: #73615D;
		line-height: 30rpx;
		/*
		留下一行文字最后变成省略号：
		text-overflow:ellipsis;      // 显示省略符号来代表被修剪的文本 
		overflow: hidden;      // 外层还要再写一遍
		white-space: nowrap; 
		*/
	}
	
	.introduction-complete{
		width: 650rpx;
		font-size: 24rpx;
		letter-spacing: 0.02em;
		color: #73615D;
		line-height: 30rpx;
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
	
	.recommend{
		/* margin-left: 48rpx; */
		margin-top: 48rpx;
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
	
	.rec{
		padding-right: 30rpx;
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
/* 		margin-left: 48rpx; */
	}
	
	.vr360{
		width: 652rpx;
		height: 346.12rpx;
		border-radius: 20rpx;
		margin-bottom: 48rpx;
		margin-left: 48rpx;
	}
	
</style>
