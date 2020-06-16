<template>
	<view class="item">
		<view class="item_title">
			<view class="item_title_left">
				<!-- <view>往事随风</view> -->
				<!-- <image src="../../../static/img/contract/TOP.png"></image> -->
			</view>
			<view class="item_title_right">
				<span class="number">{{AllList.unit_price}}</span>
				<span class="unit">usdt</span>
			</view>
		</view>
		<view class="item_box">
			<view class="item_box_left">
				<view class="item_box_left_top">数量: {{AllList.s_money}} - {{AllList.l_money}} {{getType}}</view>
				<view class="item_box_left_btm">金额: {{Number(AllList.s_money)*Number(AllList.unit_price)}} -
					{{Number(AllList.l_money)*Number(AllList.unit_price)}} usdt</view>
			</view>
			<view class="item_box_right">
				<button @click="tellMaskShow">购买</button>
			</view>
		</view>
		<view class="item_btm">
			<image v-show="AllList.is_wx === 1" src="../../../static/img/putlive/wx.png"></image>
			<image v-show="AllList.is_alipay === 1" src="../../../static/img/putlive/zfb.png"></image>
			<image v-show="AllList.is_bank === 1" src="../../../static/img/putlive/yl.png"></image>
			<image v-show="AllList.is_usdt === 1" src="../../../static/img/putlive/usdt.png"></image>
		</view>
		<view class="space"></view>
	</view>
</template>

<script>
	export default {
		name: "ItemBuy",
		props: {
			list: null,
			AllList: {
				type: Object,
				default: () => {
					return {
						"id": "15",
						"order_sn": "202005281723242041",
						"user_id": "10",
						"all_money": "1.00",
						"fee": "0.00",
						"sy_money": "0.99",
						"unit_price": "1.00",
						"s_money": "1.00",
						"l_money": "1.00",
						"add_time": "1590657804",
						"status": "0",
						"type": "1",
						"user": "13610011001",
						"user_name": "ceshi1001",
						"head_img": "",
						"money_type": "usdt_money",
						"yu_money": "0.00",
						"update_time": "0",
						"cdate": "2020-05-28 17:23:24",
						"mdate": "2020-05-28 17:23:24",
						"status_name": "待付款",
						"money_name": "USDT钱包",
						"money_total": "1.00"
					}
				}
			}
		},
		data() {
			return {
				thisType: 'USDT'
			}
		},
		methods: {
			tellMaskShow() {
				uni.$emit('ShowMask', {
					list: this.list,
					AllList:this.AllList
				})
				
			}
		},
		computed: {
			getType() {
				if (this.list.coinType === 0) {
					return "USDT"
				} else if (this.list.coinType === 1) {
					return "X币"
				}
			}
		},
		watch: {
			list(val) {
				console.log(val);
				if (list.coinType === 0) {
					this.thisType = "USDT"
				} else if (list.coinType === 1) {
					this.thisType = "X币"
				}
			}
		}
	}
</script>

<style scoped>
	.item {
		width: 100%;
	}

	.item_title {
		width: 85%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}

	.item_title>view {
		flex: 1;
		height: 30px;
	}

	.item_title_left {
		width: 70%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}

	.item_title_left>image {
		width: 20px;
		height: 20px;
		top: -4px;
	}

	.item_title_right {
		width: 30%;
		text-align: right;
		height: 30px;
		line-height: 30px;
	}

	.unit {
		font-size: 12px;
	}

	.item_box {
		width: 85%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}

	.item_box_left {
		width: 70%;
		height: 50px;
	}

	.item_box_left>view {
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		padding-top: 5px;
	}

	.item_box_right {
		width: 30%;
		height: 50px;
		display: flex;
		justify-content: right;
		align-items: center;
	}

	.item_box_right>button {
		width: 80%;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		background-color: #0066A1;
	}

	.item_btm {
		width: 85%;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
		border-top: 0.5px solid #C9C9C9;
		display: flex;
		margin-top: 8px;
	}

	.item_btm>image {
		width: 20px;
		height: 20px;
	}

	.space {
		width: 100%;
		height: 8px;
		background-color: #E6E6E6;
		margin-top: 6px;
	}
</style>
