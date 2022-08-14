<template>
	<view class="vrPage">
		<view class="listView">
			<view class="listItem" v-for="(item, index) in vrItem" :key="index" @click="goDetail(item.id)">
				<image class="listViewPic" :src="item.img"></image>
				<view class="listViewText">{{isLanguage ? item.enname : item.cnname}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getVrList, getVrList_tourist } from '../../api/vr/index.js'
	import { getFileUrl } from '../../common/index.js'
	export default {
		name: 'vrPage',
		props: {
			language:{
				type: Number,
		    default: 1
			},
		},
		data() {
			return {
				vrItem: [],
				vrClick: 0,
				isToken: false,
			}
		},
		created() {
			const token = wx.getStorageSync('token')
			if (token) {
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
			goDetail(id) {
				const that = this
				that.vrClick = wx.getStorageSync('vrClick')
				that.vrClick++
				// console.log(that.vrClick)
				uni.setStorage({
					key: 'vrClick',
					data: that.vrClick
				})
				if (that.vrClick > 3 && !that.isToken) {
					uni.showModal({
						title: that.isLanguage ? 'Tips' : '提示',
						content: that.isLanguage ? 'Reach the upper limit' : 'VR观看次数已达上限',
						showCancel: true,
						cancelText: that.isLanguage ? 'Login' : '去登录',
						confirmText: that.isLanguage ? 'Other' : '观看其他',
						cancelColor: '#73615D',
						confirmColor: '#8F8F8F',
						success: function(res) {
							if (res.confirm) {
								return
							} else if (res.cancel) {
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '../../pages/home/VR/vrDetail?id=' + id
					})
				}
			},
			getVrList_tourist() {
				getVrList_tourist()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						const vrs = []
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
						// console.log(data)
						const vrs = []
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
	.listView {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 36rpx 48rpx;
	}
	
	.listViewPic {
		width: 654rpx;
		height: 312rpx;
		border-radius: 20rpx;
	}
	
	.listViewText {
		margin-top: 20rpx;
		margin-bottom: 36rpx;
		font-size: 28rpx;
		line-height: 20px;
		color: #382321;
	}
</style>
