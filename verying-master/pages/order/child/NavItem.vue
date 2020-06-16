<template>
	<view class="item">
		<span>{{item}}</span>
	</view>
</template>

<script>
	export default {
		name:"NavItem",
		props: {
			item:null
		}
	}
</script>

<style scoped>
	.item {
		width: 15%;
		height: 29px;
		line-height: 29px;
		text-align: center;
		font-size: 16px;
	}
	.item>span {
		padding-left: 2px;
		padding-right: 2px;
		height: 29px;
		line-height: 29px;
		display: inline-block;
	}
	.active>span {
		border-bottom: 1px solid #0066A1;
	}
</style>
