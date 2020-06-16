<template>
	<view class="item" @click="toDetails">
		<view class="item_num">{{list.amount}}</view>
		<view class="item_statu">{{list.status_paid}}</view>
		<view class="item_time">{{list.add_time}}</view>
		<view class="item_to">
			<image src="../../../static/img/mine/right.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "History",
		props: {
			list: {}
		},
		methods: {
			toDetails() {
				uni.navigateTo({
					url: '../HistoryDetails/HistoryDetails?id='+this.list.id
				})
			}
		}
	}
</script>

<style scoped>
	.item {
		width: 100%;
		height: 45px;
		line-height: 45px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		text-indent: 8px;
		border-bottom: 1px solid #F0EFED;
		font-size: 14px;
	}

	.item_num {
		width: 28%;
		height: 35px;
		line-height: 35px;
	}

	.item_statu {
		width: 28%;
		height: 35px;
		line-height: 35px;
	}

	.item_time {
		width: 32%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 35px;
		line-height: 35px;
	}

	.item_to {
		height: 35px;
		line-height: 35px;
		line-height: 20px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.item_to>image {
		height: 14px;
		width: 8px;
	}
</style>
