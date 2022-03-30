<template>
	<view class="container">
		<view class="signature">
			<textarea type="text" auto-height="true" @blur="save()" v-model="userInfo.signature" 
			placeholder="请输入个性签名" placeholder-class="phcolor" class="signature_content"/>
		</view>
		<view class="tips">{{tip}}</view>
	</view>
</template>

<script>
	import { setting } from '../../../api/user/index.js'
	
	export default {
		data() {
			return {
				userInfo: {
					username: '',
					nickname: '',
					sex: '',
					signature: '',
				},
				user: {},
				tip: '',
				language: 1
			}
		},
		methods: {
			check() {
				if (this.userInfo.signature.length > 30 ) {
					if (wx.getStorageSync('language') === 1){
						this.tip = "Signature length cannot exceed 30"
					}else{
						this.tip = "签名长度不能超过30"
					}
				}else{ 
					this.tip = ""
					return true 
				}
			},
			save() {
				if( this.check() ){
					setting(this.userInfo)
					  .then(res => {
					    const data = JSON.parse(res.data).endata
					    if (data.su === 1) {
								this.user.signature = this.userInfo.signature
								console.log(this.user)
								uni.removeStorageSync('userInfo')
								uni.setStorage({
									key: 'userInfo',
									data: this.user,
									success() {
									}
								})
					    }
					  })
					  .catch(err => console.log(err))
				}
			},
		},
		onShow(){
			const userInfo = wx.getStorageSync('userInfo')
			// this.language = userInfo[6]
		},
		onLoad() {
			const token = wx.getStorageSync('token')
			const userInfo = wx.getStorageSync('userInfo')
			if(token) {
				this.user = userInfo
				this.userInfo.username = userInfo.username
				this.userInfo.nickname = userInfo.nick_name
				this.userInfo.signature = userInfo.signature
			}
		}
	}

	
</script>

<style>
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	
	.signature{
		width: 654rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.signature_content{
		width: 100%;
		min-height: 32rpx;
		margin-left: 10rpx;
		line-height: 40rpx;
		white-space:normal;
		word-wrap:break-word;
		word-break:break-all;
	}
	
	.tips{
		width: 654rpx;
		color: #FB8539;
		font-size: 26rpx;
		margin-left: 30rpx;
	}
</style>
