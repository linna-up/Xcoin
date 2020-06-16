<template>
	<view class="top" @click="toTop">
		<view class="top_left">全网邀请排名</view>
		<view class="top_btm">
			<image src="../../../static/img/contract/TOP.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"top",
		methods: {
			toTop() {
				uni.navigateTo({
					url:'../../../../RankingList/RankingList'
				})
			}
		}
	}
</script>

<style scoped>
	.top {
		width: 95%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: 1px solid #36F2E9;
		border-radius: 16px;
		margin-top: 30px;
	}
	.top_left {
		width: 120px;
		font-size: 17px;
		color: #FFFFFF;
		text-align: center;
	}
	.top_btm {
		width: 50px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top_btm>image {
		width: 40px;
		height: 20px;
	}
</style>
