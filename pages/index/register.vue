<template>
	<view class="content">
		<view class="back" @click="goOff()" :style="{top: scrollTop + 'rpx'}">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<view class="input-box">
			<input type="text" :placeholder="getUsername()" v-model="username" 
				placeholder-class="phcolor" @blur="checkName()">
		</view>
		<view class="tips">{{tipName}}</view>
		<view class="input-box">
			<input type="password" :placeholder="getPassword()" v-model="password" 
				placeholder-class="phcolor" @blur="checkPwd()">
		</view>
		<view class="tips">{{tipCheck}}</view>
		<view class="input-box">
			<input type="password" :placeholder="checkPassword()" v-model="checkword" 
				placeholder-class="phcolor" @blur="checkdPwd()">
		</view>
		<view class="tips">{{tipdCheck}}</view>
		<view class="index-btn" @click="next()">{{isLanguage ? 'Next' : '下一步'}}</view>
		<image class="bg" src="../../static/images/indexBG.png"></image>
	</view>
</template>

<script>
	import { register } from '../../api/user'
	
	export default {
		data() {
			return {
				username: '',
				password: '',
				checkword: '',
				tipName: '',
				tipCheck: '',
				tipdCheck: '',
				language: 1,
				isLanguage: true,
				scrollTop: 0
			}
		},
		onLoad() {
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
			checkPassword() {
				if(this.isLanguage)
					return 'Check password'
				else
					return '请再次输入密码'
			},
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goOff() {
				uni.navigateBack({
				});
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
			checkName(){
				const reg = /^[0-9a-zA-Z]*$/
				const username = this.username
				if (!username) {
					this.tipName = "请输入账号"
				} else if (username.length < 6 || username.length > 20) {
					this.tipName = "账号长度需为6-20位"
				}else if(!reg.test(username)) {
					this.tipName = "用户名需为字母和数字"
				}else {
					this.tipName = "";
					return true 
				}
			},
			checkPwd(){
				if (this.password == '') {
					this.tipCheck = "请输入密码"
				}else {
					this.tipCheck = "";
					return true 
				}
			},
			checkdPwd(){
				if (this.checkword == '') {
					this.tipdCheck = "请再次输入密码"
				}else if (this.password != this.checkword) {
					this.tipdCheck = "两次输入密码不一致!"
				}else {
					this.tipdCheck = "";
					return true 
				}
			},
			next(){
				if(this.checkName() && this.checkPwd() && this.checkdPwd()) {
					register(this.username, this.password)
						.then(res => {
							const data = JSON.parse(res.data).endata
							console.log(data)
							// 注册成功
							uni.showToast({
								title: data.msg,
								icon: 'none'
							})
							if(data.su === 0) {
								return
							} else{
								uni.navigateTo({
									url: './next?name=' + this.username
								})
							}
						})
						.catch(err => console.log(err))
				}
			}
		}
	}
</script>

<style>
	.back{
		height: 60rpx;
		width: 60rpx;
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
		align-items: flex-start;
		margin-left: 48rpx;
		justify-content: center;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.tips{
		color: #FB8539;
		height: 54rpx;
		font-size: 26rpx;
		margin-left: 18rpx;
	}
		
	.index-btn{
		width: 654rpx;
		height: 84rpx;
		margin-top: 64rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 84rpx;
	}
	
	.input-box{			
		margin-top: 0;
	}
	
</style>
