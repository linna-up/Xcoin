<template>
	<view class="notice">
		<view class="left">
			<image src="../../../static/img/home/horn.png" ></image>
		</view>
		<view class="center">{{notice}}</view>
		<view class="right">
			>
		</view>
	</view>
</template>

<script>
	export default {
		name: "notice",
		props: {
			notice: {
				type: String,
				default:"系统公告"
			}
		}
	}
</script>

<style scoped>
	.notice {
		width: 90%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left,
	.right {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left>image {
		width: 16px;
		height: 16px;
	}

	.right {
		color: #818181;
		font-size: 14px;
	}

	.center {
		flex: 1;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
</style>
