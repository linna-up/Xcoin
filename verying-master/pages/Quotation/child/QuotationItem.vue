<template>
	<view class="QuotationItem">
		<view class="QuotationItem_left">
			<view class="QuotationItem_left_img"><image :src="message.images"></image></view>
			<view class="text">{{message.name.toUpperCase()}}/USDT</view>
		</view>
		<view class="QuotationItem_center">
			<view class="QuotationItem_center_top">{{message.price_usd}}</view>
			<view class="QuotationItem_center_btm">¥{{message.price_cny}}</view>
		</view>
		<view class="QuotationItem_right">
			<view style="backgroundColor: green;" v-if="message.percent_change_24h>=0">+{{message.percent_change_24h}}</view>
			<view style="backgroundColor: red;" v-else>{{message.percent_change_24h}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'QuotationItem',
		props: {
			message:{}
		}
	}
</script>

<style scoped>
	.QuotationItem {
		width: 100%;
		height: 60px;
		display: flex;
		background-color: #FFFFFF;
		margin-bottom: 3px;
	}
	.QuotationItem_left {
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.QuotationItem_center,
	.QuotationItem_right {
		width: 30%;
		text-align: center;
	}
	.QuotationItem_right {
		display: flex;
		justify-content: center;
		align-items:center ;
	}
	.QuotationItem_right>view {
		width: 80px;
		height: 40px;
		color: #FFFFFF;
		line-height: 40px;
		text-align: center;
		background-color: #00C9B1;
		border-radius: 4px;
	}
	.QuotationItem_left_img>image {
		width: 25px;
		height: 25px;
	}
	.QuotationItem_left_img{
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.text {
		width: 60%;
		font-size: 16px;
		padding-left: 8px;
	}
	.QuotationItem_center_top {
		height: 40px;
		line-height: 40px;
		font-size: 18px;
	}
	.QuotationItem_center_btm {
		height: 20px;
		line-height: 20px;
		font-size: 14px;
	}
</style>
