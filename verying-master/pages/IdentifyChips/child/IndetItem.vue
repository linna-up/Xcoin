<template>
	<view class="item">
		<view class="bg" :style="{'backgroundImage':'url('+list.img+')'}">{{list.cycle}}</view>
		<view class="cen">{{list.limit}}%</view>
		<view class="slider">
			<view class="slider_item" :style="{width:list.limit+'%'}"></view>
		</view>
		<view class="box">
			<view class="box_left">
				<view>发行价格: {{list.price}}USDT</view>
				<view>发行数量: {{list.total}}</view>
				<view>剩余数量: {{list.last}}</view>
			</view>
			<view class="box_right">
				<view class="box_right_btm" >立即申购</view>
				<view class="box_right_text">项目开始事件: {{list.start_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"IndetItem",
		props: {
			list:{}
		}
	}
</script>

<style scoped>
	.item {
		width: 95%;
		height: 30%;
		margin: 0 auto;
		background-color: #F4F8FB;
		padding-top: 8px;
	}
	.bg {
		width: 95%;
		height: 45%;
		margin: 0 auto;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url("../../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
		border-radius: 5px;
	}
	.cen {
		margin-top: 8px;
		width: 95%;
		height: 16px;
		margin: 0 auto;
		color: #00AEAC;
		font-size: 14px;
		text-align: center;
	}
	.slider {
		width: 95%;
		height: 8px;
		margin: 0 auto;
		background-color: #E6E6E6;
		margin-top: 8px;
		border-radius: 16px;
	}
	.slider_item {
		background-color:#00AEAC ;
		height: 8px;
		border-radius: 16px;
	}
	.box {
		width: 95%;
		height: 35%;
		margin: 0 auto;
		margin-top: 8px;
		border-radius: 16px;
		display: flex;
	}
	.box_left {
		width: 45%;
	}
	.box_right {
		width: 55%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.box_right_btm {
		width: 80%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: linear-gradient(to right,#0160A0,#00A9AC);
		font-size: 16px;
		color: #FFFFFF;
		margin: 0 auto;
		border-radius: 8px;
	}
	.box_right_text {
		font-size: 14px;
		height: 20px;
		line-height: 20px;
		text-align: center;
	}
	.box_left>view {
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
	}
</style>
