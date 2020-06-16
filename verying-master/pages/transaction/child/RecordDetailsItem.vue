<template>
	<view class="RecordDetailsItem">
		<view>买入</view>
		<view class="time">15:5:36 05/17</view>
		<view>2145</view>
		<view>300</view>
		<view>已完成</view>
	</view>
</template>

<script>
	export default {
		name:"RecordDetailsItem"
	}
</script>

<style scoped>
	.RecordDetailsItem {
		width: 100%;
		height: 45px;
		/* line-height: 45px; */
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #E7E7E7;
	}
	
	.RecordDetailsItem>view {
		flex: 1;
		font-size: 14px;
		text-align: center;
	}
	.time {
		font-size: 12px!important;
	}
</style>
