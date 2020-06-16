<template>
	<view class="details" :style="{width:windowWidth+'px',height:(windowHeight-top-45-50)+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/notice/back.png" @click="toBack"></image>
		</view>
		<view class="num">
			-{{list.amount}} {{list.apply_type}}
		</view>
		<!-- <view class="item">
			<view class="item_left">类型</view>
			<view class="item_right">快速提币</view>
		</view> -->
		<view class="item">
			<view class="item_left">状态</view>
			<view class="item_right">{{list.status_paid}}</view>
		</view>
		<view class="item">
			<view class="item_left">提币地址</view>
			<view class="item_rights">
				<view>
					{{list.address}}
				</view>
			</view>
		</view>
		<view class="item">
			<view class="item_left">手续费</view>
			<view class="item_right">{{list.amount_fee}} {{list.apply_type}}</view>
		</view>
		<view class="item">
			<view class="item_left">时间</view>
			<view class="item_right">{{list.add_time}}</view>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				id: "",
				list: {}
			}
		},
		onLoad(option) {
			this.id = option.id;
			console.log(this.id);
			this.getHisDeta();
		},
		computed: {
			status() {
				if (this.list.status === "1") {
					return "待审核"
				} else if (this.list.status === "2") {
					return "已完成"
				} else if (this.list.status === "3") {
					return "已撤销"
				}
			}
		},
		methods: {

			toBack() {
				uni.navigateBack();
			},
			getHisDeta() {
				uni.request({
					url: api.history_detail,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						id: this.id
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
		}
	}
</script>

<style scoped>
	.details {}

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

	.num {
		width: 95%;
		height: 80px;
		line-height: 80px;
		text-indent: 30px;
		margin: 0 auto;
		color: #0267CB;
		font-size: 25px;
		border-bottom: 1px solid #F0EFED;
	}

	.item {
		width: 95%;
		height: 60px;
		line-height: 60px;
		text-indent: 16px;
		margin: 0 auto;
		border-bottom: 1px solid #F0EFED;
		display: flex;
	}

	.item_left {
		width: 30%;
		color: #8F9AA2;
		font-size: 14px;
	}

	.item_right {
		width: 70%;
		text-align: right;
		font-size: 16px;
	}

	.item_rights {
		width: 70%;
		text-align: right;
		font-size: 14px;
		color: #8F9AA2;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item_rights>view {
		width: 100%;
		height: 32px;
		line-height: 16px;
		word-wrap: break-word;
	}
</style>
