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
		height: auto;
		margin-bottom: 36rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
	}
	
	.course_content_img{
		width: 312rpx;
		height: 312rpx;
		border-radius: 20rpx;
	}
	
	.course_content_name{
		width: 264rpx;
		height: auto;
		color: #382321; 
		font-size: 28rpx; 
		margin-top: 20rpx;
		white-space: normal;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;				//溢出内容隐藏
		text-overflow: ellipsis;		//文本溢出部分用省略号表示
		display: -webkit-box;			//特别显示模式
		-webkit-line-clamp: 2;			//行数
		line-clamp: 2;					
		-webkit-box-orient: vertical;	//盒子中内容竖直排列
	}
	
	.course_content_intro{
		width: 264rpx;
		height: auto;
		overflow:hidden;
		white-space: nowrap; /*文本不换行*/
		text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）*/
		color: #73615D; 
		font-size: 22rpx; 
		margin-top: 16rpx;
		margin-bottom: 8rpx;
	}
</style>
