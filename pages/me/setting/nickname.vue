<template>
	<view class="nickname">
		<input type="text" @blur="save()" v-model="userInfo.nickname" placeholder="请输入昵称" placeholder-class="phcolor" class="nickname_content"/>
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
				user: []
			}
		},
		methods: {
			save () {
			  setting(this.userInfo)
			    .then(res => {
			      const data = JSON.parse(res.data).endata
			      if (data.su === 1) {
							this.user[2] = this.userInfo.nickname
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
			},
		},
		onLoad() {
			const token = wx.getStorageSync('token')
			const userInfo = wx.getStorageSync('userInfo')
			if(token) {
				this.user = userInfo
				this.userInfo.username = userInfo[0]
				this.userInfo.nickname = userInfo[2]
				this.userInfo.signature = userInfo[5]
			}
		}
	}
</script>

<style>
	.nickname{
		width: 654rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
		margin-left: 48rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.phcolor{
		color: #73615D;
		font-size: 32rpx;
	}
	
	.nickname_content{
		width: 100%;
		margin-left: 10rpx;
	}
</style>
