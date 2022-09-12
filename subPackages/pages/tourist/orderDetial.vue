<template>
	<view class="container">
		<view class="top">
			<view class="title">{{language ? entitle : cntitle}}</view>
			<view class="inform">{{language ? enaddress : cnaddress}}</view>
			<view class="inform">{{chooseDate + ' ' + chooseTime}}</view>
			<view class="line"></view>
			<view class="circular1"></view>
			<view class="circular2"></view>
			<view class="number">
				<view>{{language ?'Serial number '+block2+xulie:'序列号'+block1+xulie}}</view>
			</view>
			<image class="code" mode="aspectFill" :src="QRcode"></image>
		</view>

		<view class="bottom">
			<view>{{language ?'Order number'+block1+orderNum:'订单号'+block1+orderNum}}</view>
			<view>
				{{language ?'Total price '+block1+'￥'+cost*ticketNum+'（X'+ticketNum+'）':'总价'+block2+'￥'+cost*ticketNum+'（'+ticketNum+'张）'}}
			</view>
		</view>

		<button class="doneBtn" @click="done()">{{language?'Done':'完成'}}</button>
	</view>
</template>

<script>
	import {
		getTouristList,
		getRegistrationList,
		getTouristSectionList
	} from '../../../api/tourist/tourist.js'
	export default {
		data() {
			return {
				user: {},
				language: 0,
				isToken: false,
				tindex: null,
				tsindex: null,
				entitle: '',
				cntitle: '',
				enaddress: '',
				cnaddress: '',
				createTime: '',
				chooseDate: '',
				chooseTime: '',
				xulie: 123,
				QRcode: '../../../static/images/QRcode.jpg',
				orderNum: 12345,
				cost: 0,
				ticketNum: 0,
				em1: '\u0020\u0020\u0020',
				em2: '\u0020\u0020\u0020\u0020\u0020\u0020',
				block1: '\xa0\xa0\xa0',
				block2: '\xa0\xa0\xa0\xa0\xa0\xa0',
				block3: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
			}
		},
		onLoad(options) {
			this.tindex = options.tindex;
			this.tsindex = options.tsindex;
			this.createTime = options.createTime;
			const token = wx.getStorageSync('token');
			if (token) {
				this.isToken = true;
				console.log("有token啦");
				this.getTouristList()
				this.getRegistrationList()
				this.getTouristSectionList()
			}
		},
		onShow() {
			const userInfo = wx.getStorageSync('userInfo')
			this.user = userInfo
			const language = wx.getStorageSync('language');
			this.language = language;
		},
		methods: {
			getRegistrationList() {
				getRegistrationList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						console.log(data)
						let len = 0
						let time = 0
						data.forEach(item => {
							if(this.user.username === item.uindex &&
							this.tindex === item.tindex &&
							this.tsindex === item.tsindex){
								// 将时间戳转换为json日期格式
								var dateee = new Date(item.create_time).toJSON()
								// 转换为普通时间年月日时分秒
								time = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
								if(Math.abs(new Date(time).getTime() - new Date(this.createTime).getTime()) < 3000){
									len = len + 1
									this.xulie = item.SN
									this.orderNum = item.ON
								}
								console.log(time)
							}
						})
						this.ticketNum = len					
					})
					.catch(err => console.log(err))
			},
			getTouristList() {
				getTouristList()
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						// console.log(data)
						data.forEach(item => {
							if(item.tindex === this.tindex){
								this.entitle = item.enname
								this.cntitle = item.cnname
								this.enaddress = item.enlocation
								this.cnaddress = item.cnlocation
								this.cost = item.price
							}
						})
					})
					.catch(err => console.log(err))
			},
			getTouristSectionList(){
				getTouristSectionList(this.tindex)
					.then(res => {
						const data = JSON.parse(res.data).endata.data
						data.forEach(item => {
							if(item.tsindex === this.tsindex){
								this.chooseDate = item.data_info
								this.chooseTime = item.specific_data
							}
						})
					})
					.catch(err => console.log(err))
			},
			done() {
				uni.navigateBack({
					delta: 3
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 120rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
	}

	.top {
		width: 594rpx;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		background-color: #ffffff;
		padding: 30rpx 30rpx 34rpx 30rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}

	.bottom {
		width: 594rpx;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		color: #73615D;
		font-size: 28rpx;
		line-height: 48rpx;
	}

	.title {
		font-size: 34rpx;
		line-height: 46rpx;
		color: #382321;
		font-weight: 600;
	}

	.inform {
		color: #73615D;
		font-size: 28rpx;
		margin-top: 20rpx;
	}

	.line {
		width: 100%;
		height: 2rpx;
		background-color: #E5E5E5;
		margin-top: 30rpx;
	}

	.circular1,
	.circular2 {
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		background-color: #F9F3EB;
		position: absolute;
		left: 28rpx;
		top: 218rpx;
	}

	.circular2 {
		position: absolute;
		left: 682rpx;
		top: 218rpx;
	}

	.number {
		background-color: #F9F9F9;
		border-radius: 10rpx;
		width: 554rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-top: 30rpx;
		font-size: rpx;
		color: #8F8F8F;
		padding: 16rpx 20rpx;
		line-height: 64rpx;
	}

	.code {
		width: 380rpx;
		height: 380rpx;
		display: flex;
		margin: 0 auto;
		margin-top: 30rpx;
		display: block;
		border-radius: 20rpx;
	}

	.doneBtn {
		background-color: #987744;
		color: #FFFFFF;
		width: 240rpx;
		height: 80rpx;
		margin-top: 30rpx;
		border-radius: 80rpx;
		font-size: 28rpx;
		line-height: 80rpx;
	}
</style>
