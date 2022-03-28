<template>
		<view class="content">
			
			<view class="logo-group">
				<image class="logo" :src="logo"></image>
				<view class="name">{{isLanguage ? enname : cnname}}</view>
				<view class="platform">{{isLanguage ? enplatform : cnplatform}}</view>
			</view>
			
			<view class="text">{{isLanguage ? enintroText : cnintroText}}</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '平台介绍',
				logo: "../../static/images/iCons/logo.png",
				cnname: "国际研学",
				enname: "International Studies",
				cnplatform: "中国非遗对外服务平台",
				enplatform: "International Study platform",
				cnintroText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0我们以留学生为主要服务群体，以非传统、民间工艺等中国传统文化为教学内容，开发线上线下研究平台。",
				enintroText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0We take foreign students as the main service group and take non-traditional, folk crafts and other Chinese traditional culture as the teaching content to develop online and offline research platforms.",
				language: 1,
				isLanguage: true
			}
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
			getLanguage() {
				if(this.language == 1) this.isLanguage = true
				else this.isLanguage = false
			}
		}
	}
</script>

<style scoped>
	.content{
		width: 750rpx;
		height: 100%;
		position: relative;
	}
	
	.logo-group{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	
	.logo{
		height: 141.72rpx;
		width: 160rpx;
		margin-top: 48rpx;
	}
	
	.name{
		margin-top: 16.28rpx;
		font-size: 40rpx;
		line-height: 58rpx;
		color: #382321;
	}
	
	.platform{
		font-size: 24rpx;
		line-height: 34rpx;
		color: #382321;
	}
	
	.text{
		font-size: 28rpx;
		line-height: 36rpx;
		letter-spacing: 0.02em;
		color: #382321;
		margin:60rpx 48rpx 0 48rpx;
	}
	
</style>
