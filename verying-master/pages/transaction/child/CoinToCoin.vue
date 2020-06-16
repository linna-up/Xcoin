<template>
	<view class="coinTocoin">
		<view class="coinTocoin_title">
			Xcoin/USDT
		</view>
		<Operation :list="list" @activeChange="MyActiveChange"></Operation>
		<Panel :operationType="activeIndex"></Panel>
		<Record></Record>
	</view>
</template>

<script>
	import Operation from './operation.vue'
	import Panel from './CoinToCoinPanel.vue'
	import Record from './Record.vue'
	export default {
		name:"CoinToCoin",
		data() {
			return {
				list:['买入','卖出'],
				activeIndex:0
			}
		},
		components: {
			Operation,
			Panel,
			Record
		},
		methods: {
			MyActiveChange(index) {
				this.activeIndex = index;
			}
		}
	}
</script>

<style scoped>
	.coinTocoin {
		/* width: 95%; */
		height: 80vh;
		margin: 0 auto;
		/* margin-top: 30px; */
		/* display: flex;
		justify-content: center;
		align-items: center; */
	}
	.coinTocoin_title {
		width: 90%;
		height: 60px;
		line-height: 60px;
		margin: 0 auto;
		color: #0066A1;
	}
	.BuyAndSell {
		
	}
	.buy {
		color: #FFFFFF;
		background-color: #0066A1;
	}
	.sell {
		color: #FFFFFF;
		background-color: #00A8AB;
	}
</style>
