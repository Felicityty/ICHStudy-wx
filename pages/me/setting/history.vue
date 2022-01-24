<template>
	<view class="container">
		<view class="head">
			<view class="head_text">课程</view>
			<view class="head_tet">小节</view>
			<view class="head_txt">学习时长</view>
		</view>
		
		<view class="history" v-for="(item,index) in history" :key="item">
			<view class="history_content">
				<view class="history_name">
					<view>{{item.name}}</view>
				</view>
				<view class="history_section">
					<view>{{item.section}}</view>
				</view>
				<view class="history_time">
					<view>{{item.time}}分</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				history:[
					{
						name: '扯白糖',
						section: '扯白糖纪录片',
						time: 14
					},
					{
						name: 'Fuyang PaperCutting',
						section: 'Lesson One - Fuchun Paper Cutting',
						time: 14
					}
				]
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	.container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.head{
		width: 750rpx;
		height: 88rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 2rpx solid #7A5A32;
	}
	
	.head_text{
		width: 180rpx;
		height: 88rpx;
		color: #382321;
		font-size: 32rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 80rpx;
	}
	
	.head_tet{
		width: 200rpx;
		height: 88rpx;
		color: #382321;
		font-size: 32rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 90rpx;
	}
	
	.head_txt{
		width: 200rpx;
		height: 88rpx;
		color: #382321;
		font-size: 32rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.history{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #382321;
		text-align: center;
		font-size: 28rpx;
	}
	
	.history_content{
		width: 750rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 28rpx;
		padding-bottom: 30rpx;
	}
	
	.history_name{
		width: 230rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.history_section{
		width: 320rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.history_time{
		width: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.line{
		width: 654rpx;
		height: 2rpx;
		background-color: #E5E5E5
	}
</style>
