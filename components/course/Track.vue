<template>
	<view class="zimu main">
	    <view class="main">{{ en }}</view>
	    <view class="main">{{ zh }}</view>
	</view>
</template>

<script>
	export default {
		name: 'Track',
		props: {
			info:{
				type: Object,
		    default: {}
			}
		},
		data () {
		  return {
				zimuList: [],
				currentZimuIndex: -1,
				fileSystemManager: wx.getFileSystemManager(),
				en: '',
				zh: ''
		  }
		},
		methods:{
			videoChangeEvent(time) {
				// console.log(time)
				this.setZimu(time, this.currentZimuIndex)
			},
			setZimu(time, index) {
				if (index >= this.zimuList.length) {
					return
				}
				// 如果需要移动字幕指针（即当前指向-1 或 当前视频进度大于当前字幕结尾的时间）
				if (index == -1 || this.zimuList[index][2] < time) {
					this.hideZimu()
					this.setZimu(time, index + 1)
					return
				}
				else if (index != 0 && index != -1 && this.zimuList[index][1] > time && this.zimuList[index - 1][2] > time) {
					this.hideZimu()
					this.setZimu(time, (index - 1 < -1) ? -1 : (index - 1))
					return
				}
				// 如果未来指针大于当前指针并且当前视频进度 > 未来指针字幕的开始时间(-200ms)
				if (index != this.currentZimuIndex && time > this.zimuList[index][1] - 250) {
					this.currentZimuIndex = index
					this.showZimu(this.currentZimuIndex)
				}
			},
			/**
			 * 字幕相关
			 */
			loadZimu(path, fileName) {
				this.zimuList = []
				this.downloadZimu(path, fileName)
			},
			readZimu(fileName) {
				let fileStr = this.fileSystemManager.readFileSync(wx.env.USER_DATA_PATH + '/' + fileName, 'utf-8')
				// 换行符转换
				fileStr = fileStr.replace(new RegExp("\r\n", "gm"), '\n')
				let list = fileStr.split('WEBVTT\n\n')[1].split('\n\n')

				for (let i = 0; i < list.length; i++) {
					if (list[i]) {
						// 去除首位换行符
						list[i] = list[i].replace(/^(\s|\n)+|(\s|\n)+$/g, '')
						let a = list[i].split('\n')
						let timeFrom = a[1].split(' --> ')[0]
						let timeTo = a[1].split(' --> ')[1]
						this.zimuList.push([a[0], this.getCurrentTime(timeFrom), this.getCurrentTime(timeTo), a[2], a[3]])
					}
				}
			},
			downloadZimu(path, fileName) {
				var that = this
				wx.downloadFile({
					"url": path,
					"filePath": wx.env.USER_DATA_PATH + '/' + fileName,
					success: function (e) {
						that.readZimu(fileName)
					}
				})
			},
			// 改变字幕
			changeZimu(zh, en) {
				this.zh = zh
				this.en = en
				// this.setData({
				// 		zh,
				// 		en
				// })
			},
			// 隐藏字幕
			hideZimu() {
				this.changeZimu('', '')
			},
			// 展示字幕
			showZimu(index) {
				this.changeZimu(this.zimuList[index][3], this.zimuList[index][4])
			},
			// 获取当前时间戳
			getCurrentTime(time) {
				let timeSplit = time.split(".")
				let a = new Date('1970/01/01 ' + timeSplit[0]).getTime() + parseInt(timeSplit[1]) + 28800000 // 兼容iphone下的处理方法
				return a
			}
		}
	}
</script>

<style>
	.zimu{
		bottom:12px;
		font-size: 22rpx;
		position:absolute;
		color:#fff;
		width:80%;
		padding:0 10%;
		pointer-events:none;
		text-align: center;
	}

	.zimu .main{
		pointer-events:none;
		white-space: pre-wrap;
	}

	.main {
		display:block;
		line-height:1.2;
		overflow:hidden;
		font-family:-apple-system;
	}
</style>
