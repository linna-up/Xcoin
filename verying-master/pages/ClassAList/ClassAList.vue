<template>
	<view class="classalist" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			直推列表
		</view>
		<view class="title">
			<view>用户名</view>
			<view>手机号</view>
			<view>合约金额</view>
			<view>等级</view>
			<view>状态</view>
		</view>
		<ClassAItem v-for="(item,index) in list" :list="item" :key="index"></ClassAItem>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'

	import ClassAItem from './child/ClassAItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				page: 1,
				list: []
			}
		},
		onLoad() {
			this.getTeamList();
		},
		onReachBottom(e) {
			this.getTeamLists();
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			getTeamList() {
				uni.request({
					url: api.team_list,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page++
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.list = res.data.list;
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					}
				})
			},
			getTeamLists() {
				uni.request({
					url: api.team_list,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page++
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.list.push(...res.data.list);
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					}
				})
			}
		},
		components: {
			ClassAItem
		}
	}
</script>

<style scoped>
	.classalist {}

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
		width: 20%;
	}
</style>
