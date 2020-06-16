<template>
	<view class="list" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			全网排行榜
		</view>
		<view class="title">
			<view>昵称</view>
			<view>手机号</view>
			<view>排名</view>
		</view>
		<Item v-for="(item,index) in list" :key="index" :index="index" :list="item"></Item>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	import Item from './child/RanItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				list:[]
			}
		},
		onShow() {
			this.getTop()
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			getTop() {
				uni.request({
					url: api.top_list,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							this.list = res.data.list;
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					},
				})
			}
		},
		components:{
			Item
		}
	}
</script>

<style scoped>
	.list {
	}
	.notice_title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #FFFFFF;
	}
	
	.notice_title_left {
		position: absolute;
		width: 60px;
		height: 50px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.notice_title_left>image {
		width: 16px;
		height: 16px;
	}
	.title {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		font-size: 14px;
		text-align: center;
		border-bottom: 1px solid #E6E6E6;
	}
	
	.title>view {
		width: 33%;
	}
</style>
