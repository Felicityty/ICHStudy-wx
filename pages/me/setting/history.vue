<template>
	<view class="container">
		<view class="head">
			<view class="head_text">{{title[0]}}</view>
			<view class="head_tet">{{title[1]}}</view>
			<view class="head_txt">{{title[2]}}</view>
		</view>
		
		<view class="no-course" v-show="history.length===0">
			{{ isLanguage ? cninfo : eninfo }}
		</view>
		
		<view class="history" v-for="(item,index) in history" :key="item">
			<view class="history_content">
				<view class="history_name">
					<view>{{isLanguage? item.csen:item.cscn }}</view>
				</view>
				<view class="history_section">
					<view>{{isLanguage? item.scen:item.sccn}}</view>
				</view>
				<view class="history_time">
					<view>{{item.ctime}}分</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
		
		<view class="safe-area"></view>
	</view>
</template>

<script>
	import { getPlayData } from '../../../api/user/index.js'
	
	export default {
		data() {
			return {
				history: [],
				userInfo: {
					username: '',
					nickName: '',
				},
				cninfo: '',
				eninfo: '',
				language: 1,
				isLanguage: true
			}
		},
		onShow(){
			// const userInfo = wx.getStorageSync('userInfo')
			const language = wx.getStorageSync('language')
			this.language = language
			this.getLanguage()
		},
		onLoad() {
			const token = wx.getStorageSync('token')
			const that = this
			const userInfo = wx.getStorageSync('userInfo')
			if(!token) {
				uni.reLaunch({
					url: '../../index/index'
				})
			} else {
				that.userInfo = userInfo
				// console.log(this.userInfo.username)
				this.getCourse()
			}
		},
		methods: {
			getLanguage() {
				if(wx.getStorageSync('language') === 1) this.isLanguage = true
				else this.isLanguage = false
			},
			getCourse() {
			  getPlayData(this.userInfo.username)
			    .then(res => {
			      const data = JSON.parse(res.data).endata.data
			      console.log(data)
						if(data.length === 0) {
							this.cninfo = '暂无观看历史'
							this.eninfo = 'no history'
							return
						}
			      data.forEach(item => {
			        this.history.push({
			          cscn: item.cscn,
			          csen: item.csen,
			          ctime: item.ctime,
								sccn: item.sccn,
			          scen: item.scen,
			      	})
			      })
			    })
			    .catch(err => console.log(err))
			}
		},
		computed:{
			title() {
			  if (this.language) {
					return ['Course', 'Sections', 'Learning Time']
			  } else {
			    return ['课程', '小节', '学习时长']
			  }
			}
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
		padding-left: 80rpx;
	}
	
	.head_txt{
		width: 200rpx;
		height: 88rpx;
		color: #382321;
		font-size: 32rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.no-course {
		margin-top: 30rpx;
		color: #382321;
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
		text-align: center;
	}
	
	.history_name{
		width: 230rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	.history_section{
		width: 320rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	.history_time{
		width: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	.line{
		width: 654rpx;
		height: 2rpx;
		background-color: #E5E5E5
	}
</style>
