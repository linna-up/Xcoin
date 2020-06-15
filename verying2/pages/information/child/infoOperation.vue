<template>
	<view class="operation">
		<view class="operation_item" :class="{active:index===0}" @click="itemClick(0)">{{i18n.Static}}</view>
		<view class="operation_item" :class="{active:index===1}" @click="itemClick(1)">{{i18n.Dynamic}}</view>
		<view class="operation_item" :class="{active:index===2}" @click="itemClick(2)">{{i18n.Points}}</view>
	</view>
</template>

<script>
	export default {
		name:"infoOperation",
		props: {
			index:0
		},
		data() {
			return {
				
			}
		},
		methods: {
			itemClick(index) {
				this.$emit("activeIndexChange",index);
			}
		},
		computed:{
			i18n(){
				return this.$t('message').mine.information
			}
		}
	}
</script>

<style scoped>
	.operation {
		width: 98%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		/* border:1px solid #EBEBEB; */
	}
	.operation_item {
		height: 30px;
		line-height: 30px;
		font-size: 17px;
		text-align: center;
	}
	.active {
		border-bottom: 0.5px solid #0CF2FF;
		padding-left:4px;
		padding-right: 4px;
	}
</style>
