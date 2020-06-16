<template>
	<view class="RecordDetails">
		<view class="RecordDetails_title">
			<view>类型</view>
			<view>时间</view>
			<view>价格</view>
			<view>数量</view>
			<view>操作</view>
		</view>
		<Item v-for="(item,index) in 2" :key="index"></Item>
	</view>
</template>

<script>
	import Item from './RecordDetailsItem.vue'
	export default {
		name:'RecordDetails',
		components:{
			Item
		}
	}
</script>

<style scoped>
	.RecordDetails {
		width: 100vw;
	}
	.RecordDetails_title {
		width: 100vw;
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #E7E7E7;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}
	.RecordDetails_title>view {
		flex: 1;
		text-align: center;
	}
</style>
