<template>
	<view class="LeagalBuy">

		<!-- <view class="NumberAndMonet">
			<view class="NumberAndMonet_main">
				<input type="number" placeholder="数量" />
				<view>USDT</view>
			</view>
			<view class="z">
				<image src="../../../static/img/transaction/and.png"></image>
			</view>
			<view class="NumberAndMonet_main">
				<input type="number" placeholder="金额" />
				<view>CNY</view>
			</view>
		</view> -->
		<!-- <view class="predict">
			<view class="predict_left">
				<view>预估单价</view>
				<view>7.145CNY</view>
			</view>
			<view class="predict_right">
				<image src="../../../static/img/contract/TOP.png"></image>
				<view @click="tellMaskShow">一键购买</view>
			</view>
		</view> -->
		<view class="space"></view>
		<Item v-for="(item,index) in AllList" :key="index" :list="list" :AllList="item"></Item>
	</view>
</template>

<script>
	import Item from './ItemBuy.vue'
	export default {
		name: "LeagalBuy",
		props: {
			list: null,
			AllList: {
				type: Array,
				default: () => [/* {
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
					"is_bank": 1,
					"is_wx": 1,
					"is_alipay": 1,
					"is_usdt": 1,
					"status_name": "待付款",
					"money_name": "USDT钱包",
					"money_total": "1.00"
				} */]
			}
		},
		components: {
			Item
		},
		methods: {
			tellMaskShow() {
				uni.$emit('ShowMask', {
					type: 0
				})
			}
		}
	}
</script>

<style scoped>
	.LeagalBuy {
		width: 100%;
	}

	.space {
		width: 100%;
		height: 8px;
		background-color: #E6E6E6;
		margin-top: 20px;
	}

	.NumberAndMonet {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.NumberAndMonet_main {
		flex: 1;
		width: 100%;
		height: 100%;
		background-color: #F7F6FB;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.NumberAndMonet_main>input {
		width: 60%;
		height: 100%;
		text-indent: 16px;
	}

	.NumberAndMonet_main>view {
		width: 40%;
		text-align: center;
		color: #4F4E53;
		font-size: 16px;
	}

	.z {
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.z>image {
		width: 30px;
		height: 20px;
	}

	.predict {
		width: 85%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
	}

	.predict_left {
		padding-top: 5px;
		padding-bottom: 5px;
		color: #333333;
	}

	.predict_left>view {
		height: 20px;
		line-height: 20px;
		font-size: 15px;
	}

	.predict>view {
		flex: 1;
	}

	.predict_right {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #0066A1;
		height: 50px;
		line-height: 50px;
		border-radius: 4px;
	}

	.predict_right>image {
		width: 16px;
		height: 30px;
	}

	.predict_right>view {
		padding-left: 8px;
		color: #FFFFFF;
	}
</style>
