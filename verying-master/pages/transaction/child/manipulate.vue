<template>
	<view class="manipulate">
		<view class="manipulate_item buy_bg" @click="itemClick(0)" :class="{buy:activeIndex===0}">购买</view>
		<view class="manipulate_item sell_bg" @click="itemClick(1)" :class="{sell:activeIndex===1}">出售</view>
		<view class="manipulate_item_value">{{cny}}</view>
		<view class="img">
			<image src="../../../static/img/transaction/history.png" @click="toHistory"></image>
		</view>
	</view>
</template>

<script>
	import {api} from "../../../api/api.js"
	export default {
		name:'manipulate',
		props: {
			cny:""
		},
		data() {
			return {
				activeIndex:0,
				is_store:""
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
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
						if (res.data.code === "success") {
							this.is_store = res.data.result.is_store;
						} else {
							console.log(res);
						}
					}
				})
			},
			itemClick(index) {
				this.activeIndex = index;
				this.$emit("activeUpdate",this.activeIndex)
			},
			toHistory() {
				if(this.is_store === '0') {
					uni.navigateTo({
						url:'../../../../OrderList/OrderList'
					})
				}else if(this.is_store === '1') {
					uni.navigateTo({
						url:'../../../../order/order'
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	.manipulate {
		width: 70%;
		height: 35px;
		line-height: 35px;
		margin:  0 auto;
		color: #7C7C7C;
		font-size: 16px;
		padding-top: 12px;
	}
	.manipulate>view {
		width: 30%;
		float: left;
		margin-left: 8px;
		color:black;
	}
	.manipulate_item{
		/* background-color: #F7F6FB; */
		text-align: center;
	}
	.buy_bg {
		background-image: url(../../../static/img/transaction/buy_bg.png);
		background-size: 100% 100%;
	}
	.sell_bg {
		background-image: url(../../../static/img/transaction/sell_bg.png);
		background-size: 100% 100%;
	}
	.buy {
		background-image: url(../../../static/img/transaction/buy_a.png);
		background-size: 100% 100%;
		color: #FFFFFF!important;
		/* background: linear-gradient(-45deg,transparent 20px,#58a 0); */
	}
	.sell {
		background-image: url(../../../static/img/transaction/sell_a.png);
		background-size: 100% 100%;
		color: #FFFFFF!important;
	}
	.img{
		position: absolute;
		width: 35px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		top:12px ;
		right: -30px;
	}
	.img>image {
		width: 20px;
		height: 20px;
	}
</style>
