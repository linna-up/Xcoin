<template>
	<view class="item">
		{{item}}
		<view class="item_sj"></view>
	</view>
</template>

<script>
	export default {
		name:'TellItem',
		props: {
			item:''
		}
	}
</script>

<style scoped>
	.item {
		width: 30%;
		height: 55px;
		line-height: 55px;
		text-align: center;
		border: 1px solid #D2D2D2;
		margin-top: 8px;
		margin-bottom: 8px;
		position: relative;
	}
	
	.item_sj {
		width: 20px;
		height: 20px;
		background-image: url("../../../static/img/tellcost/active.png");
		background-size: 100% 100%;
		right: 0;
		bottom: 0;
		position: absolute;
		display: none;
	}
	.active>view {
		display: block;
	}
</style>
