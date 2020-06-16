<template>
	<view class="tab">
		<view class="tab_left" :class="{active:activeIndex === 0}" @click="changeIndex(0)">中石化充值</view>
		<view class="tab_right" :class="{active:activeIndex === 1}" @click="changeIndex(1)">中石油充值</view>
	</view>
</template>

<script>
	export default {
		name:"PerTabItem",
		data() {
			return {
				activeIndex:0
			}
		},
		methods: {
			changeIndex(index) {
				this.activeIndex = index;
				this.$emit("changeIndex",index)
			}
		}
	}
</script>

<style scoped>
	.tab {
		width: 60%;
		height: 35px;
		margin: 0 auto;
		border: 0.2px solid #D2D2D2;
		border-radius: 16px;
		display: flex;
		margin-bottom: 25px;
	}
	.tab>view {
		width: 50%;
		height: 35px;
		line-height: 35px;
		text-align: center;
		border-radius: 16px;
		font-size: 16px;
	}
	.active {
		background: linear-gradient(to right,#0062A1,#00ACAE);
		color: #FFFFFF;
	}
</style>
