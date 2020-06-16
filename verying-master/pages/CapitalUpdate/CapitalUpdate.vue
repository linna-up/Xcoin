<template>
	<view class="password" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			资金密码
		</view>
		<view class="box">
			<view class="box_left">
				<view class="box_left_left">
					<image src="../../static/img/mine/pwd_icon.png"></image>
				</view>
				<view class="box_left_right">新资金密码</view>
			</view>
			<view class="box_right">
				<input type="password" v-model="pwd" placeholder="请输入新资金密码" />
			</view>
		</view>
		<view class="box">
			<view class="box_left">
				<view class="box_left_left">
					<image src="../../static/img/mine/pwd_icon.png"></image>
				</view>
				<view class="box_left_right">确认新密码</view>
			</view>
			<view class="box_right">
				<input type="password" v-model="pwds" placeholder="请确认新密码" />
			</view>
		</view>
		<view class="box">
			<view class="box_left">
				<view class="box_left_left">
					<image src="../../static/img/mine/pwd_icon.png"></image>
				</view>
				<view class="box_left_right">手机验证码</view>
			</view>
			<view class="box_right_s">
				<input type="number" v-model="yzm" maxlength="6" placeholder="请输入验证码" />
			</view>
			<view class="box_right_s_r">
				<button class="box_right_s_btm" :disabled="active" @click="send">{{msg}}</button>
			</view>
		</view>
		<view class="btm" @click="set_pay_pwd">确认提交</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				msg: "发送",
				tiemer: null,
				active: false,
				tell: '',
				pwd: '',
				pwds: '',
				yzm: ''
			}
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			send() {
				this.active = true;
				this.msg = 60;
				this.tiemer = setInterval(() => {
					this.msg--;
					if (this.msg === 0) {
						clearInterval(this.tiemer);
						this.msg = '发送';
						this.active = false;
						return;
					}
				}, 1000)
				uni.request({
					url: api.set_pay_code,
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
					}
				})
			},
			set_pay_pwd() {
				if(this.pwd === "") {
					uni.showToast({
						title:"请输入支付密码",
						icon:"none"
					})
					return;
				}
				if(this.pwds === "") {
					uni.showToast({
						title:"请输入重复密码",
						icon:"none"
					})
					return;
				}
				if(this.yzm === "") {
					uni.showToast({
						title:"请输入验证码",
						icon:"none"
					})
					return;
				}
				uni.request({
					url: api.set_pay_pwd,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						PassWord:this.pwd,
						newPassWord:this.pwds,
						mobile:this.tell,
						yzm_code:this.yzm
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
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
							this.tell = res.data.result.mobile;
						} else {
							console.log(res);
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.password {}

	.notice_title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #FFFFFF;
		padding-bottom: 15px;
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

	.box {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
	}

	.box_left {
		width: 40%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box_left_left {
		width: 40px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box_left_left>image {
		width: 16px;
		height: 16px;
	}

	.box_left_right {
		flex: 1;
		font-size: 16px;
	}

	.box_right {
		width: 60%;
		height: 50px;
		line-height: 50px;
	}

	.box_right>input {
		width: 100%;
		height: 50px;

		font-size: 16px;
	}

	.box_right_s {
		width: 40%;
		height: 50px;
		line-height: 50px;
	}

	.box_right_s>input {
		width: 100%;
		height: 50px;
		font-size: 16px;
	}

	.box_right_s_r {
		width: 20%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box_right_s_btm {
		width: 80%;
		height: 20px;
		background-color: #0066A1;
		line-height: 20px;
		text-align: center;
		font-size: 12px;
		color: #FFFFFF;
		border-radius: 2px;
	}

	.btm {
		width: 90%;
		height: 45px;
		line-height: 45px;
		margin: 0 auto;
		background-color: #0066A1;
		text-align: center;
		color: #FFFFFF;
		margin-top: 32px;
		border-radius: 6px;
	}
</style>
