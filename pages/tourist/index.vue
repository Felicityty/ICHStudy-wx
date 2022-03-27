<template>
		<view class="content">
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
			<tabbar :state="2"></tabbar>
		</view>
</template>

<script>
	import {tabbar} from '../../components/tabbar/tabbar.vue'
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				title: '研学旅行'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	
</style>
