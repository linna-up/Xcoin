<template>
	<view class="box">
		<view class="item">{{list.edit_time}}</view>
		<view class="item">{{list.fh_money}}X币</view>
	</view>
</template>

<script>
	export default {
		name:"InvestmentRecordItems",
		props: {
			list:{}
		}
	}
</script>

<style scoped>
	.box {
		width: 100%;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
		color: #9998A0;
		display: flex;
		align-items: center;
	}
	.items {
		flex: 40%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 16px;
	}
	.item {
		flex: 1;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 14px;
		text-align: center;
	}
</style>
