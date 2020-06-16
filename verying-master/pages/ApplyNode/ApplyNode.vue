<template>
	<view class="apply" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="node_title" :style="{paddingTop:top+'px'}">
			<view class="node_title_img">
				<image src="../../static/img/notice/back.png" @click="back"></image>
			</view>
			申请节点
		</view>
		<view class="item" style="margin-top: 30px;">
			<view class="item_left">当前级别:</view>
			<view class="item_right">
				<image :src="getImg"></image>
				<view style="color: #0067A2;">用户</view>
			</view>
		</view>
		<view class="item">
			<view class="item_left">申请级别:</view>
			<view class="item_right">
				<view>服务节点</view>
			</view>
		</view>
		<view class="item">
			<view class="item_left">节点金额:</view>
			<view class="item_right">
				<view style="color: #0067A2;">0.00<!-- {{S2_fee}} -->USDT</view>
			</view>
		</view>
		<view class="ye">账户余额:<span>{{usdt}}USDT</span></view>
		<button class="btm" :disabled="active" @click="applyNode">提交</button>
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
				usdt: 0,
				active: false,
				member_type:"",
				S2_fee:""
			}
		},
		onLoad() {
			this.getInfo();
			this.getNode_Money();
		},
		computed:{
			getImg() {
				if(this.member_type === "0") {
					return "../../../../../static/img/team/v.png"
				}else if(this.member_type === "1") {
					return "../../../../../static/img/team/v1.png"
				}else if(this.member_type === "2") {
					return "../../../../../static/img/team/v2.png"
				}else if(this.member_type === "3") {
					return "../../../../../static/img/team/v3.png"
				}else if(this.member_type === "4") {
					return "../../../../../static/img/team/v4.png"
				}else if(this.member_type === "4") {
					return "../../../../../static/img/team/node.png"
				}
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			getInfo() {
				uni.request({
					url: api.info,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						this.usdt = res.data.result.usdt_money;
						this.member_type = res.data.result.member_type;
					}
				})
			},
			getNode_Money() {
				uni.request({
					url: api.node_money,
					data: {
						
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							this.S2_fee = res.data.S2_fee;
						}
					}
				})
			},
			applyNode() {
				this.active = true;
				uni.request({
					url: api.apply_node,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
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
								icon: "none",
								duration: 1500
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								duration: 1500
							})
						}
						this.active = false;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.apply {}

	.node_title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 18px;
		position: relative;
	}

	.node_title_img {
		width: 45px;
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
	}

	.node_title_img>image {
		width: 18px;
		height: 18px;
	}

	.item {
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-top: 0.3px solid #E6E6E6;
		border-bottom: 0.3px solid #E6E6E6;
		font-size: 16px;
		display: flex;
	}

	.item_left {
		width: 35%;
		text-align: center;
	}

	.item_right {
		width: 65%;
		display: flex;
		align-items: center;
	}

	.item_right>image {
		width: 18px;
		height: 18px;
		margin-right: 6px;
	}

	.ye {
		width: 90%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		margin: 0 auto;
		text-align: right;
	}

	.ye>span {
		color: #0067A2;
	}

	.btm {
		width: 90%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin: 0 auto;
		margin-top: 20px;
		font-size: 18px;
		color: #FFFFFF;
		background-color: #0066A1;
		border-radius: 5px;
	}
</style>
