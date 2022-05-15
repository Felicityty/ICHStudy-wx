<template>
		<view class="content">
			
			<view class="logo-group">
				<image class="logo" :src="logo"></image>
				<view class="name">{{isLanguage ? enname : cnname}}</view>
				<view class="platform">{{isLanguage ? enplatform : cnplatform}}</view>
			</view>
			
			<view class="text">{{isLanguage ? enintroText : cnintroText}}</view>
			<view class="qq-num" @click="copyNum()">{{isLanguage ? enqqText : cnqqText}}</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '关于我们',
				logo: "../../static/images/iCons/logo.png",
				cnname: "非遗研学",
				enname: "International Studies",
				cnplatform: "中国非遗文旅一体化平台",
				enplatform: "International Study platform",
				cnintroText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0与20位非遗传承人展开合作，开发60个非遗数字化产品，产品形式包括非遗短视频、交互媒体、移动应用、微课、VR全景及专题网站。",
				enintroText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0Cooperate with 20 inheritors of intangible cultural heritage to develop 60 intangible cultural heritage digital products in the form of intangible cultural heritage short video, interactive media, mobile application, micro class, VR panorama and special website.",
				cnqqText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0平台官方QQ号：3517004704 （点击复制）",
				enqqText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0Official QQ number of the platform:3517004704(Click Copy)",
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
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			copyNum() {
				uni.setClipboardData({
					data: '3517004704',
					success:function(){
						console.log('success');
					}
				})
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
		width: 220rpx;
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
		line-height: 44rpx;
		letter-spacing: 0.02em;
		color: #382321;
		margin:60rpx 48rpx 0 48rpx;
	}
	
	.qq-num{
		font-size: 28rpx;
		line-height: 36rpx;
		letter-spacing: 0.02em;
		color: #382321;
		margin:20rpx 48rpx 0 48rpx;
	}
	
</style>
