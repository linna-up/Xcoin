<template>
	<view class="yq">
		<view class="yq_box">
			<view class="yq_box_left">
				<span>节点会员</span>
			</view>
			<view class="yq_box_right">{{list}}人
				<view class="img">
					<!-- <image src="../../../static/img/mine/right.png" ></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'Vip',
		props: {
			list:null
		},
		computed: {
			
		}
	}
</script>

<style scoped>
	.yq {
		width: 100%;
		line-height: 40px;
		height: 40px;
		border-bottom: 1px solid #E6E6E6;
	}
	.yq_box {
		width: 85%;
		height: 40px;
		margin: 0 auto;
		font-size: 16px;
		display: flex;
	}
	.yq_box_left {
		width: 40%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.yq_box_left>span {
		/* text-indent: 32px; */
	}
	.yq_box_left>image {
		width: 16px;
		height: 16px;
	}
	.yq_box_right {
		width: 60%;
		text-align: right;
		padding-right: 40px;
		position: relative;
	}
	.img{
		width: 30px;
		height: 40px;
		position: absolute;
		top: 0px;
		right: 0px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.img>image {
		width: 16px;
		height: 16px;
	}
</style>
