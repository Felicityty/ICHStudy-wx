<template>
	<view class="container">
		<view class="language" v-for="(item, index) in lanItem" 
		:key="item" @click="lanselect(index); save()">
			{{item}}
			<image :src="lan(index)" mode="aspectFill" class="check"></image>
		</view>
	</view>
</template>

<script>
	import { setting } from '../../../api/user/index.js'
	export default {
		data() {
			return {
				lanItem: ['简体中文', 'English'],
				userInfo: {
					username: '',
					nickname: '',
					sex: '',
					signature: '',
					language: 1
				},
				user: []
			}
		},
		onLoad() {
			const token = wx.getStorageSync('token')
			const userInfo = wx.getStorageSync('userInfo')
			if(token) {
				this.user = userInfo
				this.userInfo.username = userInfo[0]
				this.userInfo.nickname = userInfo[2]
				this.userInfo.signature = userInfo[5]
				this.userInfo.language = userInfo[6]
			}
			if (this.userInfo.language == 1) {
				return '../../../static/images/iCons/check.png'
			} else {
				return ''
			}
		},
		methods: {
			lanselect(index) {
				this.userInfo.language = index
			},
			lan(index) {
				if (this.userInfo.language == index) {
					return '../../../static/images/iCons/check.png'
				} else {
					return ''
				}
			},
			save() {
				setting(this.userInfo)
					.then(res => {
						const data = JSON.parse(res.data).endata
						if (data.su === 1) {
							this.user[6] = this.userInfo.language
							console.log(this.user)
							uni.removeStorageSync('userInfo')
							uni.setStorage({
								key: 'userInfo',
								data: this.user,
								success() {
									wx.reLaunch({
										url:'../index'
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
	.container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.check {
		width: 40rpx;
		height: 40rpx;
	}

	.language {
		width: 654rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
		border-bottom: 2rpx solid #E5E5E5;
		font-size: 32rpx;
		color: #382321;
	}
</style>
