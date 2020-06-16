<template>
	<view class="collectcoin" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="nav" :style="{paddingTop:top+'px'}">
			<view class="nav_left">
				<image src="../../static/img/notice/back.png" @click="back"></image>
			</view>
			<view class="nav_right">
				<image src="../../static/img/contract/order.png" @click="toHistory"></image>
			</view>
		</view>
		<view class="content_title">提币</view>
		<view class="content_type" v-if="thisType === 0">
			<view class="content_type_img">
				<image src="../../static/img/home/USDT.png"></image>
			</view>
			<view class="content_type_text">USDT(ERC20)</view>
		</view>
		<view class="content_type" v-else-if="thisType === 1">
			<view class="content_type_img">
				<image src="../../static/img/team/v.png"></image>
			</view>
			<view class="content_type_text">X币</view>
		</view>
		<view class="address_text">提币地址</view>
		<view class="address">
			<input type="text" v-model="address" placeholder="输入或长按粘贴地址" @input="filter" />
			<view class="address_right">
				<view class="address_right_left">
					<image src="../../static/img/collectcoin/scan.png" @click="collectCoin"></image>
				</view>
				<view class="address_right_center"><span></span></view>
				<view class="address_right_right">
					<image src="../../static/img/quotation/edit.png" @click="toUsdt"></image>
				</view>
			</view>
		</view>
		<view class="address_text">提币数量</view>
		<view class="num">
			<input type="number" class="address_input" v-model="num" placeholder="最小提币数量:2" @blur="BiLi" />
			<view class="num_right">
				<view class="num_right_left">
					<span v-if="thisType === 0">
						<coinSelect style="width: 60px;height: 60px;background-color: transparent;border: 0;" :list="list" :clearable="false"
						 :initValue="list[this.thisType]" :selectHideType="'hideAll'" @change="change">
						</coinSelect>
					</span>
					<span v-else-if="thisType === 1">
						<coinSelect style="width: 60px;height: 60px;background-color: transparent;border: 0;" :list="list" :clearable="false"
						 :initValue="list[this.type]" :selectHideType="'hideAll'" @change="change">
						</coinSelect>
					</span>
					<image v-if="thisType === 0" src="../../static/img/home/USDT.png"></image>
					<image v-else-if="thisType === 1" src="../../static/img/team/v.png"></image>
				</view>
				<view class="address_right_center"><span></span></view>
				<view class="num_right_right" @click="choice">
					全部
				</view>
			</view>
		</view>
		<view class="available" v-if="thisType === 0">可用 {{all}} USDT</view>
		<view class="available" v-else-if="thisType === 1">可用 {{all}} X币</view>
		<view class="address_text">手续费</view>
		<view class="service">
			<view class="service_left">{{fee.toFixed(2)}}</view>
			<view class="service_right">
				<span v-if="thisType === 0">USDT</span>
				<span v-else-if="thisType === 1">X币</span>
				<image v-if="thisType === 0" src="../../static/img/home/USDT.png"></image>
				<image v-else-if="thisType === 1" src="../../static/img/team/v.png"></image>
			</view>
		</view>
		<view class="Explain">
			<p>最小提币数量为: 2USDT(ERC20)</p>
			<p>为保障资金安全,当您账户安全策略变更,密码修改,我们会对提币进行人工审核,请耐心等待客服人员的电话或邮件联系。</p>
			<p>请勿必确认电脑或浏览器安全,防止信息被篡改或泄露。</p>
		</view>
		<view class="service">
			<view class="service_lefts">到账数量</view>
			<view class="service_rights">
				<span v-if="thisType === 0">{{dz}}USDT</span>
				<span v-else-if="thisType === 1">{{dz}}X币</span>
				<image v-if="thisType === 0" src="../../static/img/home/USDT.png"></image>
				<image v-else-if="thisType === 1" src="../../static/img/team/v.png"></image>
			</view>
		</view>
		<view class="btm" @click="tiBi">提币</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import coinSelect from '@/components/coin_xfl-select/coin_xfl-select.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list: ['USDT', 'X币'],
				address: null,
				num: null,
				/* apply_type:"XEV", */
				type: 0,
				thisType: 0,
				fee: 0.00,
				dz: 0.0,
				usdt: "",
				xev: ""
			}
		},
		onLoad(option) {
			console.log(option);
			getApp().globalData.type = Number(option.type);
			this.type = getApp().globalData.type;

		},
		onShow() {
			this.address = uni.getStorageSync('address');
			uni.removeStorageSync('address');
			console.log(getApp().globalData.type);
			this.getInfo();
		},
		computed: {
			all() {
				if (this.thisType === 0) {
					return this.usdt;
				} else if (this.thisType === 1) {
					return this.xev;
				}
			},
			getTiBiType() {
				if (this.thisType === 0) {
					return "usdt";
				} else if (this.thisType === 1) {
					return "xev";
				}
			}
		},
		watch: {
			fee(newVal) {
				this.dz = this.num - newVal;
			}
		},
		methods: {
			filter(event) {
				let i = event.target.value
				var reg = new RegExp("^[A-Za-z0-9]+$")
				if(event.target.value.length === 0) {
					this.address = null;
				}
				if(!reg.test(i)) {
					this.address = null;
					event.target.value = null;
					console.log("有");
				}else {
					console.log("没有");
					this.address = i;
				}
			},
			choice() {
				if (this.thisType === 0) {
					this.num = Number(this.usdt);
				} else if (this.thisType === 1) {
					this.num = Number(this.xev);
				}
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
							this.usdt = res.data.result.usdt_money;
							this.xev = res.data.result.xcoin_use;
						} else {
							console.log(res);
						}
					}
				})
			},
			change(e) {
				if (e.newVal === "USDT") {
					this.thisType = 0;
				} else if (e.newVal === "X币") {
					this.thisType = 1;
				}
			},
			BiLi() {
				uni.request({
					url: api.sxfbl,
					data: {
						amount: this.num,
						type:this.getTiBiType
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.code === "success") {
							this.fee = Number(res.data.result.apple_fee);
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					},
				})
			},
			back() {
				uni.navigateBack();
			},
			collectCoin() {
				uni.scanCode({
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.address = res.result;
					}
				});
			},
			toUsdt() {
				uni.navigateTo({
					url: '../USDTAddress/USDTAddress'
				})
			},
			toHistory() {
				uni.navigateTo({
					url: "../history/history"
				})
			},
			tiBi() {
				if (this.thisType === 0) {
					uni.request({
						url: api.applyinfos,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							amount: this.num,
							address: this.address,
							apply_type: "USDT"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(api.applyinfo);
							if (res.data.code === "success") {
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
				} else if (this.thisType === 1) {
					uni.request({
						url: api.applyinfos,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							amount: this.num,
							address: this.address,
							apply_type: "XEV"
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.code === "success") {
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
				}
			}
		},
		components: {
			coinSelect
		}
	}
</script>

<style scoped>
	.collectcoin {}

	.nav {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav_left {
		width: 50%;
		height: 50px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}

	.nav_left>image {
		width: 16px;
		height: 16px;
	}

	.nav_right {
		width: 50%;
		height: 50px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 16px;
	}

	.nav_right>image {
		width: 16px;
		height: 16px;
	}

	.content_title {
		width: 100%;
		height: 60px;
		font-weight: 400;
		line-height: 60px;
		text-indent: 30px;
		font-size: 25px;
	}

	.content_type {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
		padding-left: 30px;
		margin-bottom: 20px;
	}

	.content_type_img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
	}

	.content_type_img>image {
		width: 30px;
		height: 30px;
	}

	.content_type_text {
		color: #0067D1;
		text-indent: 16px;
	}

	.address_text {
		width: 95%;
		margin: 0 auto;
		height: 20px;
		font-size: 14px;
		margin-top: 40px;
	}

	.address {
		width: 95%;
		margin: 0 auto;
		height: 40px;
		font-size: 18px;
		display: flex;
		border-bottom: 1px solid #A2B0B7;
	}

	.address>input {
		flex: 1;
		height: 40px;
	}

	.address_right {
		width: 81px;
		display: flex;
	}

	.address_right_center {
		width: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address_right_center>span {
		width: 1px;
		height: 14px;
		background-color: #91A5B0;
	}

	.address_right_left {
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address_right_left>image {
		width: 20px;
		height: 20px;
	}

	.address_right_right {
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address_right_right>image {
		width: 20px;
		height: 20px;
	}

	.num {
		width: 95%;
		margin: 0 auto;
		height: 40px;
		font-size: 18px;
		display: flex;
		border-bottom: 1px solid #A2B0B7;
	}

	.address_input {
		width: 40%;
		height: 40px;
	}

	.num_right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.num_right_right {
		width: 60px;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		padding-right: 16px;
		text-align: right;
	}

	.num_right_left {
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.num_right_left>span {
		width: 50px;
		font-size: 16px;
		color: #A6B5BE;
	}

	.num_right_left>image {
		width: 16px;
		height: 16px;
	}

	.available {
		width: 95%;
		margin: 0 auto;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
	}

	.service {
		width: 95%;
		margin: 0 auto;
		height: 25px;
		line-height: 25px;
		font-size: 15px;
		margin-top: 20px;
		display: flex;
	}

	.service>view {
		width: 50%;
	}

	.service_right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 16px;
	}

	.service_right>span {
		padding-right: 8px;
		color: #A6B5BE;
	}

	.service_right>image {
		width: 16px;
		height: 16px;
	}

	.Explain {
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 20px;
		font-size: 14px;
		background-color: #F7F6FB;
		padding-top: 16px;
		padding-bottom: 16px;
		padding-left: 16px;
	}

	.service_lefts {
		color: #A6B5BE !important;
	}

	.service_rights {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 16px;
	}

	.service_rights>span {
		padding-right: 8px;
	}

	.service_rights>image {
		width: 16px;
		height: 16px;
	}

	.btm {
		width: 90%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #0066A1;
		border-radius: 8px;
		color: #FFFFFF;
		position: absolute;
		left: 5%;
		right: 5%;
		bottom: 20px;
	}
</style>
