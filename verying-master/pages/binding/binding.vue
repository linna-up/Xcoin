<template>
	<view class="binding" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/notice/back.png" @click="toBack"></image>
		</view>
		<view class="text">绑定</view>
		<BindingItem v-for="(item,index) in list" :list="item" :key="index"></BindingItem>
	</view>
</template>

<script>
	import BindingItem from './child/BinDingItem.vue'
	export default {
		data() {
			return {
				windowWidth:getApp().globalData.windowWidth,
				windowHeight:getApp().globalData.windowHeight,
				top:getApp().globalData.top,
				list:[
					/* {
						type:0,
						url:'../BindingZfb/BindingZfb'
					},
					{
						type:1,
						url:'../BindingWx/BindingWx'
					},
					{
						type:2,
						url:'../BindingBank/BindingBank'
					}, */
					{
						type:3,
						url:'../BindingUsdt/BindingUsdt'
					}
				]
			}
		},
		methods: {
			toBack() {
				uni.navigateBack();
			}
		},
		components: {
			BindingItem
		}
	}
</script>

<style scoped>
	.binding {
		
	}
	.NoticeDetails_top {
		width: 100%;
		height: 40px;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}
	.NoticeDetails_top>image {
		width: 16px;
		height: 16px;
		
	}
	.text {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-indent: 20px;
		font-size: 25px;
		font-weight: 600;
	}
</style>
