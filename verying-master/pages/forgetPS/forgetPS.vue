<template>
	<view class="forgetPS" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="title" :style="{paddingTop:top+'px'}">
			<view class="title_left"  :style="{top:top}" @click="back">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			找回密码
		</view>
		<view class="register_item">
			<view class="register_item_left">手机号</view>
			<input type="tell" v-model="tell" />
		</view>
		<!-- <view class="ps_s">
			<view class="ps_s_left">验证码</view>
			<input type="text" v-model="yzm" />
			<view class="ps_s_right">
				<span>1254</span>
			</view>
		</view> -->
		<view class="ps_s">
			<view class="ps_s_left">手机验证码</view>
			<input type="number" v-model="yzm" />
			<view class="ps_s_right">
				<span class="send" @click="sendYzm">{{btn}}</span>
			</view>
		</view>
		<view class="ps_s">
			<view class="ps_s_left">设置密码</view>
			<input :type="type"  v-model="pwd"/>
			<view class="ps_s_right">
				<image src="../../static/img/reg/show.png" @click="show"></image>
			</view>
		</view>
		<view class="ps_s">
			<view class="ps_s_left">确认密码</view>
			<input :type="type" v-model="pwds" />
			<view class="ps_s_right">
				<image src="../../static/img/reg/show.png" @click="show"></image>
			</view>
		</view>
		<view class="btm" @click="forgetPS">找回密码</view>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth:getApp().globalData.windowWidth,
				windowHeight:getApp().globalData.windowHeight,
				top:getApp().globalData.top,
				tell:"",
				yzm:"",
				pwd:"",
				pwds:"",
				btn: "发送",
				btnActive: false,
				time: 60,
				timer: null,
				count:60,
				type:"password",
				typeActive:true
			}
		},
		methods: {
			show() {
				if(this.typeActive === true) {
					this.type = "text"
					this.typeActive = !this.typeActive;
				}else if(this.typeActive === false) {
					this.type = "password";
					this.typeActive = !this.typeActive;
				}
			},
			back() {
				uni.navigateBack();
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
				uni.request({
					url: api.get_yzm_wj_code,
					data: {
						mobile: this.tell
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(this.tell);
						console.log(res);
						if (res.data.code === "success") {
							this.codeChange();
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
			forgetPS() {
				if(this.tell === "") {
					uni.showToast({
						title:"请输入手机号",
						icon:"none"
					})
					return;
				}else if(this.yzm === "") {
					uni.showToast({
						title:"请输入验证码",
						icon:"none"
					})
					return;
				}else if(this.pwd === "") {
					uni.showToast({
						title:"请输入新密码",
						icon:"none"
					})
					return;
				}else if(this.pwds === "") {
					uni.showToast({
						title:"请再次输入新密码",
						icon:"none"
					})
					return;
				}else if(this.pwds != this.pwd) {
					uni.showToast({
						title:"两次密码不一致",
						icon:"none"
					})
					return;
				}
				uni.request({
					url: api.forget,
					data: {
						mobile: this.tell,
						yzm_code: this.yzm,
						newPassWord: this.pwd
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
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
	}
</script>

<style scoped>
	.forgetPS {
		
	}
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
		background-color: rgba(192,192,192,0.1);
	}
	.register_item_right {
		width: 70%;
	}
	.send {
		color: #1063B7;
		background-color: rgba(255,255,255,0.1)!important;
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
