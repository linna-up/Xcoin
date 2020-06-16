<template>
	<view class="usdt" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<view class="nav_left">
				<image src="../../static/img/notice/back.png" @click="back"></image>
			</view>
			<view class="nav_right">
				<!-- <image src="../../static/img/tabbar/contract.png"></image> -->
			</view>
		</view>
		<view class="nav_title">
			<image src="../../static/img/home/USDT.png"></image>
			<view class="nav_title_text">USDT 地址</view>
		</view>
		<view class="isnull" v-if="total_page === 0">
			<image src="../../static/img/contract/order.png"></image>
			<view>暂无记录</view>
		</view>
		<AdItem v-else v-for="(item,index) in list" :list="item" :key="index" @click.native="toCoin(item)" @remove="remove"></AdItem>
		<view class="btm" @click="addAddress">添加地址</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import AdItem from './child/AddItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list: [],
				total_page: 0
			}
		},
		onLoad() {
			this.getAddressList()
		},
		onShow() {
			this.getAddressList();
		},
		methods: {
			toCoin(item) {
				uni.setStorageSync('address',item.address);
				uni.navigateBack();
			},
			remove(id) {
				uni.request({
					url: api.remove,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						id: id
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code === "success") {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
				this.getAddressList();
				this.$forceUpdate();
			},
			back() {
				uni.navigateBack();
			},
			addAddress() {
				uni.navigateTo({
					url: '../AddAddress/AddAddress'
				})
			},
			getAddressList() {
				uni.request({
					url: api.address_list,
					data: {
						uid: this.uid,
						session_id: this.session_id
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						this.total_page = res.data.total_page;
						console.log(res.data);
						if (res.data.code === "success") {
							this.list = res.data.list;
						} else {
							/* uni.showToast({
								title:res.data.msg,
								icon:"none"
							}) */
						}
					}
				})
			}
		},
		components: {
			AdItem
		}
	}
</script>

<style scoped>
	.usdt {}

	.nav {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav_left {
		width: 50%;
		height: 50px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}

	.nav_left>image {
		width: 16px;
		height: 16px;
	}

	.nav_right {
		width: 50%;
		height: 50px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 16px;
	}

	.nav_right>image {
		width: 20px;
		height: 30px;
	}

	.nav_title {
		width: 95%;
		height: 50px;
		line-height: 50px;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;

	}

	.nav_title>image {
		width: 20px;
		height: 20px;
	}

	.nav_title>view {
		font-size: 20px;
		padding-left: 8px;
	}

	.isnull {
		width: 80%;
		height: 100px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 20px;
	}

	.isnull>image {
		width: 80px;
		height: 80px;
	}

	.isnull>view {
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 16px;
		text-align: center;
		color: #90A5B1;
	}

	.btm {
		width: 90%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #0066A1;
		border-radius: 8px;
		color: #FFFFFF;
		position: absolute;
		left: 5%;
		right: 5%;
		bottom: 40px;
	}
</style>
