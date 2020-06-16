<template>
	<view class="history" :style="{width:windowWidth+'px',height:(windowHeight-top-45-50)+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/notice/back.png" @click="toBack"></image>
		</view>
		<view class="history_title">历史记录</view>
		<!-- <view class="title_type">快速提币</view> -->
		<view class="title_text">
			<view class="title_text_left">数量</view>
			<view class="title_text_center">状态</view>
			<view class="title_text_right">时间</view>
		</view>
		<view class="tips" v-if="list.length === 0">暂无</view>
		<HisItem v-else v-for="(item,index) in list" :list="item" :key="index"></HisItem>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import HisItem from './child/HistoryItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list: []
			}
		},
		onLoad() {
			this.getHisList();
		},
		onShow() {
			this.getHisList();
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			getHisList() {
				uni.request({
					url: api.apply_history_list,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: 1
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code === "success") {
							this.list = res.data.list;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			}

		},
		components: {
			HisItem
		}
	}
</script>

<style scoped>
	.history {}

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

	.history_title {
		width: 90%;
		height: 30px;
		line-height: 30px;
		font-size: 25px;
		margin: 0 auto;
		padding-top: 25px;
		padding-bottom: 25px;
		text-indent: 8px;
	}

	.title_type {
		width: 90%;
		height: 20px;
		line-height: 20px;
		font-size: 18px;
		margin: 0 auto;
		padding-bottom: 20px;
		text-indent: 8px;
	}

	.title_text {
		width: 90%;
		height: 20px;
		line-height: 20px;
		font-size: 16px;
		margin: 0 auto;
		display: flex;
		text-indent: 8px;
		color: #91A5AE;
	}

	.title_text_left {
		width: 30%;
	}

	.title_text_center {
		width: 30%;
	}

	.title_text_right {
		width: 40%;
	}

	.tips {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #9CA5A9;
		font-size: 14px;
	}
</style>
