<template>
	<view class="panel">
		<view class="panel_title">
			<view class="panel_title_text">当前价格</view>
			<view class="panel_title_right">
				<view class="panel_title_right_left">1.03</view>
				<view class="panel_title_right_right">USDT</view>
			</view>
		</view>
		<view class="u_panel_title">
			<view class="u_panel_title_text">交易数量</view>
			<view class="u_panel_title_right">
				<input type="number" placeholder="请输入" class="u_panel_title_right_left" />
				<view class="u_panel_title_right_right">Xcoin</view>
			</view>
		</view>
		<view class="u_panel_title">
			<view class="u_panel_title_text">交易金额</view>
			<view class="u_panel_title_right">
				<input type="number" placeholder="请输入" class="u_panel_title_right_left" />
				<view class="u_panel_title_right_right">USDT</view>
			</view>
		</view>
		<view class="u_panel_title">
			<view class="u_panel_title_text">法币 ≈</view>
			<view class="u_panel_title_right">
				<input type="number" placeholder="请输入" class="u_panel_title_right_left" />
				<view class="u_panel_title_right_right">USDTCNY</view>
			</view>
		</view>
		<view class="available">
			<span class="available_left">可用0.000</span>
			<span class="available_right">USDT</span>
		</view>
		<view class="operation" v-if="operationType===0">买入Xcoin</view>
		<view class="u_operation" v-else>卖出Xcoin</view>
	</view>
</template>

<script>
	export default {
		name:"CoinToCoinPanel",
		props: {
			operationType:""
		}
	}
</script>

<style scoped>
	.panel {
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.panel_title {
		width: 100%;
		height: 45px;
		height: 45px;
		background-color: #F4F8FB;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.panel_title>view {
		flex:1;
	}
	.panel_title_text {
		text-align: center;
	}
	.panel_title_right_left {
		float: left;
		width: 60px;
	}
	.panel_title_right_right {
		float: left;
	}
	.u_panel_title {
		width: 100%;
		height: 45px;
		height: 45px;
		margin-top: 8px;
		border: 1px solid #F2F2F2;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.u_panel_title>view {
		flex:1;
	}
	.u_panel_title_text {
		text-align: center;
	}
	.u_panel_title_right_left {
		float: left;
		width: 60px;
	}
	.u_panel_title_right_right {
		float: left;
	}
	.available {
		width: 100%;
		height: 45px;
		height: 45px;
		font-size: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.available_left {
		color: #818181;
	}
	.operation {
		width: 100%;
		height: 50px;
		height: 50px;
		font-size: 18px;
		background-color: #0066A1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		border-radius: 8px;
	}
	.u_operation {
		width: 100%;
		height: 50px;
		height: 50px;
		font-size: 18px;
		background-color: #00AEAD;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		border-radius: 8px;
	}
</style>
