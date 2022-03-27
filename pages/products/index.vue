<template>
		<view class="content">
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
			<tabbar :state="3"></tabbar>
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
				title: '文创产品'
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
