<template>
	<view class="course_commend_content" @click="go(info.id)">
		<image :src="info.img" mode="aspectFill" class="course_commend_img"></image>
		<text class="course_commend_text">{{ language? info.enname : info.cnname }}</text> 
	</view>
</template>

<script>
	export default {
		name: 'CourseCommend',
		props: {
			info:{
				type: Object,
		    default: {}
			},
			language:{
				type: Number,
		    default: 1
			}
		},
		data () {
		  return {
		  }
		},
		methods:{
			go(id){
				uni.navigateTo({ 
					url: './detail?id=' + id
				})
			}
		}
	}
</script>

<style>
	.course_commend_content{
		width: 312rpx;
		height: 268rpx;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
	}
	
	.course_commend_img{
		width: 312rpx;
		height: 208rpx;
		border-radius: 20rpx;
	}
	
	.course_commend_text{
		color: #382321; 
		font-size: 28rpx; 
		margin-top: 20rpx;
	}
</style>
