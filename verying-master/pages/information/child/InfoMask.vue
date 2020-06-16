<template>
	<view class="addressmask" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="box">
			<view class="back">
				<image src="../../../static/img/notice/back.png" @click="tellSuper"></image>
			</view>
			<view class="box_coin_type">
				<view>
					<image v-if="index != 5" :src="item.assets_list[type].icon"></image>
					<image v-if="index === 5" :src="item.assets_list[4].icon"></image>
				</view>
				<view></view>
			</view>
			<view class="box_title" v-if="index != 5">
				<view class="box_title_left" v-if="index != 4">
					<view class="top">可用</view>
					<view class="btm">{{item.assets_list[type].use_num}}</view>
				</view>
				<view class="box_title_center" v-if="index != 1">
					<view class="top">冻结</view>
					<view class="btm">{{item.assets_list[type].foeeze}}</view>
				</view>
				<view class="box_title_right" v-if="index != 4">
					<view class="top">折合(CNY)</view>
					<view class="btm">{{item.assets_list[type].price}}</view>
				</view>
			</view>
			<view class="box_title" v-if="index === 5">
				<view class="box_title_left" >
					<view class="top">可用</view>
					<view class="btm">{{item.assets_list[4].use_num}}</view>
				</view>
				<!-- <view class="box_title_center" v-if="index != 1">
					<view class="top">冻结</view>
					<view class="btm">{{item.assets_list[5].foeeze}}</view>
				</view>
				<view class="box_title_right" v-if="index != 4">
					<view class="top">折合(CNY)</view>
					<view class="btm">{{item.assets_list[5].price}}</view>
				</view> -->
			</view>
			<view class="bor"></view>
			<view class="box_op">
				<view class="box_op_left" style="color: #2C2C2C;">财务记录</view>
				<view class="box_op_right">
					<!-- <image src="../../../static/img/reg/show.png" @click="isShow"></image> -->
				</view>
			</view>
			<scroll-view scroll-y="true" style="width: 100%;height: 50vh;" @scrolltolower="scrolltolower">
				<view v-if="allList.length === 0" class="tips">暂无记录</view>
				<Item v-else-if="allList.length != 0" v-for="(item,index) in allList" :key="index" :list="item"></Item>
			</scroll-view>
			<view class="operation" v-if="index === 1">
				<view class="operation_left" @click.stop="Chong">
					<view class="operation_left_img">
						<image src="../../../static/img/information/go.png"></image>
					</view>
					<view class="operation_left_text">充币</view>
				</view>
				<view class="operation_right" @click.stop="toCoin">
					<view class="operation_right_img">
						<image src="../../../static/img/information/to.png"></image>
					</view>
					<view class="operation_right_text">提币</view>
				</view>
			</view>
			<view class="operation" v-if=" index === 2">
				<view class="operation_right" @click="toConins">
					<view class="operation_right_img">
						<image src="../../../static/img/information/to.png"></image>
					</view>
					<view class="operation_right_text">提币</view>
				</view>
			</view>
		</view>
		<MaskTwo :list="list" v-if="show" @close="close"></MaskTwo>
	</view>
</template>

<script>
	import {
		api
	} from '../../../api/api.js'
	import Item from './InfoItem.vue'
	import MaskTwo from './InfoMaskTwo.vue'
	export default {
		name: "InfoMask",
		props: {
			item: {},
			index: 0
		},
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				show: false,
				list: [],
				typeid: 0,
				allList: [],
				page:1

			}
		},
		computed: {
			type() {
				if (this.index === 1) {
					return 0;
				} else if (this.index === 2) {
					return 1;
				} else if (this.index === 3) {
					return 2;
				} else if (this.index === 4) {
					return 3;
				}
			},
			coinType() {
				if (this.index === 1) {
					return 'usdt';
				} else if (this.index === 2) {
					return 'xev';
				} else if (this.index === 3) {
					return 'xv';
				} else if (this.index === 4) {
					return 'xev';
				}
			}
		},
	/* 	钱包币种：
		case 'usdt_money': $name = 'USDT钱包';
		break;
		case 'xcoin_use': $name = 'X币可用钱包';
		break;
		case 'xcoin_repeat': $name = 'X币复投钱包';
		break;
		case 'xcoin_freeze': $name = 'X币冻结钱包';
		break;
		case 'float_use': $name = '动态可用钱包';
		break;
		case 'float_freeze': $name = '动态冻结钱包';
		break;
		case 'jifen_money': $name = '积分钱包';
		break;
		case 'flat_money': $name = 'XV';
		break;
		case 'flat_freeze': $name = 'XV冻结钱包';
		break; */
		created() {
			uni.request({
				url: api.qrCode,
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
						
					} else {
						console.log(res);
					}
				}
			})
			if(this.index === 1) {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						/* typeid: -1, */
						page: this.page,
						money_type:"usdt_money"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						/* console.log(this.coinType);
						console.log(res); */
						if (res.data.code === "success") {
							this.allList = res.data.list;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			}else if(this.index === 2) {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						/* typeid: -1, */
						page: this.page,
						money_type:"xcoin_use"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.allList = res.data.list;
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
						}
					}
				})
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						/* typeid: -1, */
						page: this.page,
						money_type:"xcoin_repeat"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							for(let i=0; i<res.data.list.length; i++) {
								this.allList.push(res.data.list[i]);
							}
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							})*/
						} 
					}
				})
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						/* typeid: -1, */
						page: this.page,
						money_type:"xcoin_freeze"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							for(let i=0; i<res.data.list.length; i++) {
								this.allList.push(res.data.list[i]);
							}
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
						}
					}
				})
			}else if(this.index === 3) {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page,
						money_type:"flat_money"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						/* console.log(this.coinType);
						console.log(res); */
						if (res.data.code === "success") {
							this.allList = res.data.list;
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
						}
					}
				})
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						/* typeid: -1, */
						page: this.page,
						money_type:"flat_freeze"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						/* console.log(this.coinType);
						console.log(res); */
						if (res.data.code === "success") {
							for(let i=0; i<res.data.list.length; i++) {
								this.allList.push(res.data.list[i]);
							}
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							})*/
						} 
					}
				})
			}else if(this.index === 4) {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page,
						money_type:"float_freeze"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.allList = res.data.list;
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
						}
					}
				})
				
			}else if(this.index === 5) {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page,
						money_type:"jifen_money"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.allList = res.data.list;
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
						}
					}
				})
				
			}
		},
		methods: {
			scrolltolower(e) {
				this.page++;
				if(this.index === 1) {
					uni.request({
						url: api.caiwu,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							/* typeid: -1, */
							page: this.page,
							money_type:"usdt_money"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							/* console.log(this.coinType);
							console.log(res); */
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.allList.push(res.data.list[i]);
								}
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.index === 2) {
					uni.request({
						url: api.caiwu,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							/* typeid: -1, */
							page: this.page,
							money_type:"xcoin_use"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							/* console.log(this.coinType);
							console.log(res); */
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.allList.push(res.data.list[i]);
								}
							} else {
								/* uni.showToast({
									title: res.data.msg,
									icon: "none"
								}) */
							}
						}
					})
					uni.request({
						url: api.caiwu,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							/* typeid: -1, */
							page: this.page,
							money_type:"xcoin_repeat"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							/* console.log(this.coinType);
							console.log(res); */
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length; i++) {
									this.allList.push(res.data.list[i]);
								}
							} else {
								/* uni.showToast({
									title: res.data.msg,
									icon: "none"
								})*/
							} 
						}
					})
					uni.request({
						url: api.caiwu,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							/* typeid: -1, */
							page: this.page,
							money_type:"xcoin_freeze"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							/* console.log(this.coinType);
							console.log(res); */
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length; i++) {
									this.allList.push(res.data.list[i]);
								}
							} else {
								/* uni.showToast({
									title: res.data.msg,
									icon: "none"
								}) */
							}
						}
					})
				}else if(this.index === 3) {
					uni.request({
						url: api.caiwu,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							page: this.page,
							money_type:"flat_money"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							/* console.log(this.coinType);
							console.log(res); */
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.allList.push(res.data.list[i]);
								}
							} else {
								/* uni.showToast({
									title: res.data.msg,
									icon: "none"
								}) */
							}
						}
					})
					uni.request({
						url: api.caiwu,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							/* typeid: -1, */
							page: this.page,
							money_type:"flat_freeze"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							/* console.log(this.coinType);
							console.log(res); */
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length; i++) {
									this.allList.push(res.data.list[i]);
								}
							} else {
								/* uni.showToast({
									title: res.data.msg,
									icon: "none"
								})*/
							} 
						}
					})
				}else if(this.index === 4) {
					uni.request({
						url: api.caiwu,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							page: this.page,
							money_type:"float_freeze"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.allList.push(res.data.list[i]);
								}
							} else {
								/* uni.showToast({
									title: res.data.msg,
									icon: "none"
								}) */
							}
						}
					})
					
				}else if(this.index === 5) {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page,
						money_type:"jifen_money"
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							for(let i=0; i<res.data.list.length;i++) {
								this.allList.push(res.data.list[i]);
							}
						} else {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
						}
					}
				})
				
			}
			},
			toCoin() {
				uni.navigateTo({
					url: '../../../../CollectCoin/CollectCoin?type=0'
				})
			},
			toConins() {
				uni.navigateTo({
					url: '../../../../CollectCoin/CollectCoin?type=1'
				})
			},
			Chong() {
				uni.navigateTo({
					url: '../../../../CoinCharging/CoinCharging'
				})
			},
			getRecord() {
				uni.request({
					url: api.caiwu,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: 1,
						xev_type: "usdt",
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.allList = res.data.list;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			},
			tellSuper() {
				this.$emit("tellSuper", 'off')
			},
			isShow() {
				if (this.index === 1) {
					this.list = ['兑换', '转出', '转入', '取消'];
				} else {
					this.list = ['兑换', '转出', '转入', '提现', '合约收益', '邀请收益', '团队收益', '节点收益', '取消']
				}
				this.show = !this.show;
			},
			close(val) {
				this.show = !this.show;
				this.allList = [];
				this.typeid = val;
				if (val === undefined) {
					return;
				}
				this.getRecord();
			}
		},
		components: {
			Item,
			MaskTwo
		}
	}
</script>

<style scoped>
	.addressmask {
		background-color: rgb(204, 204, 204, 0.8);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 95%;
		background-color: #FFFFFF;
	}

	.operation {
		width: 100%;
		height: 100px;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(193, 193, 193, 0.1);
	}

	.operation>view {
		width: 25%;
		height: 100px;
		color: #2C2C2C;
	}

	.operation_left_img {
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.operation_left_img>image {
		width: 50px;
		height: 50px;
	}

	.operation_left_text {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 16px;
	}

	.operation_right_img {
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.operation_right_text {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 16px;
	}

	.operation_right_img>image {
		width: 50px;
		height: 50px;
		/* transform: rotate(180deg); */
	}

	.back {
		width: 100%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
		padding-top: 20px;
	}

	.back>image {
		width: 20px;
		height: 20px;
	}

	.box_coin_type {
		width: 90%;
		height: 30px;
		margin: 0 auto;
		line-height: 30px;
		display: flex;
		padding-top: 30px;
		padding-bottom: 20px;
	}

	.box_coin_type>view>image {
		width: 30px;
		height: 30px;
	}

	.box_coin_type>view {
		height: 30px;
		line-height: 30px;
		padding-left: 8px;
		color: #0366CB;
	}

	.box_title {
		width: 90%;
		height: 60px;
		margin: 0 auto;
		display: flex;
		padding-bottom: 10px;
	}

	.box_title_left {
		width: 37%;
	}

	.box_title_center {
		width: 40%;
	}

	.box_title_right {
		width: 23%;
		text-align: right;
	}

	.top {
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #C1C1C1!important;
	}

	.btm {
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		color: #2C2C2C!important;
	}

	.bor {
		width: 100%;
		height: 6px;
		background-color: #F7F6FB;
	}

	.box_op {
		width: 90%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		padding-top: 10px;
	}

	.box_op_left {
		width: 50%;
		line-height: 40px;
		font-size: 18px;
	}

	.box_op_right {
		width: 50%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.box_op_right>image {
		width: 20px;
		height: 20px;
	}
	.tips {
		width: 80%;
		height: 20px;
		line-height: 20px;
		margin: 0 auto;
		text-align: center;
		color: #CACFD2;
		font-size: 16px;
	}
</style>
