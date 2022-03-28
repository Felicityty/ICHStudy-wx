<template>
	<view class="course_content" @click="go(info.id)">
		<image :src="info.img" mode="aspectFill" class="course_content_img"></image>
		<text class="course_content_name">{{ language? info.enname : info.cnname }}</text>
		<text class="course_content_intro">{{ language? info.enintro : info.cnintro }}</text>
	</view>
</template>

<script>
	export default {
		name: 'CourseItem',
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
	.course_content{
		width: 312rpx;
		height: 408rpx;
		margin-bottom: 36rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
	}
	
	.course_content_img{
		width: 312rpx;
		height: 312rpx;
		border-radius: 20rpx;
	}
	
	.course_content_name{
		color: #382321; 
		font-size: 28rpx; 
		margin-top: 20rpx;
		white-space: nowrap; /*文本不换行*/
		text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）*/
	}
	
	.course_content_intro{
		width: 264rpx;
		overflow:hidden;
		white-space: nowrap; /*文本不换行*/
		text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）*/
		color: #73615D; 
		font-size: 22rpx; 
		margin-top: 12rpx;
	}
</style>
