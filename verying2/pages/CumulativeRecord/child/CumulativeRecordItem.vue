<template>
	<view class="box">
		<view class="item">{{$t('message').mine.CumulativeRecord.Time}}</view>
		<view class="item">{{$t('message').mine.CumulativeRecord.Level}}</view>
	</view>
</template>

<script>
	export default {
		name:"InvestmentRecordItem"
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
		justify-content: center;
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
		font-size: 16px;
	}
</style>
