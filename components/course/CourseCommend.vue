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
				courseClick: 0,
				isToken: false
		  }
		},
		created() {
			const token = wx.getStorageSync('token')
			if (token) {
				this.isToken = true
			}
		},
		methods:{
			go(id){
				const that = this
				that.courseClick = wx.getStorageSync('courseClick')
				that.courseClick++;
				// console.log(that.courseClick)
				uni.setStorage({
					key: 'courseClick',
					data: that.courseClick
				})
				if (that.courseClick > 3 && !that.isToken) {
					uni.showModal({
						title: that.isLanguage ? 'Tips' : '提示',
						content: that.isLanguage ? 'Reach the upper limit' : '微课观看次数已达上限',
						showCancel: true,
						cancelText: that.isLanguage ? 'Login' : '去登录',
						confirmText: that.isLanguage ? 'Other' : '观看其他',
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
						url: './detail?id=' + id
					})
				}
			}
		}
	}
</script>

<style>
	.course_commend_content{
		width: 312rpx;
		height: auto;
		margin-bottom: 30rpx;
		margin-right: 30rpx;
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
		height: auto;
		color: #382321; 
		font-size: 28rpx; 
		margin-top: 20rpx;
		width: 264rpx;
		white-space: normal;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;				//溢出内容隐藏
		text-overflow: ellipsis;		//文本溢出部分用省略号表示
		display: -webkit-box;			//特别显示模式
		-webkit-line-clamp: 2;			//行数
		line-clamp: 2;					
		-webkit-box-orient: vertical;	//盒子中内容竖直排列
	}
</style>
