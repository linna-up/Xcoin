<template>
	<view class="password" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			{{i18n.Password}}
		</view>
		<view class="box">
			<view class="box_left">
				<view class="box_left_left">
					<image src="../../static/img/mine/pwd_icon.png"></image>
				</view>
				<view class="box_left_right">{{i18n.CurrentPw}}</view>
			</view>
			<view class="box_right">
				<input type="password" v-model="psd" :placeholder="i18n.InputPw" />
			</view>
		</view>
		<view class="box">
			<view class="box_left">
				<view class="box_left_left">
					<image src="../../static/img/mine/pwd_icon.png"></image>
				</view>
				<view class="box_left_right">{{i18n.Update}}</view>
			</view>
			<view class="box_right">
				<input type="password" v-model="upsd" :placeholder="i18n.NewPw" />
			</view>
		</view>
		<view class="box">
			<view class="box_left">
				<view class="box_left_left">
					<image src="../../static/img/mine/pwd_icon.png"></image>
				</view>
				<view class="box_left_right">{{i18n.ConfirmPw}}</view>
			</view>
			<view class="box_right">
				<input type="password" v-model="upsds" :placeholder="i18n.InputAgain" />
			</view>
		</view>
		<button class="btm" :disabled="active" @click="resetPsd">{{i18n.Submit}}</button>
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
				active: false,
				psd: '',
				upsd: '',
				upsds: ''
			}
		},
		computed:{
			i18n(){
				return this.$t('message').PasswordUpdate
			}
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			resetPsd() {
				if (this.psd === null || this.psd === '' || this.psd === undefined) {
					uni.showToast({
						title: this.$t('message').PasswordUpdate.InputOld,
						icon: "none",
						duration: 1500
					})
					return;
				} else if (this.upsd === null || this.upsd === '' || this.upsd === undefined) {
					uni.showToast({
						title: this.$t('message').PasswordUpdate.InputNew,
						icon: "none",
						duration: 1500
					})
					return;
				} else if (this.upsds === null || this.upsds === '' || this.upsds === undefined) {
					uni.showToast({
						title: this.$t('message').PasswordUpdate.AgainInputNew,
						icon: "none",
						duration: 1500
					})
					return;
				} else if (this.upsds != this.upsd) {
					uni.showToast({
						title: this.$t('message').PasswordUpdate.Consistent,
						icon: "none",
						duration: 1500
					})
					return;
				}
				uni.request({
					url: api.reset_pwd,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						PassWord: this.psd,
						newPassWord: this.upsd,
						cnewPassWord: this.upsds
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code === "success") {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								duration: 1500
							})
							this.psd = "";
							this.upsds = "",
								this.upsd = "";
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
								duration: 1500
							})
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
