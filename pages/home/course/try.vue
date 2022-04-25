<template>
	<view class="vedio_player">
		<txv-video vid="e0354z3cqjp" playerid="txv1" class="video"></txv-video>
		<cover-view class="watermark">
			<cover-image src="../../../static/images/watermark.png"></cover-image>
		</cover-view>
	</view>
	
</template>

<script>
	export default{
		
	}
</script>

<style>
	.video{
		z-index: 100;
	}
	
	.vedio_player{
		z-index: -100;
	}

	
	.watermark{
		height: 55rpx;
		width: 85rpx;
		position: fixed;
		top: 30rpx;
		right: 12%;
		z-index: 999;
	}
</style>
