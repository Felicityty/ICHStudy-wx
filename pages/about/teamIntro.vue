<template>
		<view class="content">
			
			<view class="list-view" v-for="(item, index) in teammates" :key="index">
				<image class="teammate-pic" :src="item.pic"></image>
				<view class="teammate-name">{{item.name}}</view>
				<div class="teammate-intro" v-html="item.intro"></div>
				<!-- emmm 其实好像只要在view标签里加一个text标签就可以用\n换行了 -->
				<view class="divide"></view>
			</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '团队介绍',
				teammates: [
					{
						pic: "../../static/images/teamPic/Nicole.png",
						name: "Nicole Andrea",
						intro: '来自信息学院数字媒体技术的学生，来自印度尼西亚<br /><br />经验：2020-现在-副部长;2019-现在-班长-ZUST DMT 181;2018-2019 志愿者-APL，富阳幼儿园，印度尼西亚日<br /><br />教育：2018-2022中国本科生 2015-2018 高中-圣母高中<br /><br />软技能：口头和书面沟通、批判性思维、公开演讲、努力工作、守时'
					},
					{
						pic: "../../static/images/teamPic/Ji.png",
						name: "季长存",
						intro: '来自信息学院数字媒体技术系<br /><br />比赛经验： -2019蓝桥杯设计大赛"医学结合"荣获省二等奖 -2019中国计算机设计大赛作品"中医——中华精华"全国竞赛三等奖 -互联网+竞赛作品"国际学生一站式生活服务平台"荣获学校一等奖'
					},
					{
						pic: "../../static/images/teamPic/Nang.png",
						name: "李刘洋",
						intro: '来自信息学院数字媒体技术专业的学生，来自泰国清迈<br /><br />工作经验：地震地震组织（2016年）;2016年，Funrak的青年大会-BEAM和跳跃基金会;艺术工作室培训 - BEAM 学校 APIS 学生;清迈帕亚普大学业务发展培训（2016年）<br /><br />语言：缅甸语、山语、英语、泰语和汉语<br /><br />运动：旅游、跳舞、教学、听音乐、烹饪和打羽毛球'
					},
					{
						pic: "../../static/images/teamPic/Rahayu.png",
						name: "Rahayu Sekarani Putri",
						intro: '来自信息学院的数字媒体技术专业的学生，来自印度尼西亚<br /><br />竞赛经验： 2012年，3D墙杂志获得省级竞赛第一名（印度尼西亚）2013年，3D墙杂志获得省级竞赛第一名（印度尼西亚）。 2015年，3D墙杂志获得省竞赛第一名。，撰写并发表了一篇可持续发展论文（印度尼西亚）<br /><br />经验：2019年 社会学系（中国）国际学生协会会员'
					},
					{
						pic: "../../static/images/teamPic/Wang.png",
						name: "王柳迪",
						intro: '信息研究院计算机科学与技术研究生，负责网站的开发'
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

<style scoped>
	.content{
		width: 750rpx;
		height: 100%;
		position: relative;
	}
	
	.logo-group{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.teammate-pic{
		height: 200rpx;
		width: 200rpx;
		border-radius: 20rpx;
		margin: 48rpx 0 20rpx 0;
	}
	
	.teammate-name{
		font-weight: 600;
		font-size: 32rpx;
		line-height: 46rpx;
		color: #382321;
	}
	
	.teammate-intro{
		font-size: 24rpx;
		line-height: 30rpx;
		color: #382321;
		margin: 28rpx 48rpx 30rpx 48rpx;
	}
	
	.divide{
		width: 654rpx;
		height: 2rpx;
		background-color: #E5E5E5;
		margin-left: 48rpx;
	}
	
	
</style>
