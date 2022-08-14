<template>
		<view class="content">
			
			<!-- 分段器 -->
			<view>
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#372221"></uni-segmented-control>
				<view class="content">
					<view v-show="current === 0">
						<coursePage :language="language"></coursePage>
					</view>
					<view v-show="current === 1">
						<vrPage :language="language"></vrPage>
					</view>
					<view v-show="current === 2">
						选项卡3的内容
					</view>
					<view v-show="current === 3">
						选项卡4的内容
					</view>
				</view>
			</view>
			
			<tabbar :state="3"></tabbar>
		</view>
</template>

<script>
	import { tabbar } from '../../components/tabbar/tabbar.vue'
	import { vrPage } from '../../components/vrs/vrs.vue'
	import { coursePage } from '../../components/course/courses.vue'
	
	export default {
		components:{
			tabbar,
			vrPage,
			coursePage
		},
		data() {
			return {
				items: ['微课', 'VR/AR', '动画', '海报'],
				current: 0,
				language: 1,
				isLanguage: true,
			}
		},
		onLoad() {

		},
		onShow() {
			// const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			this.language = language
			// console.log(this.language)
			this.getLanguage()
			// console.log(this.isLanguage)
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			getLanguage() {
				if (wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
		}
	}
</script>

<style scoped>	
	.content {
		width: 750rpx;
		height: 100%;
		position: relative;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	}
	
	/deep/ .segmented-control__text {
		color: #372221 !important;
		font-size: 28rpx !important;
		line-height: 28rpx !important;
	}
	
	/deep/ .segmented-control__item--text {
		border-bottom-width: 6rpx;
		padding: 4rpx;
	}
	
</style>
