<template>
	<view class="pay" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="title" :style="{paddingTop:top+'px'}">
			<view class="title_left" :style="{top:top}" @click="back">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			支付
		</view>
		<view class="register_item">
			<view class="register_item_left">支付金额:</view>
			<input type="number" v-model="money" placeholder="请输入支付金额(1~300cny)" placeholder-style="color:#B2B2B2;font-size:14px;" />
		</view>
		<view class="register_item">
			<view class="register_item_left">支付密码:</view>
			<input type="password" v-model="ps" placeholder="请输入安全密码" placeholder-style="color:#B2B2B2;font-size:14px;" />
		</view>
		<view class="text">
			<span>账户余额: </span><span style="color: #166A9B;">{{keyong}} X币</span>
			<view class="btm" @click="submit">提交</view>
		</view>
		<view class="init" v-if="show" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
			<view class="progress" v-if="show">
				<view class="progress_item" :style="{width:width+'%'}"></view>
				<view class="progress_text" v-if="show">付款中...</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from "../../api/api.js"
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				money: "",
				ps: "",
				address: "",
				keyong: 0.0,
				width: 0,
				show: false,
				timeing: null,
				msg:""
			}
		},
		methods: {
			back() {
				uni.navigateBack();
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
						console.log(res);
						if (res.data.code === "success") {
							this.keyong = res.data.result.xcoin_use;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					}
				})
			},
			submit() {
				if (this.money === '') {
					uni.showToast({
						title: "请输入金额",
						icon: "none"
					})
					return;
				} else if (this.ps === '') {
					uni.showToast({
						title: "请输入支付密码",
						icon: "none"
					})
					return;
				}
				this.width = 0;
				this.show = true;
				this.timeing = setInterval(() => {
					this.width += 10;
				}, 1000)
				uni.request({
					url: api.applyinfo,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						amount: this.money,
						paypassword: this.ps,
						address: this.address
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						this.msg = res.data.msg;
						if (res.data.code === "success") {
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
							this.money = '';
							this.ps = '';
							this.getInfo();
						} else {
							this.ps = "";
							/* uni.showToast({
								title: res.data.msg,
								icon: "none"
							}) */
						}

					}
				})
			}
		},
		onLoad(option) {
			console.log(option.result);
			this.address = option.result;
		},
		onShow() {
			this.getInfo();
		},
		watch: {
			width(newVal) {
				if (newVal === 100) {
					uni.showToast({
						title:this.msg,
						icon:"none"
					})
					clearInterval(this.timeing);
					setTimeout(() => {
						this.show = false;
					}, 2000)
					this.msg = "";
				}
			}
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				if(this.show) {
					uni.showToast({
						title: "转账中,请勿操作",
						icon: "none"
					})
					return true;
				}else {
					return false;
				}
			}
		}
	}
</script>

<style scoped>
	.pay {}

	.title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-bottom: 15px;
		border-bottom: 0.8px solid #B2B2B2;
	}

	.title_left {
		position: absolute;
		width: 60px;
		height: 50px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title_left>image {
		width: 18px;
		height: 18px;
	}

	.register_item {
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin: 0 auto;
		border-bottom: 0.4px solid #B2B2B2;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.register_item_left {
		width: 30%;
	}

	.text {
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		font-size: 16px;
		text-align: right;
	}

	.btm {
		width: 95%;
		height: 50px;
		margin: 0 auto;
		background-color: #0066A1;
		border-radius: 3px;
		text-align: center;
		margin-top: 8px;
		line-height: 50px;
		color: #FFFFFF;
		font-size: 16px;

	}

	.init {
		background: linear-gradient(to bottom, #00040F, #A0D3E5);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		z-index: 99999;
	}

	.progress_text {
		width: 100%;
		margin-top: 4px;
		text-align: center;
		color: #00A3AC;
		font-size: 16px;
	}

	.progress {
		width: 80%;
		height: 4px;
		border: 1px solid #F7F6FB;
		border-radius: 2px;
		position: fixed;
		left: 10%;
		right: 10%;
		top: 45%;
		color: #00A3AC;
	}

	.progress_item {
		height: 4px;
		background-color: #00A3AC;
		border-radius: 2px;
	}

	.init>image {
		width: 90px;
		height: 90px;
		border-radius: 45px;
	}
</style>
