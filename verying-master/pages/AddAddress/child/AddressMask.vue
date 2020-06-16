<template>
	<view class="addressmask" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="addressmask_box">
			<!-- <view class="addressmask_box_title">
				<p>若未收到短信,请检查手机网络</p>
				<p>更改安全选项? <span>点击这里</span></p>
			</view>
			<view class="anquan">
				<view class="anquan_left">安全验证</view>
				<view class="anquan_right">取消</view>
			</view>
			<view class="tell">{{tell.substring(0,3)}}****{{tell.substring(7,tell.length)}}</view>
			<view class="yzbox">
				<view class="yzbox_left">
					<input type="number" v-model="yzm" maxlength="6" placeholder="手机验证码" />
				</view>
				<view class="yzbox_right">
					<span>发送</span>
				</view>
			</view> -->
			<view class="tell">交易密码</view>
			<view class="yzbox">
				<view class="yzbox_left">
					<input type="password" v-model="ps" maxlength="6" placeholder="请输入交易密码" />
				</view>
			</view>
			<view class="btm" @click="addAddress">添加地址</view>
			<view class="close" @click.stop="close">
				<image src="../../../static/img/transaction/chose.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../../api/api.js'
	export default {
		name: "AddressMask",
		props: {
			address: '',
			bz: ''
		},
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				yzm: '',
				ps: '',
				tell: ""
			}
		},
		created() {
			this.getInfo();
		},
		methods: {
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
							this.tell = res.data.result.mobile;
							console.log(this.tell);
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			},
			addAddress() {
				/* if (this.yzm === '') {
					uni.showToast({
						title: "请输入验证码",
						icon: "none"
					})
					return;
				} else */if (this.ps === '') {
					uni.showToast({
						title: "请输入交易密码",
						icon: "none"
					})
					return;
				}
				uni.request({
					url: api.add_address,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						address: this.address,
						label: this.bz,
						paypassword: this.ps,
						yzm_code: this.yzm
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.code === "success") {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
							this.$emit("close");
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					}
				})
			},
			close() {
				this.$emit("close")
			}
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

	.addressmask_box {
		width: 100%;
		/* height: 55vh; */
		height: 200px;
		background-color: #FFFFFF;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 8px;
		padding-top: 16px;
		padding-bottom: 8px;
	}

	.addressmask_box_title {
		width: 100%;
		height: 60px;
		line-height: 30px;
		font-size: 16px;
		text-indent: 16px;
		color: #666666;
	}

	.addressmask_box_title>p>span {
		color: #0866C2 !important;
	}

	.anquan {
		width: 100%;
		height: 60px;
		line-height: 60px;
		border-top: 1px solid #E6E6E6;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
	}

	.anquan_left {
		width: 50%;
		font-size: 18px;
		text-indent: 16px;
	}

	.anquan_right {
		width: 50%;
		font-size: 16px;
		text-align: right;
		padding-right: 16px;
		color: #E6E6E6;
	}

	.tell {
		width: 100%;
		height: 20px;
		line-height: 20px;
		text-indent: 16px;
		padding-top: 30px;
		padding-bottom: 20px;
		font-size: 14px;
	}

	.yzbox {
		width: 100%;
		height: 30px;
		line-height: 30px;
		display: flex;
		border-bottom: 0.5px solid #6495ED;
	}

	.yzbox_left {
		width: 50%;
		height: 30px;
		line-height: 30px;
		padding-left: 16px;
	}

	.yzbox_left {
		height: 30px;
		font-size: 18px;
	}

	.yzbox_right {
		width: 50%;
		height: 30px;
		text-align: right;
		padding-right: 16px;
	}

	.yzbox_right>span {
		font-size: 18px;
		color: #0566C7;

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
		bottom: 40px;
	}

	.close {
		width: 25px;
		height: 25px;
		position: absolute;
		top: 16px;
		right: 16px;
	}

	.close>image {
		width: 25px;
		height: 25px;
	}
</style>
