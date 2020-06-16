<template>
	<view class="NoticeDetails" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/notice/back.png" @click="toBack"></image>
		</view>
		<view class="NoticeDetails_title">
			<view>{{title}}</view>
			<view class="time"> {{time}}</view>
		</view>
		<view class="NoticeDetails_content">
			<view class="NoticeDetails_content_box" v-html="content">
			</view>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	export default {
		name: "NoticeDetails",
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				title: '测试',
				time: "2020-04-20 11:50:11",
				content: '了解详情'
			}
		},
		onLoad(option) {
			console.log(option.id);
			this.getNoticeDetail(option.id);
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			getNoticeDetail(id) {
				uni.request({
					url: api.notice_detail,
					data: {
						id: id
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.time = res.data.result.add_time;
							this.title = res.data.result.title;
							this.content = res.data.result.content;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								duration: 1500
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.NoticeDetails {
		background-color: #FAF9F7;
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

	.NoticeDetails_title {
		width: 100%;
		height: 50px;
		padding-top: 16px;
		background-color: #FFFFFF;
		padding-bottom: 8px;
	}

	.NoticeDetails_title>view {
		text-align: center;
	}

	.time {
		font-size: 14px;
	}

	.NoticeDetails_content {
		width: 100%;
		height: 40%;
		margin-top: 3px;
		font-size: 16px;
		background-color: #FFFFFF;
	}

	.NoticeDetails_content_box {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		word-break: break-all;
		line-height: 40px;
		text-indent: 32px;
	}
</style>
