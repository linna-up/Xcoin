<template>
	<view class="cumulative">
		<view class="cumulative-item" @click="toCum">
			<view class="cumulative-item_top">累计投资</view>
			<view class="cumulative-item_btm">{{leiji_invest}}</view>
		</view>
		<view class="cumulative-item" @click="toJump">
			<view class="cumulative-item_top">累计收益</view>
			<view class="cumulative-item_btm">{{leiji_earnings}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cumulative",
		props: {
			leiji_invest:{
				type:String,
				default:"0.00"
			},
			leiji_earnings:{
				type:String,
				default:"0.00"
			}
		},
		methods: {
			toJump() {
				uni.navigateTo({
					url:'../../../../InvestmentRecord/InvestmentRecord'
				})
			},
			toCum() {
				uni.navigateTo({
					url:'../../../../CumulativeRecord/CumulativeRecord'
				})
			}
		}
	}
</script>

<style scoped>
	.cumulative {
		height: 40px;
		width: 100%;
		margin-top: 30px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.cumulative-item {
		color:#E7FFFF ;
		background-color: transparent;
		border: 1px solid #36F2E9;
		width: 45%;
		text-align: center;
		border-radius: 16px;
	}
	.cumulative-item_top {
		height: 22px;
		line-height: 22px;
		font-size: 15px;
	}
	.cumulative-item_btm {
		height: 18px;
		line-height: 18px;
		font-size: 13px;
	}
</style>
