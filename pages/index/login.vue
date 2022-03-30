<template>
	<view class="content">
		<view class="back" @click="goOff()">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<view class="input-box">
			<input type="text" :placeholder="getUsername()" v-model="userInfo.username" placeholder-class="phcolor">
		</view>
		<view class="input-box">
			<input type="password" :placeholder="getPassword()" v-model="userInfo.password" placeholder-class="phcolor">
		</view>
		<view class="index-btn" @click="login()">{{isLanguage ? 'Sign In' : '登录'}}</view>
		<image class="bg" src="../../static/images/indexBG.png"></image>
	</view>
</template>

<script>
	import { login, getUserInfo } from '../../api/user'
	export default {
		data() {
			return {
				userInfo: {
					username: '',
					password: '',
				},
				language: 0,
				isLanguage: false
			}
		},
		onShow() {
			this.getLanguage()
		},
		methods: {
			getUsername() {
				if(this.isLanguage)
					return 'Input account'
				else
					return '请输入账号'
			},
			getPassword() {
				if(this.isLanguage)
					return 'Input password'
				else
					return '请输入密码'
			},
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goOff() {
				uni.navigateBack({});
			},
			getInfo(){
				getUserInfo()
				.then(res => {
					const result = JSON.parse(res.data).endata.data
					// console.log(result)
					this.userInfo = result
					uni.setStorage({
						key: 'userInfo',
						data: this.userInfo
					})
				})
				.catch(err => console.log(err))
			},
			login() {
				if (!this.userInfo.username) {
					uni.showToast({
						title: '请填写账号',
						icon: 'none'
					})
					return
				}
				if (!this.userInfo.password) {
					uni.showToast({
						title: '请填写密码',
						icon: 'none'
					})
					return
				}
				login(this.userInfo.username, this.userInfo.password)
					.then(res => {
						const that = this
						const data = JSON.parse(res.data).endata
						// console.log(data)
						uni.showToast({
							title: data.msg,
							icon: 'none'
						})
						if(data.su === 0) {
							return
						} else {
							uni.setStorage({
								key: 'token',
								data: data.token,
								success() {
									that.getInfo()
									uni.reLaunch({
										url: '../home/index',
									})
								}
							})
						}
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style>
	.back{
		height: 58rpx;
		width: 58rpx;
		background-color: #FFFFFF;
		border-radius: 100rpx;
		position: absolute;
		top: 90rpx;
		left: 48rpx;
	
	}
	
	.arrow-left{
		margin-top: 7rpx;
		height: 43rpx;
		width: 57rpx;
	}
	
	.bg {
	  width: 100%;
		height: 100%;
	  position: fixed;
	  top: 0;
	  left:0;
	  z-index: -99;
	}
	
	.content {
		padding-top: 31vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.index-btn{
		width: 654rpx;
		height: 84rpx;
		margin-top: 114rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 84rpx;
	}
</style>
