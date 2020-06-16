<template>
	<view class="transaction" :style="{width:width+'px',height:(height)+'px'}">
		<view class="notice_title" style="position: fixed;z-index: 999;" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			服务中心
		</view>
		<view class="tabBox" style="position: fixed;z-index: 99990;background-color: #FFFEFE;" :style="{top:(44+top)+'px'}">
			<view class="tabBoxc">
				<!-- <view class="usdt" @click="ItemClick(1)"><span :class="{active:activeIndex === 0}">USDT</span></view> -->
				<view class="xev" @click="ItemClick(1)" style="font-size: 18px;"><span :class="{active:activeIndex === 1}">X币</span></view>
				<view v-if="is_store === '1'" class="onekeybuy" @click="showAllMask">一键发布</view>
			</view>
		</view>
		<!-- <scroll-view scroll-y="true" class="scroll-Y" :style="{width:width+'px',height:(height-50-top-40)+'px'}"> -->
		<mescroll-body class="scroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :style="{width:width+'px',top:(144-top)+'px'}">
			<LegalTocoin v-if="activeIndex === 0 && coinIndex === 0" :type="activeIndex" @TranType="TranType" :AllList="UsdtBuyList"></LegalTocoin>
			<LegalTocoin v-if="activeIndex === 0 && coinIndex === 1" :type="activeIndex" @TranType="TranType" :AllList="UsdtSellList"></LegalTocoin>
			<LegalTocoin v-if="activeIndex === 1 && coinIndex === 0" :type="activeIndex" @TranType="TranType" :AllList="XevBuyList"></LegalTocoin>
			<LegalTocoin v-if="activeIndex === 1 && coinIndex === 1" :type="activeIndex" @TranType="TranType" :AllList="XevSellList"></LegalTocoin>
			<!-- </scroll-view> -->
		</mescroll-body>

		<!-- <MyMask ref="mask" :showType="showType" v-if="maskShow"></MyMask> -->
		<MyMask ref="mask" :showType="showType" :AllList="AllList" v-if="maskShow"></MyMask>
		<AllMask v-if="allShow" ref="masks" @close="close"></AllMask>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import TabItem from './child/TabItem.vue'
	import CoinToCoin from './child/CoinToCoin.vue'
	import LegalTocoin from './child/LegalCoin.vue'
	import MyMask from './child/mask.vue'
	import AllMask from './child/AllMask.vue'
	import Tab from './child/manipulate.vue'

	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				width: getApp().globalData.windowWidth,
				height: getApp().globalData.windowHeight,
				top: getApp().globalData.top,

				activeIndex: 1,
				coinType: ['币币交易', '法币交易'],
				maskShow: false,
				allShow: false,
				set: [],
				showType: {
					coinType: 0,
					type: 0,
					title: "购买",
					img: "",
					price: 1.00,
					all: 0
				},
				mescroll: null, //mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				coinIndex: 0,
				usdtBuyBigid: 0,
				usdtSellBidid: 0,
				xevBuyBigid: 0,
				XevSellBigid: 0,
				UsdtBuyList: [],
				UsdtSellList: [],
				XevBuyList: [],
				XevSellList: [],
				AllList: [],
				is_store: ""
			}
		},
		onLoad() {
			this.getIndex();
			uni.$on('ShowMask', (data) => {
				/* this.showMaskType = data.type; */
				this.AllList = data.AllList;
				console.log(data);
				/* if (data.list.coinType === 0) {
					this.showType.coinType = 0;
					this.showType.type = 'USDT';
					this.showType.img = '../../../../../static/img/home/USDT.png';
					if (data.list.current === 0) {
						this.showType.title = '购买';
						this.showType.all = 0;
					} else if (data.list.current === 1) {
						this.showType.all = 1;
						this.showType.title = '出售';
					}
					this.showType.price = 1.00;
				} else if (data.list.coinType === 1) { */
					this.showType.coinType = 0;
					this.showType.type = "X币";
					this.showType.img = '../../../../../static/img/logo/XEV.png';
					if (data.list.current === 0) {
						this.showType.title = '购买';
						this.showType.all = 0;
					} else if (data.list.current === 1) {
						this.showType.title = '出售';
						this.showType.all = 1;
					}
					this.showType.price = 2.00;
				/* } */
				this.maskShow = !this.maskShow;
			})
			uni.$on('ChoseMask', () => {
				this.mescroll.triggerDownScroll();
				this.maskShow = !this.maskShow;
				this.$refs.mask.mydestroy();
			})

			this.getInfo();
			this.getJiao_Yi();
		},
		methods: {
			getIndex() {
				uni.request({
					url: api.index,
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
						if (res.data.code === 'success') {
							this.set = res.data.assets_list;
							console.log(res.data.assets_list);
						} else if (res.data.code === "error") {
							/* uni.showToast({
								title:res.data.msg,
								icon:"none",
								duration:1500
							}) */
						}
					}

				})
			},
			downCallback() {
				this.getJiao_Yi();
				uni.showToast({
					title: '刷新成功',
					duration: 1000,
					icon: "none"
				})
				this.mescroll.endSuccess();
			},
			//上拉加载回调
			upCallback(page) {
				console.log("上拉加载");
				this.getJiao_Yis();
				uni.showToast({
					title: '加载成功',
					duration: 1000,
					icon: "none"
				})
				setTimeout(() => {
					this.mescroll.endSuccess(15, true)
				}, 1000)
			},
			getInfo() {
				uni.request({
					url: api.info,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.code === "success") {
							this.is_store = res.data.result.is_store;
						} else {
							console.log(res);
						}
					}
				})
			},
			ItemClick(index) {
				this.activeIndex = index;
				this.getJiao_Yi();
			},
			toBack() {
				uni.navigateBack();
			},
			showAllMask() {
				this.allShow = !this.allShow;
			},
			close() {
				this.mescroll.triggerDownScroll();
				/* this.$refs.masks.mydestroy(); */
				this.allShow = !this.allShow;
			},
			getJiao_Yi() {
				this.UsdtBuyList = [];
				this.UsdtSellList = [];
				this.XevBuyList = [];
				this.XevSellList = [];
				if (this.activeIndex === 0) {
					if (this.coinIndex === 0) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: 2,
								bigid: 0,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									this.UsdtBuyList = res.data.list;
									this.usdtBuyBigid = res.data.last_id;
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					} else if (this.coinIndex === 1) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: 1,
								bigid: 0,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									this.UsdtSellList = res.data.list;
									this.usdtSellBidid = res.data.last_id;
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					}
				} else if (this.activeIndex === 1) {
					if (this.coinIndex === 0) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: 2,
								bigid: 0,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									this.XevBuyList = res.data.list;
									this.xevBuyBigid = res.data.last_id;
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					} else if (this.coinIndex === 1) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: 1,
								bigid: 0,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									this.XevSellList = res.data.list;
									this.XevSellBigid = res.data.last_id;
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					}
				}
			},
			getJiao_Yis() {
				console.log("下拉加载");
				if (this.activeIndex === 0) {
					if (this.coinIndex === 0) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: this.coinIndex + 1,
								bigid: this.usdtBuyBigid,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									for (let i = 0; i < res.data.list.length; i++) {
										this.UsdtBuyList.push(res.data.list[i])
									}
									this.usdtBuyBigid = res.data.last_id;
									/* this.UsdtBuyList = res.data.list; */
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					} else if (this.coinIndex === 1) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: this.coinIndex + 1,
								bigid: this.usdtSellBidid,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									for (let i = 0; i < res.data.list.length; i++) {
										this.UsdtSellList.push(res.data.list[i])
									}
									this.usdtSellBidid = res.data.last_id;
									/* this.UsdtSellList = res.data.list; */
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					}
				} else if (this.activeIndex === 1) {
					if (this.coinIndex === 0) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: this.coinIndex + 1,
								bigid: this.xevBuyBigid,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									for (let i = 0; i < res.data.list.length; i++) {
										this.XevBuyList.push(res.data.list[i])
									}
									this.xevBuyBigid = res.data.last_id;
									/* this.XevBuyList = res.data.list; */
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					} else if (this.coinIndex === 1) {
						uni.request({
							url: api.jiao_yi_ting,
							method: "POST",
							data: {
								uid: uni.getStorageSync('uid'),
								session_id: uni.getStorageSync('session_id'),
								type: this.coinIndex + 1,
								bigid: this.XevSellBigid,
								money_type: this.getCoinType
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code === "success") {
									for (let i = 0; i < res.data.list.length; i++) {
										this.XevSellList.push(res.data.list[i])
									}
									this.XevSellBigid = res.data.last_id;
									/* this.XevSellList = res.data.list; */
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}

							}
						})
					}
				}
			},
			TranType(index) {
				this.coinIndex = index;
				this.getJiao_Yi();
			}

		},
		computed: {
			getCoinType() {
				if (this.activeIndex === 0) {
					return "usdt_money";
				} else if (this.activeIndex === 1) {
					return "xcoin_use";
				}
			},
			getUsdtCny() {
				return this.set[0].cny;
			},
			getXevCny() {
				return this.set[1].cny;
			}
		},
		components: {
			TabItem,
			CoinToCoin,
			LegalTocoin,
			MyMask,
			AllMask,
			Tab
		}
	}
</script>

<style>
	.transaction {
		position: relative;
	}

	.notice_title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #FFFFFF;
	}

	.notice_title_left {
		position: absolute;
		width: 60px;
		height: 50px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.notice_title_left>image {
		width: 16px;
		height: 16px;
	}

	.tabBox {
		width: 100%;
		height: 40px;
		border-bottom: 0.5px solid #C1C1C1;
	}

	.tabBoxc {
		width: 90%;
		height: 40px;
		margin: 0 auto;
		padding-top: 9px;
	}

	.tabBoxc>view>span {
		height: 30px;
		line-height: 30px;
		display: inline-block;
	}

	.usdt,
	.xev {
		width: 60px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 16px;
		float: left;
		font-weight: 600;
	}

	.onekeybuy {
		width: 120px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 16px;
		float: right;
		background: linear-gradient(to right, #005FA1, #00ACAE);
		border-radius: 16px;
		color: #FFFFFF;

	}

	/* .tab {
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #C1C1C1;
	}
	.tabBox {
		width: 50%;
		height: 25px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid grey;
		border-radius: 16px;
		font-size: 15px;
	}
	.tabBox>view {
		flex: 1;
		height: 25px;
		line-height: 25px;
		text-align: center;
	}
	.Quotation {
		position: absolute;
		top: 16px;
		right: 16px;
		height: 25px;
		font-size: 16px;
		line-height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Quotation>image {
		width: 25px;
		height: 25px;
	} */
	.active {
		border-bottom: 1px solid #0165A1;
	}

	.scroll {}
</style>
