<template>
	<view class="operation">
		<view @click="changeActive(0)" :class="{operation_buy:active===0}">{{list[0]}}</view>
		<view @click="changeActive(1)" :class="{operation_sell:active===1}">{{list[1]}}</view>
	</view>
</template>

<script>
	export default {
		name:'operation',
		props: {
			list:null
		},
		data() {
			return {
				active:0
			}
		},
		methods: {
			changeActive(index) {
				this.active = index;
				this.$emit("activeChange",index)
			}
		}
	}
</script>

<style scoped>
	.operation {
		width: 80%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.operation>view {
		width: 45%;
		background-color: #F7F6FB;
		text-align: center;
	}
	.operation_buy {
		background-color: #0066A1!important;
		color: #FFFFFF;
	}
	.operation_sell {
		background-color: #00AEAD!important;
		color: #FFFFFF;
	}
</style>
