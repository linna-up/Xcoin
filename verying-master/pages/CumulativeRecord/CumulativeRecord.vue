<template>
	<view class="contractualing" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			累计投资
		</view>
		<Record></Record>
		<Records v-for="(item,index) in list" :key="index" :list="item"></Records>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import Record from './child/CumulativeRecordItem.vue'
	import Records from './child/CumulativeRecordItems.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list:[]
			}
		},
		onLoad() {
			this.get();
		},
		methods: {
			get() {
				uni.request({
					url: api.invest_list,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page:1
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
			toBack() {
				uni.navigateBack();
			},
			getRecord() {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page++,
						xev_type: "xev",
						invest_id: Number(this.id)
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						/* 
						if (res.data.code === "success") {
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
						} */
					}
				})
			}
		},
		components: {
			Record,
			Records
		}
	}
</script>

<style scoped>
	.contractualing {
		background-image: url("../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
	}

	.notice_title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		color: #36F2E9;
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
</style>
