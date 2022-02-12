<template>
	<view class="content">
		<view class="back" @click="goOff()">
			<image class="arrow-left" src="../../static/images/iCons/arrowLeftBrown.png"></image>
		</view>
		<view class="input-box">
			<input type="text" placeholder="请输入账号" v-model="username" placeholder-class="phcolor" @blur="checkName()">
		</view>
		<view class="input-box">
			<input type="password" placeholder="请输入密码" v-model="password" placeholder-class="phcolor">
		</view>
		<view class="input-box">
			<input type="password" placeholder="请确认密码" v-model="checkword" placeholder-class="phcolor" @blur="checkPwd()">
		</view>
		<view class="input-box">
			<input type="text" placeholder="请输入邮箱" v-model="email" placeholder-class="phcolor">
		</view>
		<view class="identify-code">
			<view class="identify-box">
				<input type="password" placeholder="请输入验证码" v-model="ver" placeholder-class="phcolor">
			</view>
			<view class="identify-btn" @click="sendVer(email)">发送验证码</view>
		</view>
		<view class="index-btn" @click="checkVer(ver, email)">确认</view>
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
				ver: ''
			}
		},
		methods: {
			goOff() {
				uni.navigateBack({
				});
			},
			checkName(){
				const reg = /^[0-9a-zA-Z]*$/
				const username = this.username
				if (username.length < 8 || username.length > 20){
					uni.showToast({
						title: '账号长度需为8-20位',
						icon: 'none'
					})
					return
				}else if(!reg.test(username)){
					uni.showToast({
						title: '账号需为字母和数字',
						icon: 'none'
					})
					return
				}else {return true}
			},
			checkPwd(){
				if (this.password != this.checkword){
					uni.showToast({
						title: '两次输入密码不一致',
						icon: 'none'
					})
					return
				}else {return true}
			},
			check(){
				if (this.checkName() && this.checkPwd()){
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
				}
			},
			sendVer (email) {
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
			},
			checkVer(ver, email) {
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
	
	.identify-code{
		width: 654rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 54rpx;
	}
	
	.identify-box{
		width: 400rpx;
		height: 79rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #D6CEBD;
	}
	
	.identify-box input{
		width: 400rpx;
		margin-left: 10rpx;
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
	
</style>
