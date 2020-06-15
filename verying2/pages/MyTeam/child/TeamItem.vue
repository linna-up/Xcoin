<template>
	<view class="team">
		<view class="team_box">
			<view class="team_box_left">{{item.text}}</view>
			<view class="team_box_right">{{item.value}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TeamItem",
		props: {
			item:{}
		}
	}
</script>

<style scoped>
	.team {
		width: 100%;
		line-height: 40px;
		height: 40px;
		border-bottom: 1px solid #E6E6E6;
	}
	.team_box {
		width: 85%;
		height: 40px;
		margin: 0 auto;
		font-size: 16px;
		display: flex;
	}
	.team_box>view {
		width: 50%;
		font-size: 16px;
	}
	.team_box_right {
		text-align: right;
		padding-right: 40px;
	}
</style>
