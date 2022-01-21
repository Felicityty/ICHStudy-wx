<template>
	<view class="container">
		<view class="photo">
			<text style="font-size: 32rpx;color: #382321;">头像：</text>
			<image src="../../../static/images/iCons/touxiang.png" mode="aspectFill" class="photo_img"></image>
			<image src="../../../static/images/iCons/arrowRightLightbrown.png" mode="aspectFill" class="arrow"></image>
		</view>
		
		<view class="account">
			<text style="font-size: 32rpx;color: #382321;">账号：</text>
			<view class="account_right">
				<view class="account_content">{{account}}</view>
				<image src="../../../static/images/iCons/arrowRightLightbrown.png" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="nickname">
			<text style="font-size: 32rpx;color: #382321;">昵称：</text>
			<view class="nickname_right">
				<view class="nickname_content">{{nickname}}</view>
				<image src="../../../static/images/iCons/arrowRightLightbrown.png" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="signature">
			<text style="font-size: 32rpx;color: #382321;">个性签名：</text>
			<view class="signature_right">
				<view class="signature_content">{{signature}}</view>
				<image src="../../../static/images/iCons/arrowRightLightbrown.png" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="email">
			<text style="font-size: 32rpx;color: #382321;">邮箱：</text>
			<view class="email_right">
				<view class="email_content">{{email}}</view>
				<image src="../../../static/images/iCons/arrowRightLightbrown.png" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
		
		<view class="password">
			<text style="font-size: 32rpx;color: #382321;">密码：</text>
			<view class="password_right">
				<view class="password_content">{{password}}</view>
				<image src="../../../static/images/iCons/arrowRightLightbrown.png" mode="aspectFill" class="arrow"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: 'ASDFGHJK123',
				nickname: '',
				signature: '',
				email: '123456789@123.com',
				password: 'asd123456'
			}
		},
		onLoad() {
	
		},
		methods: {
	
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
	
	.arrow{
		width: 14rpx;
		height: 28rpx;
	}
	
	.photo{
		width: 654rpx;
		height: 132rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 12rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.photo_img{
		width: 104rpx;
		height: 104rpx;
		margin-left: 404rpx;
	}
	
	.account,.nickname,.signature,.email,.password{
		width: 654rpx;
		height: 106rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #E5E5E5;
	}
	
	.account_right,.nickname_right,.signature_right,.email_right,.password_right{
		width: 558rpx;
		height: 106rpx;
		display: flex;
		flex-direction: row;
		justify-content:flex-end;
		align-items: center;
	}
	
	.signature_right{
		width: 494rpx;
	}
	
	.account_content,.nickname_content,.signature_content,.email_content,.password_content{
		font-size: 28rpx;
		color: #382321;
		position: relative;
		right: 30rpx;
	}
</style>
