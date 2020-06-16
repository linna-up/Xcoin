<template>
	<view class="infoPanel">
		<view class="infoPanel_title_box" style="color: #0CF2FF!important;">
			<view class="infoPanel_title_box_left">
				<view class="infoPanel_title_box_left_top">账户资产折合 (USDT)</view>
				<view class="infoPanel_title_box_left_btm">
					{{
					Number(list.jifen_account_usdt)
				}}

					<span>≈{{
					Number(list.jifen_account_cny)
				}}CNY</span></view>
			</view>
			<view class="infoPanel_title_box_right">
				<image src="../../../static/img/my/zc.png"></image>
			</view>
		</view>
		<view class="infoPanel_item" style="color: #0CF2FF!important;" @click="three"><!-- @click="tellSuper" -->
			<view class="infoPanel_item_title">
				<view class="infoPanel_item_title_left">
					<image :src="list.assets_list[4].icon"></image>
				</view>
				<view class="infoPanel_item_title_center">{{list.assets_list[4].name}}</view>
				<view class="infoPanel_item_title_right">
					<image src="../../../static/img/mine/rights.png"></image>
				</view>
			</view>
			<view class="infoPanel_item_content" >
				<view class="infoPanel_item_content_item" style="width: 50%;">
					<view class="infoPanel_item_content_top">可用</view>
					<view class="infoPanel_item_content_btm">{{list.assets_list[4].use_num}}</view>
				</view>
				<!-- <view class="infoPanel_item_content_item">
					<view class="infoPanel_item_content_top">冻结</view>
					<view class="infoPanel_item_content_btm">{{list.assets_list[0].foeeze}}</view>
				</view> -->
				<!-- <view class="infoPanel_item_content_item" style="width: 50%;">
					<view class="infoPanel_item_content_top">折合</view>
					<view class="infoPanel_item_content_btm">{{list.assets_list[4].price}}</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "infoPanelThree",
		props: {
			list: {}
		},
		methods: {
			three() {
				uni.$emit('update',{num:5})
			}
		}
	}
</script>

<style scoped>
	.infoPanel {
		width: 100%;
		height: 80vh;
		/* background-color: #FAF9F7; */
	}

	.infoPanel_title_box {
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: #FFFFFF; */
	}

	.infoPanel_title_box_left {
		width: 70%;
		text-indent: 16px;
	}

	.infoPanel_title_box_left_top {
		height: 30px;
		line-height: 30px;
		font-size: 16px;
	}

	.infoPanel_title_box_left_btm {
		height: 40px;
		line-height: 40px;
		font-size: 20px;
	}

	.infoPanel_title_box_left_btm>span {
		font-size: 14px;
	}

	.infoPanel_title_box_right {
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.infoPanel_title_box_right>image {
		width: 30px;
		height: 30px;
	}

	.infoPanel_item {
		width: 95%;
		height: 100px;
		margin: 0 auto;
		margin-top: 5px;
		margin-bottom: 5px;
		/* background-color: #FFFFFF; */
	}

	.infoPanel_item_title {
		padding-top: 8px;
		width: 95%;
		height: 20px;
		margin: 0 auto;
		line-height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.infoPanel_item_title_left {
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.infoPanel_item_title_left>image {
		width: 20px;
		height: 20px;
	}

	.infoPanel_item_title_center {
		width: 85%;
		color: #0066A1;
	}

	.infoPanel_item_title_right {
		width: 5%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.infoPanel_item_title_right>image {
		width: 18px;
		height: 18px;
	}

	.infoPanel_item_content {
		width: 95%;
		height: 60px;
		padding-top: 8px;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 0.5px solid #0CF2FF;
	}

	.infoPanel_item_content_item {
		width: 33%;
		/* text-align: center; */
	}

	.infoPanel_item_content_top {
		color: #0066A1;
		font-size: 16px;
	}

	.infoPanel_item_content_btm {
		font-size: 16px;
	}
</style>
