<template>
	<view class="tab">
		<view class="tab_left" :class="{active:activeIndex === 0}" @click="changeIndex(0)">{{i18n.CPDC}}</view>
		<view class="tab_right" :class="{active:activeIndex === 1}" @click="changeIndex(1)">{{i18n.CNPC}}</view>
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
		computed:{
			i18n(){
				return this.$t('message').PetroleumEtc
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
