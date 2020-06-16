<template>
	<view class="title" :style="{paddingTop:top+'px'}">
		<view class="title_left"  @click="back" :style="{top:top}">
			<image src="../../../static/img/contractualing/back.png"></image>
		</view>
		合约投资
	</view>
</template>

<script>
	export default {
		name:"title",
		methods: {
			back() {
				this.$emit("back");
			}
		},
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
		color: #36F2E9;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.title_left {
		position: absolute;
		width: 60px;
		height: 50px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.title_left>image {
		width: 18px;
		height: 18px;
	}
</style>
