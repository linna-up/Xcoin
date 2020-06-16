<template>
	<view class="information" :style="{width:windowWidth+'px',height:(windowHeight-50)+'px'}">
		<Title></Title>
		<scroll-view scroll-y="true" class="scroll-Y" :style="{width:windowWidth+'px',height:(windowHeight-50-top-50)+'px'}">
			<view class="information_box" style="color: #0CF2FF!important;">
				<view class="information_box_title" >
					<view class="information_box_title_left" style="color: #0CF2FF!important;">
						总资产账户折合 (USDT)
					</view>
					<view class="information_box_title_right">
						<!-- <image src="../../static/img/information/eye.png"></image> -->
					</view>
				</view>
				<view class="information_box_number" style="color: #0CF2FF!important;">
					<view class="information_box_number_left">{{allList.all_assets_usdt}}<span class="information_box_number_right">≈{{allList.all_assets_cny}}
							CNY</span></view>
					<!-- <view class="information_box_number_right"></view> -->
				</view>
				<view class="information_box_operation" style="color: #0CF2FF!important;">
					<view class="information_box_operation_item" @click="coinCharging">充币</view>
					<view class="information_box_operation_item" @click="collectCoin">提币</view>
					<view class="information_box_operation_item" @click="toTransfer">兑换</view>
				</view>
			</view>
			<Operation :index="active" @activeIndexChange="activeIndexChange"></Operation>
			<InfoPanel v-if="active === 0 " @tellSuper="tellSuper" :list="allList"></InfoPanel>
			<InfoPanelTwo v-if="active === 1" :list="allList" :xev_info="xev_info"></InfoPanelTwo>
			<InfoPanelThree v-if="active === 2" :list="allList"> </InfoPanelThree>
		</scroll-view>

		<InfoMask v-if="maskShow" @tellSuper="tellSuper" :item="allList" :index="index"></InfoMask>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'

	import Operation from './child/infoOperation.vue'
	import InfoPanel from './child/infoPanel.vue'
	import InfoPanelTwo from './child/InfoPanelTwo.vue'
	import InfoPanelThree from './child/InfoPanelThree.vue'
	import InfoMask from './child/InfoMask.vue'
	import Title from './child/InfoTitle.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list: ['资产账户', '动态账户', '商城积分'],
				active: 0,
				maskShow: false,
				allList: {
					"all_assets_usdt": "0.00",
					"all_assets_cny": "0.00",
					"assets_account_usdt": "0.00",
					"assets_account_cny": "0.00",
					"float_account_usdt": "0.00",
					"float_account_cny": "0.00",
					"jifen_account_usdt": "0.00",
					"jifen_account_cny": "0.00",
					"float_freeze": "0.00",
					"assets_list": [{
						"icon": "http://www.oszgs.top/Public/img/usdt.png",
						"name": "USDT",
						"use_num": "0.00",
						"foeeze": "0.00",
						"repeat": "0.00",
						"price": "0.00"
					}, {
						"icon": "http://www.oszgs.top/Public/img/xev.png",
						"name": "X币",
						"use_num": "0.00",
						"foeeze": "0.00",
						"repeat": "0.00",
						"price": "0.00"
					}, {
						"icon": "http://www.oszgs.top/Public/img/xv.png",
						"name": "XV",
						"use_num": "0.00",
						"foeeze": "0.00",
						"repeat": "0.00",
						"price": "0.00"
					}, {
						"icon": "http://www.oszgs.top/Public/img/xev.png",
						"name": "冻结钱包",
						"use_num": "0.00",
						"foeeze": "0.00",
						"repeat": "0.00",
						"price": "0.00"
					}, {
						"icon": "http://www.oszgs.top/Public/img/xev.png",
						"name": "商城积分",
						"use_num": "0.00",
						"foeeze": "0.00",
						"repeat": "0.00",
						"price": "0.00"
					}],
					"xev_info": {
						"icon": "http://www.oszgs.top/Public/img/xev.png",
						"name": "X币",
						"use_num": "0.00",
						"foeeze": "0.00",
						"repeat": "0.00",
						"price": "0.00"
					}
				},
				index: 0,
				getIsNull: false,
				xev_info: {}
			}
		},
		onLoad() {
			this.getAssets();
			uni.$on('update', (data) => {
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.num);
				this.index = data.num;
				uni.hideTabBar();
				this.maskShow = !this.maskShow;
			})
		},
		onShow() {
			this.getAssets();
		},
		methods: {
			activeIndexChange(index) {
				this.active = index;
			},
			coinCharging() {
				uni.navigateTo({
					url: "../CoinCharging/CoinCharging"
				})
			},
			collectCoin() {
				uni.navigateTo({
					url: '../CollectCoins/CollectCoins?type=2'
				})
			},
			toTransfer() {
				uni.navigateTo({
					url: '../transfer/transfer'
				})
			},
			tellSuper(tell) {
				if (tell === 'on') {
					/* uni.hideTabBar();
					this.maskShow = !this.maskShow; */
				} else if (tell === 'off') {
					uni.showTabBar();
					this.maskShow = !this.maskShow;
				}
			},
			getAssets() {
				uni.request({
					url: api.assets,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.allList = res.data.result;
							this.xev_info = res.data.xev_info;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			}

		},
		components: {
			Operation,
			InfoPanel,
			InfoPanelTwo,
			InfoPanelThree,
			InfoMask,
			Title
		}
	}
</script>

<style scoped>
	.information {
		background-image: url("../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
		color: #0CF2FF!important;
		background-color:transparent !important;
	}

	.information_box {
		width: 100%;
		height: 140px;
		/* background: linear-gradient(to right, #0067A2, #00A9AC); */
	}

	.information_box_title {
		padding-top: 10px;
		width: 100%;
		height: 30px;
		font-size: 16px;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.information_box_title_left {
		width: 70%;
		text-indent: 16px;
	}

	.information_box_title_right {
		width: 30%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 16px;
	}

	.information_box_title_right>image {
		width: 20px;
		height: 16px;
	}

	.information_box_number {
		width: 100%;
		height: 40px;
		text-indent: 16px;
		color: #FFFFFF;
	}

	.information_box_number_left {
		float: left;
		font-size: 25px;
		height: 40px;
	}

	.information_box_number_right {
		font-size: 14px;
		height: 40px;
		line-height: 40px;
	}

	.information_box_operation {
		width: 100%;
		height: 40px;
		font-size: 16px;
		color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.information_box_operation_item {
		width: 27%;
		height: 30px;
		line-height: 30px;
		border: 1px solid #63B9DD;
		text-align: center;
	}
</style>
