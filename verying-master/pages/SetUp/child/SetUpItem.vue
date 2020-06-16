<template>
	<view class="myItem" @click="toJump(list.jump)">
		<view class="myItem_left">
			<image :src="list.img"></image>
		</view>
		<view class="myItem_center">
			{{list.text}}
		</view>
		<view class="myItem_right" >
			<view><span class="rightText">{{list.rightText}}</span></view>
			<image src="../../../static/img/mine/right.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "SetUpItem",
		props: {
			list: null
		},
		methods: {
			toJump(url) {
				console.log(url);
				if (url === "break") {
					uni.removeStorageSync('session_id');
					uni.removeStorageSync('uid');
					//// #ifdef APP-PLUS  
					//plus.runtime.quit();
					//// #endif 
					plus.runtime.restart();
				}
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>
	.myItem {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #E6E6E6;
	}

	.myItem_left {
		width: 15%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.myItem_left>image {
		width: 25px;
		height: 25px;
	}

	.myItem_center {
		width: 50%;
		height: 50px;
		line-height: 50px;
		font-size: 18px;
	}

	.myItem_right {
		width: 35%;
		height: 50px;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		position: relative;
	}

	.myItem_right>view {
		width: 100%;
		text-align: center;
		font-size: 18px;
	}

	.myItem_right>image {
		position: absolute;
		top: 17px;
		right: 16px;
		width: 16px;
		height: 16px;
	}

	.rightText {
		font-size: 14px;
		text-align: center;
	}
</style>
