<template>
	<view class="forgetPS" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="title" :style="{paddingTop:top+'px'}">
			<view class="title_left"  :style="{top:top}" @click="back">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			{{i18n.Retrieve}}
		</view>
		<view class="register_item">
			<view class="register_item_left">{{i18n.Phone}}</view>
			<input type="number" />
		</view>
		<view class="ps_s">
			<view class="ps_s_left">{{i18n.Code}}</view>
			<input type="text" />
			<view class="ps_s_right">
				<span>1254</span>
			</view>
		</view>
		<view class="ps_s">
			<view class="ps_s_left">{{i18n.PhoneCode}}</view>
			<input type="number" />
			<view class="ps_s_right">
				<span class="send">{{i18n.Send}}</span>
			</view>
		</view>
		<view class="ps_s">
			<view class="ps_s_left">{{i18n.Set}}</view>
			<input type="password" />
			<view class="ps_s_right">
				<image src="../../static/img/reg/show.png"></image>
			</view>
		</view>
		<view class="ps_s">
			<view class="ps_s_left">{{i18n.Confirm}}</view>
			<input type="password" />
			<view class="ps_s_right">
				<image src="../../static/img/reg/show.png"></image>
			</view>
		</view>
		<view class="btm">{{i18n.Retrieve}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowWidth:getApp().globalData.windowWidth,
				windowHeight:getApp().globalData.windowHeight,
				top:getApp().globalData.top
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			}
		},
		computed:{
			i18n(){
				return this.$t('message').mine.forgetPS
			}
		}
	}
</script>

<style scoped>
	.forgetPS {
		
	}
	.title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.title_left {
		position: absolute;
		width: 60px;
		height: 50px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.title_left>image {
		width: 18px;
		height: 18px;
	}
	.register_item {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		border: 0.2px solid #F7F8FA;
		margin-top: 8px;
		background-color: #F9FDFF;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.register_item_left {
		width: 30%;
	}
	.ps_s {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		border: 0.2px solid #F7F8FA;
		margin-top: 8px;
		background-color: #F9FDFF;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ps_s_left {
		width: 30%;
		text-align: center;
	}
	.ps_s>input {
		width: 50%;
	}
	.ps_s_right {
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ps_s_right>image {
		width: 16px;
		height: 16px;
	}
	.ps_s_right>span {
		height: 30px;
		width: 60px;
		line-height: 30px;
		text-align: center;
		background-color: rgba(192,192,192,0.1);
	}
	.register_item_right {
		width: 70%;
	}
	.send {
		color: #1063B7;
		background-color: rgba(255,255,255,0.1)!important;
	}
	.btm {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		background-color: #0066A1;
		border-radius: 6px;
		margin-top: 50px;
		text-align: center;
		line-height: 50px;
		color: #FFFFFF;
		font-size: 16px;
	}
	.btm {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		background-color: #0066A1;
		border-radius: 6px;
		margin-top: 50px;
		text-align: center;
		line-height: 50px;
		color: #FFFFFF;
		font-size: 16px;
	}
</style>
