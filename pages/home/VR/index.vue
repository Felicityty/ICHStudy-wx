<template>
		<view class="content">
			
<!-- 			<view class="searchBox">
				<image src="../../../static/images/iCons/search.png" class="searchIcon"></image>
				<view class="searchText">搜索VR/AR名称</view>
			</view> -->
			
			<view class="listView">
				<view class="listItem" v-for="(item, index) in vrItem" :key="index" @click="goDetail(item.id)">
					<image class="listViewPic" :src="item.img"></image>
					<view class="listViewText">{{isLanguage ? item.enname : item.cnname}}</view>
				</view>
			</view>
			<tabbar :state="3"></tabbar>
		</view>
</template>

<script>
	import { getVrList, getVrList_tourist } from '../../../api/vr/index.js'
	import { getFileUrl } from '../../../common/index.js'
	import {tabbar} from'../../../components/tabbar/tabbar.vue'
	
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				vrItem: [],
				language: 1,
				isLanguage: true,
				vrClick: 0,
				isToken: false
			}
		},
		onShow() {
			// const userInfo = wx.getStorageSync('userInfo')
			const token = wx.getStorageSync('token')
			const language = wx.getStorageSync('language')
			this.language = language
			// console.log(this.language)
			this.getLanguage()
			// console.log(this.isLanguage)
			if(token) {
				this.getVrList()
				this.isToken = true
				// this.getBannerList()
				console.log("有token啦")
			} else {
				this.getVrList_tourist()
				// this.getBannerList()
				console.log("游客模式开启")
			}
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			goDetail(id) {
				const that = this
				that.vrClick = wx.getStorageSync('vrClick')
				that.vrClick++
				// console.log(that.vrClick)
				uni.setStorage({
					key: 'vrClick',
					data: that.vrClick
				})
				if(that.vrClick > 3 && !that.isToken) {
					uni.showToast({
						title: '试看结束，请先登录',
						icon: 'none'
					})
					setTimeout(() => { // 显示几秒后再跳转到index页面
							uni.reLaunch({
									url: '../../index/index'
							});
						}, 1500)
				} else {
					uni.navigateTo({
						url: './vrDetail?id=' + id
					})
				}
			},
			getVrList_tourist() {
				getVrList_tourist()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						console.log(data)
						const vrs =[]
						data.forEach(item => {
							vrs.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						this.vrItem = vrs
						// console.log(this.vrItem)
					})
					.catch(err => console.log(err)) 
			},
			getVrList() {
				getVrList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						console.log(data)
						const vrs =[]
						data.forEach(item => {
							vrs.push({
								id: item.id,
								cnname: item.vrcnname,
								enname: item.vrenname,
								img: getFileUrl('img', item.cover)
							})
						})
						this.vrItem = vrs
						// console.log(this.vrItem)
					})
					.catch(err => console.log(err)) 
			}
		}
	}
</script>

<style scoped>
	.content{
		width: 750rpx;
		height: 100%;
		position: relative;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	}
	
	.searchBox{
		width: 654rpx;
		height: 64rpx;
		margin: 12rpx 48rpx 0;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	
	.searchIcon{
		width: 36rpx;
		height: 40rpx;
		margin-left: 18.22rpx;
	}
	
	.searchText{
		font-size: 28rpx;
		line-height: 40rpx;
		color: #73615D;
		margin-left: 11.28rpx;
	}
	
	.listView{
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 36rpx 48rpx;
	}
	
	.listViewPic{
		width: 654rpx;
		height: 312rpx;
		border-radius: 20rpx;
	}
	
	.listViewText{
		margin-top: 20rpx;
		margin-bottom: 36rpx;
		font-size: 28rpx;
		line-height: 20px;
		color: #382321;
	}
	
</style>
