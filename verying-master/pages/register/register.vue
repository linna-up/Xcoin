<template>
	<view class="register" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="title" :style="{paddingTop:top+'px'}">
			<view class="title_left" :style="{top:top}" @click="back">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			创建XCOIN账号
		</view>
		<view class="register_item">
			<view class="register_item_left">昵称</view>
			<input type="text" v-model="nicheng" placeholder="请输入昵称" />
		</view>
		<view class="register_item">
			<view class="register_item_left">手机号</view>
			<input type="number" maxlength="11" v-model="tell" placeholder="请输入手机号" />
		</view>
		<view class="register_item">
			<view class="register_item_left">密码</view>
			<input type="password" v-model="password" placeholder="请输入密码" />
		</view>
		<view class="register_item">
			<view class="register_item_left">密码</view>
			<input type="password" v-model="passwords" placeholder="请再次输入密码" />
		</view>
		<view class="register_item">
			<view class="register_item_left">邀请码</view>
			<input type="text" v-model="yqm" placeholder="请输入邀请码" />
		</view>
		<view class="ps_s">
			<view class="ps_s_left">验证码</view>
			<input type="text" v-model="yzm" placeholder="请输入验证码" />
			<view class="ps_s_right">
				<span>{{randoms}}</span>
			</view>
		</view>
		<view class="ps_s">
			<view class="ps_s_left">手机验证码</view>
			<input type="number" v-model="tellyzm" placeholder="请输入手机验证码" />
			<view class="ps_s_right">
				<button class="send" @click="sendYzm" :disabled="btnActive">{{btn}}</button>
			</view>
		</view>
		<view class="btm" @click="creatAccount">创建</view>
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
				btn: "发送",
				btnActive: false,
				time: 60,
				timer: null,
				randoms: '',
				nicheng: '',
				tell: '',
				password: '',
				passwords: '',
				yqm: '',
				yzm: '',
				tellyzm: '',
				count:60
			}
		},
		onLoad() {
			this.random();
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			random() {
				this.randoms = "";
				for (var i = 1; i <= 4; i++) {
					const num = Math.floor(Math.random() * 10);
					this.randoms += num;
				}
			},
			checkPhone(phone) {
				if (!(/^1[3456789]\d{9}$/.test(phone))) {
					uni.showToast({
						title: '手机号错误',
						icon: 'none',
						duration: 1000
					})
					return false;
				}
			},
			codeChange() {
				this.timer = setInterval(()=>{
					if(this.count === 0) {
						clearInterval(this.timer);
						this.btnActive = false;
						this.btn = "发送";
						return;
					}
					this.btn = this.count-- + "s";
					this.btnActive = true;
				},1000)
			},
			sendYzm() {
				if (this.tell === "") {
					uni.showToast({
						title: '手机号不为空',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				this.checkPhone(this.tell);
				this.codeChange();
				uni.request({
					url: api.reg_code,
					data: {
						mobile: this.tell
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
			},
			creatAccount() {
				if (this.nicheng === "") {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.tell === "") {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.password === '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.passwords === '') {
					uni.showToast({
						title: '请确认密码',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.yqm === "") {
					uni.showToast({
						title: '请输入邀请码',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.yqm === '') {
					uni.showToast({
						title: '请输入邀请码',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.yzm === '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.yzm != this.randoms) {
					uni.showToast({
						title: '验证码错误',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.tellyzm === '') {
					uni.showToast({
						title: '请输入手机验证码',
						icon: 'none',
						duration: 1000
					})
					return;
				}

				uni.request({
					url: api.reg,
					method: 'POST',
					data: {
						invite_code: this.yqm,
						nickname: this.nicheng,
						mobile: this.tell,
						yzm_code: this.tellyzm,
						PassWord: this.password,
						PassWord1: this.passwords
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if(res.data.code === "success") {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:'../login/login'
								})
							},1500)
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						
					}
				});

			}
		}
	}
</script>

<style scoped>
	.register {}

	.title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
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
		width: 90%;
		height: 50px;
		margin: 0 auto;
		border: 0.2px solid #F7F8FA;
		margin-top: 8px;
		background-color: #F9FDFF;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.register_item_left {
		width: 30%;
	}

	.ps_s {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		border: 0.2px solid #F7F8FA;
		margin-top: 8px;
		background-color: #F9FDFF;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ps_s_left {
		width: 30%;
		text-align: center;
	}

	.ps_s>input {
		width: 50%;
	}

	.ps_s_right {
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ps_s_right>image {
		width: 16px;
		height: 16px;
	}

	.ps_s_right>span {
		height: 30px;
		width: 60px;
		line-height: 30px;
		text-align: center;
		background-color: rgba(192, 192, 192, 0.5);
		opacity: 0.1;
	}

	.ps_s_right>button {
		height: 30px;
		width: 60px;
		margin: 0;
		padding: 0;
		border: 0px solid transparent;
		outline: none;
		line-height: 30px;
		text-align: center;
		background-color: rgba(192, 192, 192, 0.1);
	}

	.register_item_right {
		width: 70%;
	}

	.send {
		color: #1063B7;
		background-color: rgba(255, 255, 255, 0.1) !important;
	}

	.btm {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		background-color: #0066A1;
		border-radius: 6px;
		margin-top: 50px;
		text-align: center;
		line-height: 50px;
		color: #FFFFFF;
		font-size: 16px;
	}
</style>
