<template>
	<view class="node" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			开通超级节点
		</view>
		<view class="box">
			<NodeItem v-for="(item,index) in getNum" :my="my" :key="index" :index="index" :activeIndex="activeIndex"
			 @click.native="changeIndex(index)"></NodeItem>
		</view>
		<view class="btm" @click="toPay">确认支付</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import NodeItem from './child/NodeItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				activeIndex: 0,
				my: null,
				it: null,
				up_uid: null
			}
		},
		onLoad(option) {
			console.log(option);
			this.my = Number(option.my);
			this.it = Number(option.it);
			this.up_uid = Number(option.up_uid);
			console.log(this.up_uid);
		},
		computed: {
			getNum() {
				if (this.my === 1) {
					return 3;
				} else if (this.my === 2) {
					return 2;
				}
				if (this.my === 3) {
					return 1;
				}
			}
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			changeIndex(index) {
				this.activeIndex = index;
			},
			toPay() {
				if (this.my === 1) {
					if (this.activeIndex === 0) {
						uni.request({
							url: api.up_super_node,
							data: {
								uid: uni.getStorageSync("uid"),
								session_id: uni.getStorageSync("session_id"),
								up_uid: this.up_uid,
								super_node: 1
							},
							method: "post",
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								console.log(res);
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
								}
							}
						})
					} else if (this.activeIndex === 1) {
						uni.request({
							url: api.up_super_node,
							data: {
								uid: uni.getStorageSync("uid"),
								session_id: uni.getStorageSync("session_id"),
								up_uid: this.up_uid,
								super_node: 2
							},
							method: "post",
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								console.log(res);
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
								}
							}
						})
					} else if (this.activeIndex === 2) {
						uni.request({
							url: api.up_super_node,
							data: {
								uid: uni.getStorageSync("uid"),
								session_id: uni.getStorageSync("session_id"),
								up_uid: this.up_uid,
								super_node: 3
							},
							method: "post",
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								console.log(res);
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
								}
							}
						})
					}
				} else if (this.my === 2) {
					if (this.activeIndex === 0) {
						uni.request({
							url: api.up_super_node,
							data: {
								uid: uni.getStorageSync("uid"),
								session_id: uni.getStorageSync("session_id"),
								up_uid: this.up_uid,
								super_node: 2
							},
							method: "post",
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								console.log(res);
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
								}
							}
						})
					} else if (this.activeIndex === 1) {
						uni.request({
							url: api.up_super_node,
							data: {
								uid: uni.getStorageSync("uid"),
								session_id: uni.getStorageSync("session_id"),
								up_uid: this.up_uid,
								super_node: 3
							},
							method: "post",
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								console.log(res);
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
								}
							}
						})
					}
				}
				if (this.my === 3) {
					uni.request({
						url: api.up_super_node,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							up_uid: this.up_uid,
							super_node: 3
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
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
							}
						}
					})

				}
			}
		},
		components: {
			NodeItem
		}
	}
</script>

<style scoped>
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

	.box {
		width: 90%;
		height: 150px;
		margin: 0 auto;
		margin-top: 50px;
		display: flex;
		justify-content: space-around;
		align-items: center;

	}

	.btm {
		width: 80%;
		height: 50px;
		margin: 0 auto;
		background-color: #0066A1;
		margin-top: 50px;
		text-align: center;
		line-height: 50px;
		color: #FFFFFF;
		font-size: 16px;
		border-radius: 25px;
	}
</style>
