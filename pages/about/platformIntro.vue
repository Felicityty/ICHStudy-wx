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
				cnname: "非遗研学",
				enname: "International Studies",
				cnplatform: "中国非遗文旅一体化平台",
				enplatform: "International Study platform",
				cnintroText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0守护文化根脉，托起民族未来，本平台是一个致力于中国非物质文化遗产保护和传承的微信小程序，平台已与20位非遗传承人合作开发非遗项目，并已经与20个非遗研学基地建立合作关系，完成非遗数字化项目60余个，通过打造原汁原味数字化非遗研学产品、定制个性化研学路线，带动乡村振兴，并发展非遗研学新业态。",
				enintroText:"\xa0\xa0\xa0\xa0\xa0\xa0\xa0Guarding the cultural roots and supporting the future of the nation, this platform is a wechat applet dedicated to the protection and inheritance of China's intangible cultural heritage. The platform has developed intangible cultural heritage projects in cooperation with 20 intangible cultural heritage inheritors, established cooperative relations with 20 intangible cultural heritage research bases, completed more than 60 intangible cultural heritage digital projects, and promoted rural revitalization by creating authentic digital intangible cultural heritage research products and customizing personalized research routes, The development of new forms of non heritage research.",
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
	
</style>
