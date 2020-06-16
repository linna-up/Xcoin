<template>
	<view class="panel">
		<view class="panel_img">
			<image src="../../../static/img/contract/contract.png" />
		</view>
		<view class="status">
			<span class="status_title">状态:</span>
			<span class="status_value">
				<span class="statu_left" v-if="list.contract_status === 1">{{list.contract_status_name}}</span>
				<span class="statu_right" v-if="list.contract_status === 0">{{list.contract_status_name}}</span>
				<span class="statu_right" v-if="list.contract_status === 2">{{list.contract_status_name}}</span>
			</span>
		</view>
		<view class="money">
			<span>合约金额:</span>
			<span>{{list.contract_amount}}</span>
		</view>
		<!-- <view class="money">
			<span>收益统计:</span>
			<span>{{list.all_amount}}X币</span>
		</view> -->
		<view class="money">
			<span>在线时长:</span>
			<span>{{list.line_time}}天</span>
		</view>
		<view class="gainbox">
			<span class="gainbox_left">待领取收益:</span>
			<span class="gainbox_item">{{list.no_amount}}</span>
			<span class="gainbox_item">
				<view class="gain" @click="getSy">领取</view>
			</span>
		</view>
		<view class="gainbox">
			<span class="gainbox_left">申请退本:</span>
			<span class="gainbox_item"></span>
			<span class="gainbox_item">
				<view class="apply" @click="getTo_quit">申请</view>
			</span>
		</view>
		<view class="see" @click="toSee">
			查看记录
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../../api/api.js'
	export default {
		name: "panel",
		props: {
			list: {},
			id: 0
		},
		data() {
			return {
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				page: 1
			}
		},
		methods: {
			toSee() {
				uni.navigateTo({
					url:'../../../../ReceiveRecord/ReceiveRecord'
				})
			},
			getTo_quit() {
				if(Number(this.list.no_amount)>0) {
					uni.showToast({
						title:"请先领取收益",
						icon:"none"
					})
					return;
				}
				this.$emit("Show")
			},
			getSy() {
				uni.request({
					url: api.get_xcoin_money,
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
								duration: 1500,
								icon: "none"
							})
							this.$emit("reset")
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
		computed: {

		}
	}
</script>

<style scoped>
	.panel {
		width: 80%;
		height: 70vh;
		padding-bottom: 20px;
		margin: 0 auto;
		/* background-image: linear-gradient(to right, #1DA9FE, #058AFF); */
		background-color: transparent;
		border: 1px solid #61A8C4;
		border-radius: 5px;
		margin-top: 30px;
		position: relative;
	}

	.panel_img {
		width: 100%;
		height: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.panel_img>image {
		width: 50%;
		height: 90%;
	}

	.status {
		width: 85%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin: 0 auto;
		background-color: transparent;
		border: 1px solid #61A8C4;
		border-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.status>span {
		flex: 1;
		text-align: center;
	}

	.status_title {
		color: #36F2E9;
	}

	.status_value {
		color: #AFB8B0;
	}

	.statu_left {
		color: #F30D03;
	}

	.money {
		width: 85%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin: 0 auto;
		background-color: transparent;
		border: 1px solid #61A8C4;
		border-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 12px;
		color: #36F2E9;
		text-align: center;
	}

	.money>span {
		flex: 1;
	}

	.gainbox {
		width: 85%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin: 0 auto;
		background-color: transparent;
		border: 1px solid #61A8C4;
		border-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 12px;
		color: #36F2E9;
	}

	.gainbox_left {
		width: 50%;
		text-align: center;
	}

	.gainbox_item {
		flex: 1;
	}

	.gain {
		width: 60px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		background-color: #FF8AC6;
		color: #FFFFFF;
		text-align: center;
		background-image: linear-gradient(to right, #E20002, #32050E);
		background: linear-gradient(-135deg, transparent 3px, #E20002, #32050E);
	}

	.apply {
		width: 60px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		background-color: #FF8AC6;
		color: #FFFFFF;
		text-align: center;
		background: linear-gradient(-135deg, transparent 6px, #EB0103 0);
		/* background-image: linear-gradient(to right, #FF8FC9, #39060F); */
		background-image: linear-gradient(to right, #E20002, #32050E);
		background: linear-gradient(-135deg, transparent 3px, #E20002, #32050E);
	}

	.see {
		width: 85%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 18px;
		color: #FFFFFF;
		margin: 0 auto;
		/* border: 1px solid #61A8C4;
		background: linear-gradient(-135deg, transparent 6px, transparent 0); */
		background-image: url(../../../static/img/contractualing/bg.png);
		background-size: 100% 100%;
		margin-top: 45px;
	}
</style>
