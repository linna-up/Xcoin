<template>
	<view class="item">
		<view class="box">
			<view class="box_l">
				<view class="box_l_top">
					<image src="../../../static/img/tabbar/mine_a.png"></image>
				</view>
				<view class="box_l_btm">{{list.dui_name}}</view>
			</view>
			<view class="box_left">
				<view class="box_left_item">{{i18n.Number}}: {{list.num}}{{getType}}</view>
				<view class="box_left_item">{{i18n.Residue}}: {{list.yu_money}}{{getType}}</view>
				<view class="box_left_item">{{i18n.UnitPrice}}: {{list.unit_price}}CNY</view>
				<view class="box_left_item">{{i18n.Amount}}:{{Number(list.unit_price)*Number(list.num)}}CNY</view>
			</view>
			<view class="box_right">
				<view class="box_right_top">{{list.status_name}}</view>
				<view class="box_right_center" @click="toDetail">{{i18n.Details}}</view>
				<view class="box_right_btm" v-if="list.status === '0'" @click="Cancel_order">{{i18n.Cancel}}</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {api} from '../../../api/api.js'
	export default {
		name:"ListItem",
		props: {
			list:{}
		},
		created() {
			console.log(this.list);
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url:'../../../../OrderDetail/OrderDetail?id='+this.list.id
				})
			},
			Cancel_order() {
				uni.request({
					url: api.cancel_order,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id: uni.getStorageSync('session_id'),
						order_id: this.list.id
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
			i18n(){
				return this.$t('message').OrderList
			},
			getType() {
				if (this.list.money_type === "usdt_money") {
					return "USDT";
				} else if (this.list.money_type === "xcoin_use") {
					return this.$t('message').OrderList.XCoin;
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
		width: 95%;
		height: 100px;
		margin:  0 auto;
		display: flex;
	}
	.box_l {
		width: 35%;
		height: 100px;
	}
	.box_l_top {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box_l_top>image {
		width: 50px;
		height: 50px;
	}
	.box_l_btm {
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		text-align: center;
	}
	.box_left {
		width: 45%;
		height: 100px;
	}
	.box_left_item {
		width: 100%;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
	}
	.box_right {
		width: 20%;
		height: 100px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
	}
	.box_right_center {
		width: 100%;
		height: 25px;
		line-height: 25px;
		background-color: #0066A1;
		border-radius: 4px;
		text-align: center;
		color: #FFFFFF;
		font-size: 14px;
	}
	.box_right_top {
		width: 100%;
		height: 25px;
		line-height: 25px;
		background-color: #1AA27A;
		border-radius: 4px;
		text-align: center;
		color: #FFFFFF;
		font-size: 14px;
	}
	.box_right_btm {
		width: 100%;
		height: 25px;
		line-height: 25px;
		background-color: #F56A31;
		border-radius: 4px;
		text-align: center;
		color: #FFFFFF;
		font-size: 14px;
	}
</style>
