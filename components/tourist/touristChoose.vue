<template>
	<view class="choose">
		
		<view class="choose-top">
			<image class="choose-top-close" src="/static/images/iCons/cha.png" @click="closeChoose()"></image>
			<view class="choose-top-title">{{language ? entopHead : cntopHead}}</view>
		</view>
		
		<view class="choose-date">
			<view class="choose-heading">{{heading[0]}}</view>
			<view class="choose-date-list">
				
				<!-- 前三个选择框 -->
				<view v-for="(item, index) in showDate" :key="index" @click="change(index, item)">
					<!-- <touristChooseDate :info="item" :index="index"></touristChooseDate> -->
					<view class="choose-date-box" :style="{'border': item.isShow, 'background-color': item.surplus ? '#F7F3E8': '#F7F7F7'}">
						<!-- 选中 -->
						<view class="choose-date-tick" :style="{'display': item.isShow}">
							<image class="choose-date-tick-img" src="/static/images/iCons/tick.png"></image>
						</view>
						<!-- 售罄 -->
						<view class="choose-date-stop" :style="{'display': item.surplus ? 'none': 'block'}">
							<view class="choose-date-stop-words">售罄</view>
						</view>
						<view class="choose-date-asp">
							<view>{{ sessions[index] }}</view>
							<view> {{ item.month + '月' + item.days + '日'}}</view>
						</view>
					</view>
				</view>
				
				<!-- 最后展开日历的按钮 -->
				<view class="choose-date-expand" @click="open()">
					<image class="choose-date-expandbtn" src="../../static/images/iCons/arrowRightGrey.png" mode="aspectFit"></image>
				</view>
				
			</view>
		</view>
		
		<view class="choose-time">
			<view class="choose-heading">{{heading[1]}}</view>
			<view class="choose-time-list">
				
				<view v-for="(item, index) in visitTime" :key="index">
					<touristChooseTime :info="item"></touristChooseTime>
				</view>
				
			</view>
		</view>
		
		<!-- 日历插件 -->
		<uni-calendar ref="calendar" class="choose-calendar" :clear-date="false" 
		:insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate"
		:date="info.date" :selected="selected"
		@confirm="confirm"/>
		
		<view class="choose-choosed">
			已选择：{{chooseDate}} {{chooseTime}}
		</view>
		
		<view class="choose-confirm" @click="go()">
			<button type="default" class="btn">确定</button>
		</view>
		
	</view>
</template>

<script>
	import { touristChooseTime } from './touristChooseTime.vue'
	export default {
		name: 'choose',
		components: {
			touristChooseTime,
		},
		props: {
			priceDate:{
				type: Array,
			  default: []
			},
			visitTime:{
				type: Array,
			  default: []
			},
			cntopHead:{
				type: String,
			  default: ''
			},
			entopHead:{
				type: String,
			  default: ''
			},
			language:{
				type: Number,
			  default: 1
			}
		},
		data() {
			return {
				showDate: [],
				sessions: [ '第一场', '第二场', '第三场'],
				isShow: 'none',
				info: {
					lunar: true,
					insert: false,
					startDate: '',
					endDate: '',
					date: ''
				},
				selected: [],
				tindex: '',
				tsindex: '',
				chooseDate: '',
				chooseTime: '',
				showChoose: false,
				isToken: false
			}
		},
		computed: {
			heading() {
				if (this.language) {
					return ['Visit Date', 'Visit Time']
				} else {
				  return ['参观日期', '参观时间']
				}
			},
		},
		created() {
			const token = wx.getStorageSync('token')
			if (token) {
				this.isToken = true
			}
			// 之后写成传进来就好
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
			this.updateSelected()
			this.updateData()
			// console.log(this.priceDate)
			// 给对象添加属性
			// this.priceDate.forEach((item) => {
			// 	item.name = '2222'
			// })
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			closeChoose() {
				this.$emit('itemclick', this.showChoose) 
			},
			change(index, item) {
				if(item.surplus > 0) {
					this.priceDate.forEach((item) => {
					item.isShow = 'none'
				})
				this.$set(this.priceDate[item.id],'isShow', 'block')
				this.chooseDate = this.priceDate[item.id].date
				// console.log(this.priceDate)
				this.tindex = this.priceDate[item.id].tindex
				this.tsindex = this.priceDate[item.id].tsindex
				}
			},
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				var eArr = e.fulldate.split("-")
				var e_month = eArr[1]
				var e_days = eArr[2]
				this.priceDate.forEach((item) => {
					// 遍历所有，默认都没选中
					item.isShow = 'none'
					if(item.month === e_month && item.days === e_days) {
						if(item.id!=0 && item.id!=1) {
							this.showDate.splice(2, 1, this.priceDate[item.id])
							// console.log(item.id)
							this.$set(this.showDate[2],'isShow','block')
						} else {
							this.$set(this.showDate[item.id],'isShow','block')
						}
						this.$set(this.priceDate[item.id],'isShow','block')
						this.chooseDate = this.priceDate[item.id].date
						this.tindex = this.priceDate[item.id].tindex
						this.tsindex = this.priceDate[item.id].tsindex
					} 
				})
			},
			updateSelected() {
				this.showDate = this.priceDate.slice(0,3)
				this.priceDate.forEach((item) => {
					this.selected.push({date: item.date})
				})
			},
			updateData() {
				try {
					this.priceDate.forEach((item) => {
						if(item.surplus > 0) {
							// this.info.startDate = item.surplus
							item.isShow = 'block'
							throw new Error(item.date);
						}
					});
				} catch (e) {
					this.info.startDate = e.message
					this.info.date = e.message
					this.info.endDate = this.priceDate[this.priceDate.length-1].date
					this.chooseDate = e.message.toString()
					this.chooseTime = this.visitTime[0].time
					this.priceDate.forEach((item) => {
						if(this.info.date === item.date){
							this.tsindex = item.tsindex
							this.tindex = item.tindex
						}
					})
					// this.priceDate.forEach((item) => {
					// 	item.isShow = 'none'
					// })
				}
			},
			go() {
				const that = this
				if(!that.isToken) {
					uni.showModal({
						title: that.isLanguage ? 'Tips' : '提示',
						content: that.isLanguage ? 'Please Login First' : '请先登录',
						showCancel: true,
						cancelText: that.isLanguage ? 'Login' : '去登录',
						confirmText: that.isLanguage ? 'Cancel' : '取消',
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
						url: '/pages/tourist/confirmOrder?chooseDate=' + this.chooseDate + '&chooseTime=' + this.chooseTime
						+ '&tindex=' + this.tindex + '&tsindex=' + this.tsindex
					})
				}
			}
		}
	}
</script>

<style scoped>
	.choose {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 850rpx;
		width: 654rpx;
		background-color: #FFFFFF;
		z-index: 999;
		border-radius: 60rpx 60rpx 0 0;
		padding: 48rpx;
	}
	
	/* 顶部 */
	.choose-top {
		display: flex;
		justify-content: flex-start;
		height: 80rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.choose-top-close {
		height: 28rpx;
		width: 28rpx;
		margin: 10rpx 80rpx 0 0;
	}
	
	.choose-top-title {
		font-size: 36rpx;
		color: #382321;
		font-weight: 600;
	}
	
	.choose-heading {
		font-size: 28rpx;
		color: #73615D;
		margin-bottom: 24rpx;
	}
	
	/* 日期 */
	.choose-date {
		margin-top: 48rpx;
	}
	
	.choose-date-list,
	.choose-time-list{
		display: flex;
		flex-direction: row;
	}
	
	.choose-date-box {
		width: 186rpx;
		height: 116rpx;
		border-radius: 10rpx;
		background-color: #F7F3E8;
		border: 1rpx solid #9E9993;
		position: relative;
		margin-right: 16rpx;
	}
	
	.choose-date-tick {
		width: 31rpx;
		height: 35rpx;
		border-radius: 0 10rpx 0 10rpx;
		background-color: #987744;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
	
	.choose-date-tick-img {
		width: 30rpx;
		height: 30rpx;
	}
	
	.choose-date-stop {
		width: 52rpx;
		height: 35rpx;
		border-radius: 0 10rpx 0 10rpx;
		background-color: #E1E1E1;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 20rpx;
		color: #B0B0B0;
	}
	
	.choose-date-stop-words {
		margin: 4rpx;
	}
	
	.choose-date-asp {
		font-size: 26rpx;
		color: #382321;
		line-height: 40rpx;
		position: absolute;
		margin: 18rpx 0 0 32rpx;
	}
	
	.choose-date-expand {
		height: 116rpx;
		width: 50rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F7F3E8;
	}
	
	.choose-date-expandbtn {
		width: 30rpx;
		height: 30rpx;
	}
	
	/* 时间 */
	.choose-time {
		margin-top: 48rpx;
	}
	
	/* 已选择 */
	.choose-choosed {
		margin-top: 48rpx;
		font-size: 24rpx;
		color: #987744;
	}
	
	/* 确定按钮 */
	.btn{
		width: 654rpx;
		height: 80rpx;
		background-color: #987744;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		position: absolute;
		bottom: 100rpx;
	}
	
</style>