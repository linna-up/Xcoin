<template>
	<view id="navbar" :style="{paddingTop:top+'px'}">
		<view class="left">
			<image src="../../../static/img/notice/back.png" @click="back"></image>
		</view>
		<view class="center">
			<span>问题反馈</span>
		</view>
		<view class="right">
			<!-- <image src="@/static/img/public/mx.png"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"ProNav",
		/* props:{
			bg:{
				type:String,
				defaul() {
					return "blue"
				}
			}
		}, */
		data() {
			return {
				top:getApp().globalData.top
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			}
		},
		onLoad() {
		},
		onShow() {
			
		}
	}
</script>

<style>
	#navbar {
		width: 100%;
		height:44px ;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left,
	.right {
		width: 60px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left>image {
		width: 14px;
		height: 14px;
	}
	.right>image {
		width: 18px;
		height: 18px;
	}
	.center {
		flex: 1;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.center>span {
		font-size: 16px;
	}
</style>
