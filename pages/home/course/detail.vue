<template>
	<view class="container">
		<view class="video_play">
			<video src="" controls style="width: 100%; height: 100%;"></video>
		</view>
		
		<view class="course_details">
			<view class="course_details_name">{{name}}</view>
			<view class="course_details_detail">{{details}}</view>
		</view>
		
		<view class="video_list">
			<view class="video_list_click" @click="showAll = !showAll">
				<text class="video_list_headtext">视频列表</text>
				<image :src="unfold()" mode="aspectFit" class="video_list_img"></image>
			</view>
			<view v-for="(item, index) in showList" :key="item" class="video_list_content" @click="select(index)">
			{{item.name}}
			<image :src="video(index)" mode="aspectFit" class="video_list_content_img"></image>
			</view>
		</view>
		
		<view class="commend">推荐</view>
		<view class="course_commend">
			<view class="course_commend_content" v-for="(item,index) in courseItem" :key="item" @click="go()">
				<image :src="item.img" mode="aspectFill" class="course_commend_img"></image>
				<text class="course_commend_text">{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				name: '皮影之光',
				details: '皮影戏，旧称“影子戏”或“灯影戏”，是一种用蜡烛或燃烧的酒精等光源照射兽皮或纸板做成的人物剪影以表演故事的民间戏剧。',
			  toLearnList:[
					{
						name: '皮影操纵学习'
					},
					{
						name: '皮影欣赏'
					},
					{
						name: 'aaa'
					}
				],   //进行显示的数据
			  showAll: false,
				play: 0,
				bofang: '../../../static/images/iCons/zhengzaibofang.png',
				courseItem: [
					{
						name: '富阳剪纸',
						img: '../../../static/images/coursePic/course11.png'
					},
					{
						name: '十里红妆',
						img: '../../../static/images/coursePic/course4.png'
					},
					{
						name: '圆木制作',
						img: '../../../static/images/coursePic/course10.png'
					},
					{
						name: '扯白糖',
						img: '../../../static/images/coursePic/course9.png'
					}
				]
			}
		},
		methods:{
			go(){
				console.log(1)
				uni.navigateTo({
					url: "../course/detail"
				})
			},
			unfold(){
				if(this.showAll == false){　　　　　　　　　　　//对箭头进行处理
				    return '../../../static/images/iCons/arrowDownBrown.png'
				  }else{
				    return '../../../static/images/iCons/arrowUpBrown.png'
				} 
			},
			select(index){
				this.play = index
			},
			video(index){
				if(this.play === index){　　　　　　　　　　　
				    return '../../../static/images/iCons/zhengzaibofang.png'
				  }else{
				    return ''
				}
			}
		},
		computed:{
		   showList:function(){
		     if(this.showAll == false){                    //当数据不需要完全显示的时候
		      let showList = [];　　　　　　　　　　　　　　//定义一个空数组
		      if(this.toLearnList.length > 0){　　　　　　//先不显示
		        for(var i=0;i<0;i++){
		          showList.push(this.toLearnList[i])
		        }
		      }else{
		        showList = this.toLearnList
		      }
		      return showList;　　　　　　　　　　　　　　　　 //返回当前数组
		    }else{
		      return this.toLearnList;
		    }
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
	
	.video_play{
		width: 750rpx;
		height: 422rpx;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
	}
	
	.course_details{
		width: 654rpx;
		height: 160rpx;
		position: relative;
		top: 462rpx;
	}
	
	.course_details_name{
		color: #382321; 
		font-size: 32rpx;
	}
	
	.course_details_detail{
		color: #73615D; 
		font-size: 24rpx; 
		margin-top: 20rpx;
	}
	
	.video_list{
		width: 654rpx;
		position: relative;
		top: 510rpx;
	}
	
	.video_list_headtext{
		color: #382321; 
		font-size: 32rpx;
	}
	
	.video_list_click{
		width: 654rpx;
		height: 64rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.video_list_img{
		width: 20rpx; 
		height: 34rpx; 
	}
	
	.video_list_content{
		width: 654rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #382321;
		margin-top: 20rpx;
	}
	
	.video_list_content_img{
		 width: 24rpx;
		 height: 24rpx;
	}
	
	.commend{
		width: 654rpx;
		height: 46rpx;
		position: relative;
		top: 582rpx;
	}
	
	.course_commend{
		width: 654rpx;
		position: relative;
		top: 602rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
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
