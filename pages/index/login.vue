<template>
	<view class="content">
		<view class="input-box">
			<input type="text" placeholder="请输入用户名" v-model="username">
		</view>
		<view class="input-box">
			<input type="password" placeholder="请输入密码" v-model="password">
		</view>
		<view class="index-btn" @click="login()">登录</view>
	</view>
</template>

<script>
	import { login } from '../../api/user'
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				if (!this.username) {
					uni.showToast({
						title: '请填写用户名',
						icon: 'none'
					})
					return
				}
				if (!this.password) {
					uni.showToast({
						title: '请填写密码',
						icon: 'none'
					})
					return
				}
				login(this.username, this.password)
					.then(res => {
						const data = JSON.parse(res.data).endata
						console.log(data)
						uni.showToast({
							title: data.msg,
							icon: 'none'
						})
						if(data.su === 0) {
							return
						} else {
							uni.setStorage({
								key: 'token',
								data: data.token
							})
							uni.setStorage({
								key: 'userInfo',
								data: data.userdata[0],
								success() {
								}
							})
							uni.reLaunch({
								url: '../home/index',
							})
						}
					})
					.catch(err => console.log(err))
			}
		}
	}
</script>

<style>
	.content {
		padding-top: 15vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
