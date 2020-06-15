<template>
	<view class="tab">
		<view>{{$t('message').mine.Index.Assets}}</view>
		<view>{{$t('message').mine.Index.NV}}</view>
		<view>{{$t('message').mine.Index.Applies}}</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.tab {
		width: 100%;
		height: 45px;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #CCCCCC;
	}
	.tab>view {
		flex: 1;
		text-align: center;
	}
</style>
