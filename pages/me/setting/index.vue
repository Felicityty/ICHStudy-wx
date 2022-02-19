<template>
	<view class="container">	
		<view class="photo">
			<text class="text">{{title[0]}}：</text>
			<image :src="userInfo.avatarUrl" mode="aspectFill" class="photo_img"></image>
			<image :src="arrow" mode="aspectFill" class="arrow"></image>
		</view>
		
		<view class="account">
			<text class="text">{{title[1]}}：</text>
			<view class="account_right">
				<view class="account_content">{{userInfo.username}}</view>
				<image :src="arrow" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="nickname" @click="nick()">
			<text class="text">{{title[2]}}：</text>
			<view class="nickname_right">
				<view class="nickname_content">{{userInfo.nickname}}</view>
				<image :src="arrow" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="signature" @click="sign()">
			<text class="text">{{title[3]}}：</text>
			<view class="signature_right">
				<view class="signature_content">{{userInfo.signature}}</view>
				<image :src="arrow" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="email">
			<text class="text">{{title[4]}}：</text>
			<view class="email_right">
				<view class="email_content">{{userInfo.email}}</view>
				<image :src="arrow" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="password">
			<text class="text">{{title[6]}}：</text>
			<view class="password_right">
				<view class="password_content">{{userInfo.password}}</view>
				<image :src="arrow" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				arrow: '../../../static/images/iCons/arrowRightLightbrown.png',
				userInfo: {
					avatarUrl: '../../../static/images/iCons/touxiang.png',
					username: '',
					nickname: '',
					sex: '',
					signature: '',
					email: '',
					ver: '',
					password: '',
					checkpwd: ''
				},
				language: 1,
				isLanguage: true
			}
		},
		onShow() {
			const token = wx.getStorageSync('token')
			const userInfo = wx.getStorageSync('userInfo')
			// console.log(userInfo)
			if(token) {
				this.userInfo.username = userInfo[0]
				this.userInfo.avatarUrl = userInfo[1]
				this.userInfo.nickname = userInfo[2]
				this.userInfo.email = userInfo[3]
				this.userInfo.password = userInfo[4]
				this.userInfo.signature = userInfo[5]
				this.language = userInfo[6]
				this.getLanguage()
			}
		},
		methods: {
			getLanguage() {
				if(this.language == 1) this.isLanguage = true
				else this.isLanguage = false
			},
			nick(){
				uni.navigateTo({
					url: "../setting/nickname"
				})
			},
			sign(){
				uni.navigateTo({
					url: "../setting/signature"
				})
			}
		},
		computed:{
			title() {
			  if (this.language) {
					return ['Profile', 'Id', 'Nick Name', 'Signature', 'Email', 'Verification', 'Password']
			  } else {
			    return ['头像', '账号', '昵称', '个性签名', '邮箱', '验证码', '密码']
			  }
			}
		}
	}
</script>

<style>
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.text{
		font-size: 32rpx;
		color: #382321;
		white-space:nowrap;
	}
	
	.arrow{
		width: 14rpx;
		height: 28rpx;
	}
	
	.photo{
		width: 654rpx;
		height: 132rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.photo_img{
		width: 104rpx;
		height: 104rpx;
		margin-left: 404rpx;
	}
	
	.account,.nickname,.email,.password{
		width: 654rpx;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.signature{
		width: 654rpx;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.account_right,.nickname_right,.signature_right,.email_right,.password_right{
		width: 558rpx;
		display: flex;
		flex-direction: row;
		justify-content:flex-end;
		align-items: center;
	}
	
	.signature_right{
		width: 494rpx;
	}
	
	.account_content,.nickname_content,.email_content,.password_content{
		font-size: 28rpx;
		color: #382321;
		margin-right: 30rpx;
	}
	
	.signature_content{
		width: 400rpx;
		font-size: 28rpx;
		color: #382321;
		position: relative;
		right: 30rpx;
		text-align: right;
		overflow:hidden;
		white-space: normal;
		word-break: break-all;
	}
</style>
