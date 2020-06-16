<template>
	<view class="order" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<OrderTitle :list="info" :status="infos.status"></OrderTitle>
		<view class="content">
			<view class="box">
				<view class="box_left">
					<view class="box_left_box">
						<view class="box_left_box_left">USDT {{(Number(infos.unit_price)*Number(infos.num)).toFixed(4)}}</view>
						<view class="box_left_box_right" v-if="infos.status === '1'" @click="show">申诉</view>
					</view>
					<view class="box_left_item">
						<view class="box_left_item_left">单价</view>
						<view class="box_left_item_right">USDT {{Number(infos.unit_price)}}</view>
					</view>
					<view class="box_left_item">
						<view class="box_left_item_left">数量</view>
						<view class="box_left_item_right">{{Number(infos.num)}} {{getType}}</view>
					</view>
				</view>
				<view class="box_right">
					<view class="box_right_img">
						<image :src="getCoinImg"></image>
					</view>
					<view class="box_right_text">{{getType}}</view>
				</view>
			</view>
			<view v-if="infos.buy_type === 2">
				<view class="item">
					<view class="item_left">买家昵称</view>
					<view class="item_right">{{infos.buy_user_name}}</view>
				</view>
				<view class="item">
					<view class="item_left">买家实名</view>
					<view class="item_right">{{getRealName}}</view>
				</view>
			</view>
			<view v-if="infos.buy_type === 1">
				<view class="item">
					<view class="item_left">卖家昵称</view>
					<view class="item_right">{{infos.buy_user_name}}</view>
				</view>
				<view class="item">
					<view class="item_left">卖家实名</view>
					<view class="item_right">{{getRealName}}</view>
				</view>
			</view>
			<view class="item">
				<view class="item_left">订单号</view>
				<view class="item_right">{{infos.order_sn}}</view>
			</view>
			<view class="item">
				<view class="item_left">下单时间</view>
				<view class="item_right">{{infos.cdate}}</view>
			</view>
			<!-- <view class="shoukuan" v-show="pay.is_open_wx ==='1'" v-if="infos.status != '4'">
				<view class="shoukuan_left">收款方式</view>
				<view class="shoukuan_right">
					<image style="margin-right: 8px;" :src="pay.alipay_img" @click="see(pay.wx_img)"></image>
					<image src="../../static/img/tran/wx.png"></image>
					<view>{{pay.wx}}</view>
					<image src="../../static/img/ass/FZ.png" @click="copy(pay.wx)"></image>
				</view>
			</view> -->
			<!-- <view class="shoukuan" v-show="pay.is_open_alipay === '1'" v-if="infos.status != '4'">
				<view class="shoukuan_left">收款方式</view>
				<view class="shoukuan_right">
					<image style="margin-right: 8px;" :src="pay.alipay_img" @click="see(pay.alipay_img)"></image>
					<image src="../../static/img/tran/zfb.png"></image>
					<view>{{pay.alipay}}</view>
					<image src="../../static/img/ass/FZ.png" @click="copy(pay.alipay)"></image>
				</view>
			</view> -->
			<view class="shoukuan" v-show="pay.is_open_usdt === '1'" v-if="infos.status != '4'">
				<view class="shoukuan_left">收款方式</view>
				<view class="shoukuan_right" style="width: 50%!important;overflow: hidden;">
					<image style="margin-right: 8px;" :src="pay.usdt_img" @click="see(pay.usdt_img)"></image>
					<image src="../../static/img/tran/USDT.png"></image>
					<view style="width: 50%!important;overflow: hidden;">{{pay.wallet_address}}</view>
					<image src="../../static/img/ass/FZ.png" @click="copy(pay.wallet_address)"></image>
				</view>
			</view>
			
			<!-- <view class="shoukuan" v-show="pay.is_open_bank === '1'" v-if="infos.status != '4'">
				<view class="shoukuan_left">收款方式</view>
				<view class="shoukuan_right">
					<image src="../../static/img/tran/yl.png"></image>
					<view>{{pay.bank_code}}</view>
					<image src="../../static/img/ass/FZ.png" @click="copy(pay.bank_code)"></image>
				</view>
			</view> -->
			<!-- <view class="shoukuan" v-show="pay.is_open_bank === '1'" v-if="infos.status != '4'">
				<view class="shoukuan_left"></view>
				<view class="shoukuan_right">
					<view class="c">开户支行:中国邮政江西支行</view>
				</view>
			</view> -->
		</view>
		<view class="fukatu" v-if="infos.status === '2'">
			<image :src="infos.pay_images" @click="yl"></image>
		</view>
		<view class="btm" v-show="infos.status === '1'" @click="yl">查看付款凭证</view>
		<view class="btm" v-show="infos.is_show_pay_up === 1" @click="upPingz">上传付款凭证</view>
		<view v-if="infos.buy_type === 1"  class="qd" v-show="(infos.status === '1') || (infos.status ==='2')">等待放行</view>
		<view v-if="infos.buy_type === 2" class="qd" v-show="infos.can_allow === 1" @click="fx">操作放行</view>
		<OrMask v-if="isShow" @close="close" :order_id="id"></OrMask>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	import OrderTitle from './child/OrderTitle.vue'
	import OrMask from './child/OrMask.vue'
	let image;
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				list: {},
				info: {},
				infos: {},
				pay: {},
				base: '',
				id: '',
				isShow: false
			}
		},
		onLoad(option) {
			console.log(option);
			this.id = option.id;
			uni.request({
				url: api.get_order_info,
				method: "post",
				data: {
					uid: uni.getStorageSync("uid"),
					session_id: uni.getStorageSync("session_id"),
					order_id: option.id
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					console.log(res);
					if (res.data.code === "success") {
						this.list = res.data.list;
						this.info = res.data.list.info;
						this.infos = res.data.list.info;
						this.pay = res.data.list.user_pay;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				}
			})
		},
		methods: {
			show() {
				this.isShow = !this.isShow;
			},
			close() {
				this.isShow = !this.isShow;
			},
			fx() {
				uni.request({
					url: api.allow,
					method: "post",
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						order_id: this.id
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							uni.request({
								url: api.get_order_info,
								method: "post",
								data: {
									uid: uni.getStorageSync("uid"),
									session_id: uni.getStorageSync("session_id"),
									order_id: this.id
								},
								header: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								success: (res) => {
									console.log(res);
									if (res.data.code === "success") {
										this.list = res.data.list;
										this.info = res.data.list.info;
										this.infos = res.data.list.info;
										this.pay = res.data.list.user_pay;
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
									}
								}
							})
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			},
			see(img) {
				uni.previewImage({
					urls: [img],
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			yl() {
				uni.previewImage({
					urls: [this.infos.pay_images],
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			copy(val) {
				uni.setClipboardData({
					data: val,
					success: function() {
						uni.showToast({
							title: "复制成功",
							icon: "none"
						})
					}
				});
			},
			async upPingz() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						pathToBase64(res.tempFilePaths[0]) //转base64
							.then(base64 => {
								this.base = base64 /* .split("base64,")[1] */ ;
								/* console.log(base64); */
								this.qUpingz(base64);
							})
							.catch(error => {
								console.log("出错了");
							})
					},
					complete: () => {

					}
				});

			},
			async qUpingz(base64) {
				uni.request({
					url: api.pingzheng,
					method: "post",
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						order_id: this.id,
						images: base64
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						/* console.log(this.base); */
						if (res.data.code === "success") {
							uni.request({
								url: api.get_order_info,
								method: "post",
								data: {
									uid: uni.getStorageSync("uid"),
									session_id: uni.getStorageSync("session_id"),
									order_id: this.id
								},
								header: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								success: (res) => {
									console.log(res);
									if (res.data.code === "success") {
										this.list = res.data.list;
										this.info = res.data.list.info;
										this.infos = res.data.list.info;
										this.pay = res.data.list.user_pay;
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: "none"
										})
									}
								}
							})
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					},
				})
			}

		},
		components: {
			OrderTitle,
			OrMask
		},
		computed: {
			getType() {
				if (this.infos.money_type === "usdt_money") {
					return "USDT";
				} else if (this.infos.money_type === "xcoin_use") {
					return "X币";
				}
			},
			getCoinImg() {
				if (this.infos.money_type === "usdt_money") {
					return "../../static/img/home/USDT.png"
				} else if (this.infos.money_type === "xcoin_use") {
					return "../../static/img/login/xev.png"
				}
			},
			getRealName() {
				let name = this.infos.buy_real_name;
				return name.substring(0,1) + "**";
			}
		}
	}
</script>

<style scoped>
	.order {
		background-color: #1D0F4A;
	}

	.content {
		padding-top: 8px;
		padding-bottom: 8px;
		color: #FFFEFE;
	}

	.box {
		width: 80%;
		height: 110px;
		margin: 0 auto;
		display: flex;
	}

	.box_left {
		width: 70%;
		height: 110px;
	}

	.box_left_box {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
	}

	.box_left_box_left {
		width: 70%;
		color: #E4AA91;
	}

	.box_left_box_right {
		width: 30%;
		color: #F8670B;
	}

	.box_right {
		width: 30%;
		height: 110px;
		display: flex;
		justify-content: flex-end;
		/* align-items: flex-end; */
		align-content: flex-end;
		flex-wrap: wrap;
	}

	.box_right_img {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.box_right_img>image {
		width: 30px;
		height: 30px;
	}

	.box_right_text {
		width: 100%;
		height: 30px;
		text-align: right;
		font-size: 16px;
	}

	.box_left_item {
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		display: flex;
	}

	.box_left_item_left {
		width: 80px;
		color: #817E8C;
	}

	.box_left_item_right {
		flex: 1;
	}

	.item {
		width: 80%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		display: flex;
	}

	.item_left {
		width: 30%;
		color: #817E8C;
		font-size: 16px;
	}

	.item_right {
		width: 70%;
		font-size: 16px;
		text-align: right;
	}

	.shoukuan {
		width: 80%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		display: flex;
	}

	.shoukuan_left {
		width: 64px;
		color: #817E8C;
		font-size: 16px;
	}

	.shoukuan_right {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 14px;
	}

	.shoukuan_right>image {
		width: 16px;
		height: 16px;
	}

	.shoukuan_right>view {
		margin-left: 4px;
		margin-right: 4px;
		text-align: center;
	}

	.c {
		flex: 1;
		margin-left: 4px;
		margin-right: 4px;
		text-align: center;
	}

	.btm {
		width: 90%;
		height: 40px;
		position: fixed;
		left: 5%;
		right: 5%;
		bottom: 80px;
		text-align: center;
		line-height: 40px;
		color: #FFFEFE;
		border-radius: 4px;
		font-size: 17px;
		background: linear-gradient(to right, #46246E, #582477);
	}

	.qd {
		width: 90%;
		height: 40px;
		position: fixed;
		left: 5%;
		right: 5%;
		bottom: 20px;
		text-align: center;
		line-height: 40px;
		border-radius: 4px;
		font-size: 17px;
		color: #FFFEFE;
		background: linear-gradient(to right, #4AB4DC, #7C8CE4);
	}

	.fukatu {
		width: 80%;
		height: 40px;
		margin: 0 auto;
	}

	.fukatu>image {
		width: 40px;
		height: 40px;
	}
</style>
