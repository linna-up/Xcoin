<template>
	<view class="list">
		<view class="list_left">
			<view class="list_left_left">
				<image :src="list.icon"></image>
			</view>
			<view class="list_left_right">
				<view class="list_left_right_top">{{list.name}}</view>
				<view class="list_left_right_btm">{{list.cny}}</view>
			</view>
		</view>
		<view class="list_center">
			<view class="list_center_top">{{list.num}}</view>
			<view class="list_center_btm">≈{{list.price.toFixed(4)}}</view>
		</view>
		<view class="list_right">
			<view :style="{backgroundColor:getColor}">{{list.applies}}%</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"lists",
		props: {
			list: null
		},
		computed: {
			getColor() {
				if(Number(this.list.applies>=0)) {
					return  "#41A863";
				}else  {
					return  "red";
				}
			}
		}
	}
</script>

<style scoped>
	.list {
		width: 100%;
		height: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0.5px solid #CCCCCC;
	}
	.list>view {
		flex: 1;
		height: 45px;
	}
	.list_left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.list_left_left {
		height: 45px;
		width: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.list_left_left>image {
		width: 25px;
		height: 25px;
	}
	.list_left_right_top {
		height:25px ;
		font-size: 18px;
	}
	.list_left_right_btm {
		height:20px ;
		font-size: 12px;
		color: #818181;
	}
	.list_center {
		text-align: center;
	}
	.list_center_top {
		height:25px ;
		font-size: 18px;
	}
	.list_center_btm {
		height:20px ;
		font-size: 12px;
		color: #818181;
	}
	.list_right {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.list_right>view {
		width: 100px;
		height: 30px;
		color: #FFFFFF;
		text-align: center;
		/* background-color: #009A44; */
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
	}
</style>
