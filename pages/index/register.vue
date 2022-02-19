<template>
	<view class="content">
		<view class="back" @click="goOff()">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<view class="input-box">
			<input type="text" :placeholder="getUsername()" v-model="username" 
				placeholder-class="phcolor" @blur="checkName()">
		</view>
		<view class="tips">{{tipName}}</view>
		<view class="input-box">
			<input type="password" :placeholder="getUsername()" v-model="password" 
				placeholder-class="phcolor">
		</view>
		<view class="tips"></view>
		<view class="input-box">
			<input type="password" :placeholder="checkPassword()" v-model="checkword" 
				placeholder-class="phcolor" @blur="checkPwd()">
		</view>
		<view class="tips">{{tipCheck}}</view>
		<view class="input-box">
			<input type="text" :placeholder="getEmail()" v-model="email" 
				placeholder-class="phcolor">
		</view>
		<view class="tips">{{tipEmail}}</view>
		<view class="identify-code">
			<view class="identify-box">
				<input type="password" :placeholder="getVer()" v-model="ver" 
					placeholder-class="phcolor" @blur="checkVerification()">
			</view>
			<view class="identify-btn" @click="sendVer(email)">{{isLanguage ? 'Send VER' : '发送验证码'}}</view>
		</view>
		<view class="tips">{{tipVer}}</view>
		<view class="index-btn" @click="checkVerification();checkVer(ver, email)">{{isLanguage ? 'Sign Up' : '注册'}}</view>
		<image class="bg" src="../../static/images/indexBG.png"></image>
	</view>
</template>

<script>
	import { register, sendVer, checkVer } from '../../api/user'
	
	export default {
		data() {
			return {
				username: '',
				password: '',
				checkword: '',
				email: '',
				ver: '',
				tipEmail: '',
				tipName: '',
				tipCheck: '',
				tipVer: '',
				language: 1,
				isLanguage: true
			}
		},
		onShow() {
			const userInfo = wx.getStorageSync('userInfo')
			this.language = userInfo[6]
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
			getEmail() {
				if(this.isLanguage)
					return 'Input email'
				else
					return '请输入邮箱'
			},
			getVer() {
				if(this.isLanguage)
					return 'Input Verification'
				else
					return '请输入验证码'
			},
			getLanguage() {
				if(this.language == 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goOff() {
				uni.navigateBack({
				});
			},
			checkName(){
				const reg = /^[0-9a-zA-Z]*$/
				const username = this.username
				if (!username) {
					this.tipName = "请输入账号"
				} else if (username.length < 8 || username.length > 20) {
					this.tipName = "账号长度需为8-20位"
				}else if(!reg.test(username)) {
					this.tipName = "用户名需为字母和数字"
				}else {
					this.tipName = "";
					return true 
				}
			},
			checkPwd(){
				if (this.checkword == '') {
					this.tipCheck = "请再次输入密码"
				}else if (this.password != this.checkword) {
					this.tipCheck = "两次输入密码不一致!"
				}else {
					this.tipCheck = "";
					return true 
				}
			},
			checkVerification(){
				if (this.ver == '') {
					this.tipVer = "请输入验证码"
				}else {
					this.tipVer = "";
					return true 
				}
			},
			check(){
					register(this.username, this.password, this.email)
						.then(res => {
						const data = JSON.parse(res.data).endata
						// console.log(data)
						// 注册成功
						uni.showToast({
							title: data.msg,
							icon: 'none'
						})
						if(data.su === 0) {
							return
						} 
						})
						.catch(err => console.log(err))
			},
			sendVer (email) {
				if(this.checkName() && this.checkPwd()){
					this.check()
					sendVer('/vregsend/', email)
					  .then(res => {
					    const data = JSON.parse(res.data).endata
					    // console.log(data)
							// 邮箱不存在/已发送验证码给..
					    // uni.showToast({
					    // 	title: data.msg,
					    // 	icon: 'none'
					    // })
					    // if(data.su === 0) {
					    // 	return
					    // }
					  })
					  .catch(err => console.log(err))
				}else{
					uni.showToast({
						title: '请确保信息填写正确且完整',
						icon: 'none'
					})
				}
			},
			checkVer(ver, email) {
				if(this.checkName() && this.checkPwd() && this.checkVerification()){
					checkVer(ver, email)
					  .then(res => {
					    const data = JSON.parse(res.data).endata
							uni.reLaunch({
								url: '../index/index',
							})
					    // console.log(data)
							// 激活成功
					    uni.showToast({
					    	title: data.msg,
					    	icon: 'none'
					    })
					    if(data.su === 0) {
					    	return
					    }
					  })
					  .catch(err => console.log(err))
				}else{
					uni.showToast({
						title: '请确保信息填写正确且完整',
						icon: 'none'
					})
				}
			  
			},
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
		padding-top: 24vh;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		margin-left: 48rpx;
		justify-content: center;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.identify-code{
			width: 654rpx;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
		
		.identify-box{
			width: 400rpx;
			border-bottom: 2rpx solid #D6CEBD;
		}
		
		.identify-box input{
			width: 400rpx;
		}
		
		.identify-btn{
			width: 210rpx;
			height: 68rpx;
			color: #FFFFFF;
			background-color: #987744;
			text-align: center;
			font-size: 28rpx;
			line-height: 68rpx;
			border-radius: 20rpx;
		}
		
		.tips{
			color: #FB8539;
			height: 54rpx;
			font-size: 26rpx;
			margin-left: 6rpx;
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
		
		.input-box{
			margin-top: 0;
		}
	
</style>
