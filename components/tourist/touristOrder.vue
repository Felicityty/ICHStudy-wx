<template>
	<view class="order">
		<view class="order-intro">
			<image class="order-img" mode="aspectFill" src="../../static/images/QRcode.jpg"></image>
			<view class="order-info">
				<view class="order-info-name">{{language ? orderinfo.entouristname : orderinfo.cntouristname}}</view>
				<view>研学日期：{{orderinfo.touristdate}}</view>
				<view>研学时间：{{orderinfo.touristtime}}</view>
				<view>总价格：￥{{totalprice}}</view>
			</view>
		</view>
		
		<view class="zhankai" @click="showing = !showing">
			<view class="fold">
				{{showing ? '展开更多' : '收起更多'}}
				</view>
			<view class="arrow">
				<image class="arrowDown" :src="folded()"></image>
			</view>
		</view>
		
		<view class="order-info" v-show="!showing">
			<!-- <view>序列号：{{orderinfo.xuliehao}}</view> -->
			<view>订单创建时间：{{createtime}}</view>
			<view>订单编号：{{orderinfo.dingdan}}</view>
			<view>用户名：{{orderinfo.username}}</view>
			<view>电话号码：{{orderinfo.phonenum}}</view>
			<view>单价：{{orderinfo.price}}</view>
			<view>数量：{{num}}</view>
			<view v-for="(item, index) in orderinfo.mates" :key="index">
				<view>观众{{index+1}}:</view>
				<view>姓名：{{item.audienceID}}</view>
				<view>身份证号码：{{item.audienceName}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'orders',
		props: {
			orderinfo: {
				type: Object,
				default: {}
			},
			language: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				showing: true,
				num: 0,
				totalprice: 0,
				createtime: ''
			}
		},
		created() {
			console.log(this.orderinfo)
			this.num = this.orderinfo.mates.length
			this.totalprice = this.orderinfo.price * this.num
			var dateee = new Date(this.orderinfo.create_time).toJSON()
			this.createtime = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			// console.log(this.createtime)
		},
		methods: {
			folded(){
				if(this.showing == false){
				  return '/static/images/iCons/arrowUpBrown.png'    // false
				}else{
				  return '/static/images/iCons/arrowDownBrown.png'  // true
				} 
			},
		}
	}
</script>

<style scoped>
	.order {
		width: 594rpx;
		padding: 40rpx 30rpx;
		color: #73615D;
		background-color: #ffffff;
		border-radius: 20rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.order-intro {
		display: flex;
		flex-direction: row;
	}
	
	.order-info {
		margin: 4rpx 0;
		font-size: 28rpx;
	}

	.order-img {
		width: 220rpx;
		height: 220rpx;
		border-radius: 20rpx;
		margin-right: 20rpx;
	}
	
	.order-info-name {
		font-size: 30rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
	}
	
	.zhankai{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10rpx 0;
	}
	
	.arrowDown{
		width: 18rpx;
		height: 20.16rpx;
		margin-left: 10rpx;
	}
	
	.fold{
		font-size: 24rpx;
		color: #382321;
	}
	
</style>
