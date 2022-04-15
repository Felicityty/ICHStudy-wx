<template>
	<view class="container">
		<view class="user" @click="set()">
			<image class="user_avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
			<text class="user_name">{{ userInfo.nickName ? userInfo.nickName : userInfo.username }}</text>
			<image :src="arrow" mode="aspectFill" class="user_arrow"></image>
		</view>
		
		<view class="content">
			<view class="point">
				<view class="point_score">{{point}}</view>
				<text class="point_text">{{title[0]}}</text>
			</view>
			<view class="duration">
				<view class="duration_score">{{time_text}}</view>
				<text class="point_text">{{title[1]}}</text>
			</view>
			<view class="times">
				<view class="times_content">
					<text class="times_text">{{title[2]}}</text>
					<view class="times_time">{{total_num}}</view>
				</view>
			</view>
			<view class="max">
				<text class="max_text">{{title[3]}}</text>
				<view class="max_content">
					<view class="max_video">{{isLanguage? v_entitle:v_cntitle}}</view>
					<view class="max_time">{{v_num}}</view>
				</view>
			</view>
			
			<view class="setting">
				<view :class="index === settingItems.length - 1? 'none':'setting_item'" v-for="(item, index) in settingItems" :key="index" @click="go(item.url)">
					<view class="text">{{isLanguage? item.enname : item.cnname}}</view>
					<image :src="arrow" mode="aspectFill" class="setting_arrow"></image>
				</view>
			</view>
			<button type="default" class="btn" @click="logout()">{{title[4]}}</button>
		</view>
		<tabbar :state="4"></tabbar>
	</view>
</template>

<script>
	import { getPlayData } from '../../api/user/index.js'
	import {tabbar} from '../../components/tabbar/tabbar.vue'
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				i: 0,
				touxiang: '../../static/images/iCons/touxiang.png',
				arrow: '../../static/images/iCons/arrowRightLightbrown.png',
				settingItems: [
					{
						cnname: '历史记录',
						enname: 'History',
						url: './setting/history'
					},
					{
						cnname: '关于',
						enname: 'About',
						url: './../about/index'
					}
				],
				shoppingItems: [
					{
						cnname: '我的地址',
						enname: 'Address',
						url: ''
					},
					{
						cnname: '我的订单',
						enname: 'Order',
						url: ''
					}
				],
				total_time: 0,
				total_num: 0,
				v_cntitle: '',
				v_entitle: '',
				v_num: 0,
				userInfo: {
					username: '',
					nickName: '请点击登录',
					avatarUrl: '../../static/images/iCons/touxiang.png',
					lang: '',
					openid: ''
				},
				language: 1,
				isLanguage: true
			}
		},
		computed:{
			point () {
			  return Math.floor(this.total_time / 10)
			},
			time_text () {
			  const hour = Math.floor(this.total_time / 60)
			  const min = Math.floor(this.total_time - hour * 60)
				if (this.isLanguage) {
					return `${hour} H ${min} M`
				}else{
					return `${hour} 时 ${min} 分`
				}
			},
			title () {
			  if (this.isLanguage) {
			    return ['Point', 'Total Learning Duration', 'Number of videos watched', 'Video watched most','Log Out']
			  } else {
			    return ['积分', '学习总时长', '观看视频总次数', '观看最多的视频','退出登录']
			  }
			}
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			set(){
				if (!this.userInfo.username) {
					// this.wxGetUserProfile()
					uni.navigateTo({
						url: "../index/index",
					})
				}else {
					uni.navigateTo({
						url: "./setting/index",
					})
				}
			},
			go(url) {
				uni.navigateTo({
					url
				})
			},
			logout() {
				wx.removeStorageSync('openid')
				wx.removeStorageSync('token')
				wx.removeStorageSync('userInfo')
				uni.reLaunch({
					url: '../index/index'
				})
			},
			getCourse() {
			  getPlayData(this.userInfo.username)
			    .then(res => {
			      const data = JSON.parse(res.data).endata.data
			      // console.log(data)
						if(data.length === 0) {
							this.v_cntitle = '暂无'
							this.v_entitle = 'no course'
							this.v_num = 0
							return
						}
			      this.total_num = 0
			      this.v_num = -1
			      data.forEach(item => {
			        this.total_num += item.playcounts
			        this.total_time += parseInt(item.ctime)
			        if (item.playcounts > this.v_num) {
			          this.v_num = item.playcounts
			          this.v_cntitle = item.sccn
			          this.v_entitle = item.scen
			        }
			      })
			    })
			    .catch(err => console.log(err))
			},
			wxGetUserProfile() {
				const that = this
				wx.getUserProfile({
					desc: '登录账号，完善用户信息',
					success(res) {
						console.log('getUserProfile', res)
					 	let user = res.userInfo
					 	that.userInfo.nickName = user.nickName
					 	that.userInfo.avatarUrl = user.avatarUrl
					}
				})
			}
		},
		onShow() {
			const that = this
			const token = wx.getStorageSync('token')
			const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			if(token) {
				that.userInfo.username = userInfo.username
				that.userInfo.nickName = userInfo.nick_name
				this.language = language
				this.getLanguage()
			}
			if(this.i === 0){ this.getCourse(); this.i = 1 }
		},
	}
</script>

<style scoped>
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	}
	
	.text{
		font-size: 28rpx;
		color: #382321;
	}
	
	.times_text{
		font-size: 28rpx;
		color: #73615D;
	}
	
	.max_text{
		font-size: 24rpx;
		color: #73615D;
		margin-left:30rpx;
		margin-top:24rpx;
	}
	
	.point_text{
		font-size: 28rpx;
		color: #73615D;
		text-align: center;
	}
	
	.user{
		width: 654rpx;
		height: 108rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		top: 30rpx;
	}
	
	.user_avatar {
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
	}
	
	.user_name{
		width: calc(100% - 104rpx - 14rpx - 30rpx);
		margin-left: 30rpx;
	}
	
	.user_arrow{
		width: 14rpx;
		height: 28rpx;
	}
	
	.content{
		width: 654rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: relative;
		top: 76rpx;
	}
	
	.point,.duration{
		width: 312rpx;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content:center;
		border-radius: 20rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #ffffff;
	}
	
	.point_score,.duration_score{
		font-size: 36rpx;
		font-weight: 600;
		color: #382321;
		margin-bottom: 10rpx;
	}
	
	.duration{
		margin-left: 30rpx;
	}
	
	.times{
		width: 654rpx;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #ffffff;
	}
	
	.times_content{
		width: 594rpx;
		margin-left: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.times_time{
		font-weight: 600;
		font-size: 36rpx;
		color: #382321;
	}
	
	.max{
		width: 654rpx;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #FFFFFF;
	}
	
	.max_content{
		width: 594rpx;
		margin-left: 30rpx;
		margin-top: 14rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.max_video{
		width: 520rpx;
		font-weight: 600;
		font-size: 28rpx;
		color: #382321;
		overflow: hidden;
		white-space: nowrap; /*文本不换行*/
		text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）*/
	}
	
	.max_time{
		font-size: 36rpx;
		font-weight: 600;
		color: #382321;
	}
	
	.setting{
		width: 654rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #FFFFFF;
	}
	
	.setting_arrow{
		width: 14rpx;
		height: 28rpx;
	}
	
	.setting_item{
		width: 594rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		margin-top: 0rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.none{
		width: 594rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		margin-top: 0rpx;
	}
	
	.shopping{
		width: 654rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 2rpx 4rpx rgba(0,0,0,0.12);
		background-color: #FFFFFF;
	}
	
	.shopping_item{
		width: 594rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		margin-top: 0rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.btn{
		width: 654rpx;
		height: 80rpx;
		margin-top: 30rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}
</style>
