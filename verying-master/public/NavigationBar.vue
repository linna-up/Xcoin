<template>
	<view id="navbar" :style="{backgroundColor:bg,paddingTop:top+'px'}">
		<view class="left">
			<!-- <image src="../static/img/logo/XEV.png" ></image> -->
		</view>
		<view class="center">
			<span>首页</span>
		</view>
		<view class="right">
			<!-- <image src="../static/img/home/notice.png" ></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"NavigationBar",
		props:{
			bg:{
				type:String,
				defaul() {
					return "blue"
				}
			}
		},
		data() {
			return {
				top:getApp().globalData.top
			}
		},
		methods: {
			toJump() {
				uni.navigateTo({
					url:'../../pages/NodeRules/NodeRules'
				})
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
		width: 100vw;
		height:44px ;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left,.right {
		width: 60px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left>image {
		width: 18px;
		height: 18px;
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
