<template>
	<view class="box">
		<image src="../../../static/img/logo/XEV.png"></image>
		<view class="type">XEV</view>
		<image src="../../../static/img/transaction/dwon.png"></image>
		<view class="op">
			<image src="../../../static/img/logo/XEV.png"></image>
			<view class="type">XEV</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"OptionItem",
		props: {
			list:null
		}
	}
</script>

<style scoped>
	.box {
		width: 80%;
		height: 55px;
		line-height: 55px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
	}
	.box>image {
		width: 20px;
		height: 20px;
	}
	.type {
		width: 60px;
		height: 55px;
		line-height: 55px;
		text-align: center;
		font-size: 16px;
	}
	.op {
		position: absolute;
		width: 90%;
		height: 55px;
		line-height: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 24px;
	}
</style>
