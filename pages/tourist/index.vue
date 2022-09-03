<template>
	<view class="content">
		
		<view class="listView">
			<view v-for="(item,index) in touristsItem" :key="index">
				<touristItem :info="item" :language="language"></touristItem>
			</view>
		</view>

		<tabbar :state="3"></tabbar>
		
	</view>
</template>

<script>
	import { tabbar } from '../../components/tabbar/tabbar.vue'
	import { touristItem } from '../../components/tourist/touristItem.vue'
	import { choose } from '../../components/tourist/touristChoose.vue'
	import { getTouristList } from '../../api/tourist/tourist.js'
	import { getFileUrl } from '../../common/index.js'
	export default {
		components: {
			tabbar,
			touristItem,
			choose
		},
		data() {
			return {
				touristsItem: [],
				language: 0,
				isLanguage: true,
			}
		},
		onShow() {
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
			this.getTouristList()
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			getTouristList() {
				getTouristList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						const tourists = []
						data.forEach(item => {
							tourists.push({
								id: item.tindex,
								cnname: item.cnname,
								enname: item.enname,
								cnlocation: item.cnlocation,
								enlocation: item.enlocation,
								deadline: item.registration_deadline,
								price: item.price,
								img: getFileUrl('img', item.coverimg)
							})
						})
						this.touristsItem = tourists
						// console.log(this.touristsItem)
					})
					.catch(err => console.log(err))
			}
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

</style>
