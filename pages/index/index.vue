<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<!-- <text class="title">{{title}}</text> -->
			<!-- <button type="default" @click="test" >test</button> -->
		</view>
	</view>
</template>

<script>
	import { exampleGET, examplePOST } from '../../api/example.js'
	export default {
		data() {
			return {
				title: '国际研学小程序'
			}
		},
		onLoad() {
			

		},
		methods: {
			test() {
				// exampleGET()
				// 	.then(res => {
				// 		console.log(res)
				// 	})
				// 	.catch(err => console.log(err))
				examplePOST()
					.then(res => {
						console.log(res)
						console.log(JSON.parse(res.data))
					})
					.catch(err => console.log(err))
			}					
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.bottom-bar {
		height: 98rpx;
		width: 100%;
		background-color: #ff0000;
		position: fixed;
		bottom: 68rpx;
	}
	
	.bottom {
		height: 68rpx;
		width: 100%;
		background-color: #007AFF;
		position: fixed;
		bottom: 0;
	}
</style>
