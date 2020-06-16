<template>
	<view class="item">
		<view class="box">
			<view class="box_left">
				<view class="box_left_item">数量: {{list.all_money}}{{getType}}</view>
				<view class="box_left_item">剩余: {{list.sy_money}}{{getType}}</view>
				<view class="box_left_item">单价: {{list.unit_price}}usdt</view>
				<view class="box_left_item">金额: {{Number(list.s_money)*Number(list.unit_price)}}~{{Number(list.l_money)*Number(list.unit_price)}}usdt</view>
			</view>
			<view class="box_right">
				<view class="box_right_top">{{getTranStatus}}</view>
				<view class="box_right_center" v-if="(list.status === '1') || (list.status === '2') " @click="toOrderList">订单列表</view>
				<view class="box_right_btm" v-if="list.status === '0'" @click="getCancel_jiaoyi">取消</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		api
	} from '../../../api/api.js'
	export default {
		name: "BuyOrItem",
		props: {
			list: {}
		},
		methods: {
			toOrderList() {
				uni.navigateTo({
					url:'../../../../OrderList/OrderList'
				})
			},
			getCancel_jiaoyi() {
				uni.request({
					url: api.cancel_jiaoyi,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id: uni.getStorageSync('session_id'),
						buyhelp_id:this.list.id
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							 uni.$emit('refersh')
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
		computed: {
			getType() {
				if (this.list.money_type === "usdt_money") {
					return "USDT";
				} else if (this.list.money_type === "xcoin_use") {
					return "X币";
				}
			},
			getTranStatus() {
				if (this.list.status === "0") {
					return "待交易";
				} else if (this.list.status === "1") {
					return "交易中";
				} else if (this.list.status === "2") {
					return "已完成";
				} else if (this.list.status === "3") {
					return "已取消";
				}
			}
		}
	}
</script>

<style scoped>
	.item {
		width: 100%;
		height: 100px;
		padding-top: 15px;
		padding-bottom: 10px;
		border-bottom: 6px solid #E6E6E6;
	}

	.box {
		width: 85%;
		height: 100px;
		margin: 0 auto;
		display: flex;
	}

	.box_left {
		width: 70%;
		height: 100px;
	}

	.box_left_item {
		width: 100%;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
	}

	.box_right {
		width: 30%;
		height: 100px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
	}

	.box_right_center {
		width: 80%;
		height: 25px;
		line-height: 25px;
		background-color: #0066A1;
		border-radius: 4px;
		text-align: center;
		color: #FFFFFF;
		font-size: 14px;
	}

	.box_right_top {
		width: 80%;
		height: 25px;
		line-height: 25px;
		background-color: #1AA27A;
		border-radius: 4px;
		text-align: center;
		color: #FFFFFF;
		font-size: 14px;
	}

	.box_right_btm {
		width: 80%;
		height: 25px;
		line-height: 25px;
		background-color: #F56A31;
		border-radius: 4px;
		text-align: center;
		color: #FFFFFF;
		font-size: 14px;
	}
</style>
