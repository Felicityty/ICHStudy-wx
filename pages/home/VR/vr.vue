<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options) {
			this.url = options.url
			console.log(this.url)
		},
		methods: {
		}
	}
</script>

<style scoped>
</style>
