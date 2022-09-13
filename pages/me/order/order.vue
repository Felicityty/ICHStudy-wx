<template>
	<view class="container">
		<view v-for="(item, index) in orderinfo" :key="index">
			<orders :orderinfo="item" :language="language" v-if="isOrder"></orders>
		</view>
	</view>

</template>

<script>
	import {
		orders
	} from '../../../components/tourist/touristOrder.vue'
	import {
		getTouristList,
		getRegistrationList,
		getTouristSectionList
	} from '../../../api/tourist/tourist.js'
	export default {
		components: {
			orders
		},
		data() {
			return {
				username: '',
				orderinfo: [],
				dingdan: 0,
				touristinfo: [],
				isOrder: false,
				language: 1,
			}
		},
		onLoad() {
			const token = wx.getStorageSync('token')
			if (token) {
				this.isToken = true
				console.log("有token啦")
				// this.getRegistrationList()
				// this.getTouristList()
			}
		},
		onShow() {
			const userInfo = wx.getStorageSync('userInfo')
			this.username = userInfo.username
			const language = wx.getStorageSync('language')
			this.language = language
			this.getRegistrationList()
			this.getTouristList()
		},
		methods: {
			getRegistrationList() {
				getRegistrationList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						const order = []
						var num = 0
						data.forEach(item => {
							if (this.username === item.uindex) {
								if (item.ON != this.dingdan) {
									this.dingdan = item.ON
									order.push({
										dingdan: item.ON,
										username: item.uindex,
										phonenum: item.phone_number,
										tindex: item.tindex,
										tsindex: item.tsindex,
										create_time: item.create_time,
										mates: []
									})
								}
							}
						})
						this.orderinfo = order
						data.forEach(item => {
							if (this.username === item.uindex) {
								if (item.ON === this.orderinfo[num].dingdan) {
									this.orderinfo[num].mates.push({
										audienceID: item.userID,
										audienceName: item.username
									})
								} else {
									if (item.ON === this.orderinfo[++num].dingdan) {
										this.orderinfo[num].mates.push({
											audienceID: item.userID,
											audienceName: item.username
										})
									}
								}
							}
						})
						// console.log(this.orderinfo)
					})
					.catch(err => console.log(err))
			},
			getTouristList() {
				getTouristList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						console.log(data)
						const tourist = []
						data.forEach(item => {
							tourist.push({
								tindex: item.tindex,
								entitle: item.enname,
								cntitle: item.cnname,
								price: item.price
							})
						})
						this.orderinfo.forEach(item => {
							tourist.forEach(touristItem => {
								if (item.tindex === touristItem.tindex) {
									item.cntouristname = touristItem.cntitle
									item.entouristname = touristItem.entitle
									item.price = touristItem.price
								}
							})
						})
						for(let i = 0;i<this.orderinfo.length;i++){
							getTouristSectionList(this.orderinfo[i].tindex)
							.then(res => {
								const data = JSON.parse(res.data).endata.data
								for(let j = 0;j<data.length;j++){
									if(this.orderinfo[i].tsindex === data[j].tsindex){
										this.orderinfo[i].touristdate = data[j].data_info
										this.orderinfo[i].touristtime = data[j].specific_data
									}
									if(i===this.orderinfo.length-1&&j===data.length-1){
										this.isOrder = true
									}
								}
							})
							.catch(err => console.log(err))
						}
					})
					.catch(err => console.log(err))
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: calc(118rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(118rpx + env(safe-area-inset-bottom));
	}
</style>
