<template>
	<view class="title" :style="{paddingTop:top+'px'}">
		合约投资
	</view>
</template>

<script>
	export default {
		name:"ctitle",
		data() {
			return {
				top:getApp().globalData.top
			}
		}
	}
</script>

<style scoped>
	.title {
		width: 100%;
		height: 50px;
		color: #FFFFFF;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
