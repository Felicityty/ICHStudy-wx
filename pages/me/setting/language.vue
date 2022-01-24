<template>
	<view class="container">
		<view class="language" v-for="(item,index) in lanItem" :key="item" @click="lanselect(index)">
			{{item}}
			<image :src="lan(index)" mode="aspectFill" class="check"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lanItem: ['简体中文','English'],
				checked: 0
			}
		},
		onLoad() {
	
		},
		methods: {
			lanselect(index){
				this.checked = index
			},
			lan(index){
				if(this.checked == index){　　　　　　　　　　　
				    return '../../../static/images/iCons/check.png'
				  }else{
				    return ''
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
	
	.check{
		width: 40rpx;
		height: 40rpx;
	}
	
	.language{
		width: 654rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
		border-bottom: 2rpx solid #E5E5E5;
		font-size: 32rpx;
		color: #382321;
	}
</style>
