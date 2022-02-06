<template>
	<view class="content">
		<view class="index-btn" @click="go('login')">登录</view>
		<view class="index-btn" @click="go('register')">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			go(url){
				uni.navigateTo({
					url,
				})
			}				
		}
	}
</script>

<style>
	.content {
		padding-top: 25vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
