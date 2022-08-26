<template>
		<view :class="showChoose? 'darkcontent': 'content'">
			
			<view class="bg">
				<image class="picbg" :src="tourinfo[0].img" mode="aspectFill"></image>
			</view>
			
			<view class="back" @click="goOff()" :style="{top: scrollTop + 'rpx'}">
				<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
			</view>
			
			<view class="container">
				<view class="intro">
					<view class="title">{{language ? tourinfo[0].entitle : tourinfo[0].cntitle}}</view>
					<view :class="!showing?'introduction-ellipsis':'introduction-complete'">{{language ?tourinfo[0].entext : tourinfo[0].cntext}}</view>
				</view>
				
				<view class="zhankai" @click="showing = !showing">
					<view class="fold">
						{{(showing) ? (language ?'See More' : '展开更多') : (language ? 'See Less' : '收起更多')}}
						</view>
					<view class="arrow">
						<image class="arrowDown" :src="folded()"></image>
					</view>
				</view>
				
				<view class="tour-details">
					<view class="tour-detail">{{language ? '【Activity theme】' + tourinfo[0].enconcept : '【活动主题】' + tourinfo[0].cnconcept}}</view>
					<view class="tour-detail">{{language ? '【Activity time】' + tourinfo[0].time : '【活动时间】' + tourinfo[0].time}}</view>
					<view class="tour-detail">{{language ? '【Activity location】' + tourinfo[0].enaddress :'【活动地点】' + tourinfo[0].cnaddress}}</view>
					<view class="tour-detail">{{language ? '【Registration time】' + tourinfo[0].regtime :'【报名时间】' + tourinfo[0].regtime + '截止'}}</view>
					<view class="tour-detail">{{language ? '【Activity content】' :'【活动内容】'}}</view>
					<view class="tour-detail" style="margin-left: 10rpx;">{{language ? tourinfo[0].encontent : tourinfo[0].cncontent}}</view>
					<view class="tour-detail">{{language ? '【Activity target】' :'【活动目标】'}}</view>
					<view class="tour-detail" style="margin-left: 10rpx;">{{language ? tourinfo[0].engoal : tourinfo[0].cngoal}}</view>
					<view class="tour-detail">{{language ? '【Activity note】' :'【注意事项】'}}</view>
					<view class="tour-detail" style="margin-left: 10rpx;">{{language ? tourinfo[0].entip : tourinfo[0].cntip}}</view>
					<!-- <view class="tour-detail" style="margin-left: 10rpx;" v-for="(item, index) in tourinfo[0].tips" :key="index">
						{{index + 1 + '. ' + item}}
					</view> -->
				</view>
			</view>
			
			<view class="safe-area"></view>
			
			<view class="tabbar">
				<view class="tableft">
					<view class="peoplenum">{{language ? 'Registered ' + tourinfo[0].regnumber + ' | ' +'Limited ' + tourinfo[0].limitnumber 
					:'已报名' + tourinfo[0].regnumber + '人 | 限' + tourinfo[0].limitnumber + '人/场'}}</view>
					<view class="cost">{{'￥' + tourinfo[0].cost}}</view>
				</view>
				<button class="tour-btn" @click="Choose()">{{language ? 'Register' :'立即报名'}}</button>
			</view>
			
			<view :class="showChoose ? 'darkback' : ''"></view>
			<choose :class="showChoose ? 'showChoose' : 'noneChoose'" @itemclick="closeChooseBox()"></choose>
		</view>
</template>

<script>
	import { choose } from '../../components/tourist/touristChoose.vue'
	import { getFileUrl } from '../../common/index.js'
	import { getTouristList, getTouristSectionList } from '../../api/tourist/tourist.js'
	export default {
		components: {
			choose
		},
		data() {
			return {
				language: 0,
				scrollTop: 0,
				id: null,
				isToken: false,
				showing: true,
				showChoose: false,
				tourinfo: [
					{
						tips:[],
					}
				]
			}
		},
		onLoad(options) {
			const token = wx.getStorageSync('token')
			if(token) {
				this.isToken = true
				console.log("有token啦")
			}
			this.getTop()
			this.id = options.id
			this.getTouristList()
			this.getTouristSectionList()
			this.scrollTop = this.scrollTop * 2 + 14
		},
		onShow() {
			// const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			this.language = language
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goOff() {
				uni.navigateBack({});
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
				  return '../../static/images/iCons/arrowUpBrown.png'    // false
				}else{
				  return '../../static/images/iCons/arrowDownBrown.png'  // true
				} 
			},
			Choose() {
				this.showChoose = true;
			},
			closeChooseBox(item) {
				this.showChoose = item;
			},
			getTouristList() {
				getTouristList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						const tourists = []
						data.forEach(item => {
							if(item.tindex === this.id){
								tourists.push({
									id: item.tindex,
									cntitle: item.cnname,
									entitle: item.enname,
									entext: '\xa0\xa0\xa0\xa0\xa0\xa0' + item.trip_eninfo,
									cntext: '\xa0\xa0\xa0\xa0\xa0\xa0' + item.trip_cninfo,
									enconcept: item.entheme,
									cnconcept: item.cntheme,
									time: item.activity_time,
									enaddress: item.enlocation,
									cnaddress: item.cnlocation,
									cnlocation: item.cnlocation,
									enlocation: item.enlocation,
									regtime: item.registration_deadline,
									encontent:'\xa0\xa0\xa0\xa0\xa0\xa0' +  item.encontent,
									cncontent: '\xa0\xa0\xa0\xa0\xa0\xa0' + item.cncontent,
									engoal: '\xa0\xa0\xa0\xa0\xa0\xa0' + item.enaim,
									cngoal: '\xa0\xa0\xa0\xa0\xa0\xa0' + item.cnaim,
									entip: '\xa0\xa0\xa0\xa0\xa0\xa0' + item.ennote,
									cntip: '\xa0\xa0\xa0\xa0\xa0\xa0' + item.cnnote,
									limitnumber: item.limits,
									cost: item.price,
									img: getFileUrl('img', item.backgroundimg)
								})
							}
						})
						this.tourinfo = tourists
					})
					.catch(err => console.log(err))
			},
			getTouristSectionList() {
				getTouristSectionList(this.id)
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						console.log(data)
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style scoped>
	.content{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* margin-bottom: 60rpx; */
		padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
	}
	
	.darkcontent {
		width: 750rpx;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* margin-bottom: 60rpx; */
		padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
	}
	
	.back{
		height: 60rpx;
		width: 60rpx;
		/* background-color: #bbbbbb; */
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 100rpx;
		position: fixed;
		left: 18rpx;
		z-index: 899;
	}
	
	.arrow-left{
		margin-top: 8rpx;
		margin-left: 4rpx;
		height: 46rpx;
		width: 46rpx;
	}
	
	.bg{
		position: relative;
		width: 100%;
		height: 542rpx;
	}
	
	.picbg{
		width: 100%;
		height: 542rpx;
	}
	
	.container{
		width: 100%;
		height: auto;
		background-color: #F9F3EB;
		position: relative;
		margin-top: -60rpx;
		padding-bottom: 120rpx;
		z-index: 100;
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
		word-wrap: break-word;
    word-break: normal;
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
	
	.tour-details{
		color: #382321;
		font-size: 28rpx;
		margin-left: 38rpx;
		margin-right: 48rpx;
		margin-top: 40rpx;
	}
	
	.tour-detail{
		margin: 15rpx 0rpx;
		word-wrap: break-word;
		word-break: normal;
	}
	
	.tabbar{
		/* border: 1px solid #E6DECC; */
		box-shadow: 0 -1rpx 10rpx #E6DECC;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		/* height: 132rpx; */
		height: auto;
		padding-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fefbf3;
		z-index: 999;
		align-items: center;
	}
	
	.tableft{
		width: 70%;
		display: flex;
		justify-content: flex-start;
		align-items:center;
	}
	
	.peoplenum{
		color: #73615D;
		font-size: 24rpx;
		margin-left: 48rpx;
	}
	
	.cost{
		color: #FB8539;
		font-size: 36rpx;
		margin-left: 14rpx;
	}
	
	.tour-btn {
		background-color: #987744;
		color: #FFFFFF;
		font-size: 32rpx;
		height: 66rpx;
		line-height: 66rpx;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
	}
	
	.darkback {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(12, 12, 12, 0.4);
		display: flex;
		z-index: 999;
	}
	
	.showChoose {
		display: block;
	}
	
	.noneChoose {
		display: none;
	}
	
	/* 隐藏滑动条 */
	::-webkit-scrollbar {
	display: none;
	}
	
</style>
