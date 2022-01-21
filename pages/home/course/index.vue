<template>
	<view class="container">
		<view class="course_search_bg">
			<view class="course_search_content">
				<image src="../../../static/images/iCons/search.png" mode="aspectFit" class="course_search_icon"></image>
				<input type="text" placeholder="搜索课程名称" class="course_search_input" placeholder-class="phcolor"/>
			</view>
		</view>
		
		<view class="content">
			<view class="course_content" v-for="(item,index) in courseItem" :key="index">
				<image :src="item.img" mode="aspectFill" class="course_content_img"></image>
				<text class="course_content_name">{{ item.name }}</text>
				<text class="course_content_intro">{{item.intro}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				courseItem: [
					{
						name: '扯白糖',
						img: '../../../static/images/coursePic/course1.png',
						intro: '浙江绍兴传统的地方小吃'
					},
					{
						name: '富阳剪纸',
						img: '../../../static/images/coursePic/course2.png',
						intro: '古老的传统民间艺术'
					},
					{
						name: '圆木制作',
						img: '../../../static/images/coursePic/course3.png',
						intro: '专做家用木桶的手工技艺'
					},
					{
						name: '十里红妆',
						img: '../../../static/images/coursePic/course4.png',
						intro: '江南传统婚俗文化'
					},
					{
						name: '皮影之光',
						img: '../../../static/images/coursePic/course5.png',
						intro: '我国出现最早的戏曲剧种之一'
					},
					{
						name: '皤滩文化古镇',
						img: '../../../static/images/coursePic/course6.png',
						intro: '古代江南山区农村古镇文化'
					},
					{
						name: '建德茶叶',
						img: '../../../static/images/coursePic/course7.png',
						intro: '兰花型细嫩半烘炒绿茶'
					},
					{
						name: '龙门古镇',
						img: '../../../static/images/coursePic/course8.png',
						intro: '以独特的明清古建筑群而闻名'
					}
				]
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
	}
	
	.phcolor{
		color: #73615D;
		font-size: 28rpx;
	}
	
	.course_search_bg{
		width: 750rpx;
		height: 88rpx;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		z-index: 999;
		background-color: #f9f3eb;
	}
	
	.course_search_content {
		width: 654rpx;
		height: 64rpx;
		position: fixed;
		top: 12rpx;
		left: 48rpx;
		background-color: #ffffff;
		border-radius: 40rpx;
	}
	
	.course_search_icon{
		width: 42.3rpx;
		height: 50rpx;
		position: absolute;
		left: 12.22rpx;
		top: 7rpx;
	}
	
	.course_search_input{
		width: 90%;
		height: 100%;
		line-height: 50%;
		position: absolute;
		left: 65.78rpx;
		font-size: 28rpx;
		color: "#73615D";
	}
	
	.content{
		width: 654rpx;
		position: relative;
		top: 112rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.course_content{
		width: 312rpx;
		height: 408rpx;
		margin-bottom: 30rpx;
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
	}
	
	.course_content_intro{
		color: #73615D; 
		font-size: 22rpx; 
		margin-top: 12rpx;
	}
</style>
