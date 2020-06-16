<template>
	<view class="Record">
		<view class="operation">
			<view class="operation_left" @click="operationIndex(0)"><span :class="{recordActive:activeIndex===0}">交易记录</span></view>
			<view class="operation_right" @click="operationIndex(1)"><span :class="{recordActive:activeIndex===1}">委托记录</span></view>
		</view>
		<Details></Details>
		<view class="loading">点击加载更多……</view>
	</view>
</template>

<script>
	import Details from './RecordDetails.vue'
	export default {
		name:'Record',
		data() {
			return {
				/* list:['交易记录','委托记录'] */
				activeIndex:0
			}
		},
		methods: {
			operationIndex(index) {
				this.activeIndex = index;
			}
		},
		components: {
			Details
		}
	}
</script>

<style scoped>
	.Record {
		width: 100%;
		margin-top: 30px;
	}
	.operation {
		width: 90%;
		height: 30px;
		margin: 0 auto;
		line-height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
	}
	.operation>view {
		width: 50%;
		height: 30px;
		line-height: 30px;
	}
	.operation_right {
		text-align: right;
	}
	.recordActive {
		border-bottom: 1px solid #0165A1;
	}
	.loading {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
	}
</style>
