<template>
	<view class="login" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="login_top">
			<image src="../../static/img/login/login.png"></image>
		</view>
		<view class="login_btm">
			<view class="login_panel">
				<view class="login_panel_title">
					<view>{{i18n.Holle}}</view>
					<view>{{i18n.Welcome}} XCOIN</view>
					<view class="switchBox" @click="Switch">
						中&nbsp;<view class="switch">
							<view class="switchCon" :style="{left:left?'0':'14px'}"></view>
						  </view>&nbsp;En
					</view>
				</view>
				<view class="login_name">
					<view class="login_name_img">
						<image src="../../static/img/tabbar/mine.png"></image>
					</view>
					<input type="text" :placeholder="i18n.Account" placeholder-style="color:#0066A1" v-model="username" />
				</view>
				<view class="login_ps">
					<view class="login_name_img">
						<image src="../../static/img/tabbar/ps.png"></image>
					</view>
					<input type="password" :placeholder="i18n.Password" placeholder-style="color:#0066A1" v-model="password" />
				</view>
			</view>
			<view class="login_btn">
				<view class="toLogin" @click="toLogin()">{{i18n.Login}}</view>
			</view>
			<view class="forandreg">
				<span class="for" @click="toForget">{{i18n.Forgot}}</span>
				<span class="reg" @click="toReg">{{i18n.Register}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	import {login} from '../../commonjs/intercept.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				username: '',
				password: '',
				left: true
			}
		},
		onLoad() {
			console.log(uni.getStorageSync("session_id"));
		},
		computed:{
			i18n(){
				return this.$t('message').mine.login
			}
		},
		methods: {
			toReg() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			toForget() {
				uni.navigateTo({
					url: '../forgetPS/forgetPS'
				})
			},
			toLogin() {
				if(this.username === null || this.username === '' ||this.username === undefined) {
					uni.showToast({
						title: this.$t('message').mine.login.NameInput,
						icon:'none',
						duration: 1500
					})
				}else if(this.password === null || this.password === '' ||this.password === undefined) {
					uni.showToast({
						title: this.$t('message').mine.login.PasswordInput,
						icon:'none',
						duration: 1500
					})
				}
				console.log("***********");
				uni.request({
					url:api.login,
					data: {
						username: this.username,
						password: this.password
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "post",
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							uni.showToast({
								title: res.data.msg,
								icon:'none',
								duration: 1500
							})
							/* uni.setStorage({
								key: 'session_id',
								data: res.data.result.session_id,
								success: function() {
									console.log(res.data.result.session_id);
									console.log('session_id save');
								}
							}) */
							uni.setStorageSync('session_id', res.data.result.session_id);
							/* uni.setStorageSync('session_id',res.data.result.session_id);
							getApp().globalData.session_id =res.data.result.session_id; */
							/* uni.setStorage({
								key: 'uid',
								data: res.data.result.uid,
								success: function() {
									console.log(res.data.result.uid);
									console.log('uid save');
								}
							}) */
							uni.setStorageSync('uid',res.data.result.uid);
							uni.switchTab({
								url:'../index/index'
							})
							return;
						}else {
							uni.showToast({
								title: res.data.msg,
								icon:'none',
								duration: 1500
							})
							this.password = '';
						}
					}
				});
			},
			Switch(){
				this.left = !this.left
				console.log(this._i18n);
				this.$i18n.locale = this.left ? 'zh-CN' : 'en-US'
			}
		}
	}
</script>

<style scoped>
	.switchBox{
		position: absolute;
		top: 10px;
		right: -8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.switch{
		width: 32px;
		height: 18px;
		background-color: #0062A1;
		border-radius: 15px;
		position: relative;
		
	}
	.switchCon{
		position: absolute;
		top: 0;
		left: 0;
		background-color: #00ACAE;
		width: 18px;
		height: 18px;
		border-radius: 15px;
		transition: all .2s linear;
	}
	.login {
		background-color: #F2F2F2;
	}

	.login_top {
		width: 100%;
		height: 40%;
		background-image: url("../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login_top>image {
		width: 120px;
		height: 100px;
	}

	.login_btm {
		width: 80%;
		height: 60%;
		border-radius: 8px;
		margin: 0 auto;
		position: absolute;
		top: 30%;
		left: 10%;
	}

	.login_panel {
		width: 100%;
		height: 63%;
		background-color: #FFFFFF;
		border-radius: 8px;
	}

	.login_panel_title {
		width: 80%;
		height: 60px;
		line-height: 30px;
		margin: 0 auto;
		padding-top: 30px;
		padding-bottom: 50px;
		font-weight: 800;
		position: relative;
	}

	.login_name {
		width: 80%;
		height: 60px;
		margin: 0 auto;
		border-bottom: 1px solid #1A618A;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login_name_img {
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.login_name_img>image {
		width: 20px;
		height: 20px;
	}

	.login_name>input {
		height: 60px;
		line-height: 60px;
	}

	.login_ps {
		width: 80%;
		height: 60px;
		margin: 0 auto;
		border-bottom: 1px solid #1A618A;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login_ps>input {
		height: 60px;
		line-height: 60px;
	}

	.login_btn {
		width: 80%;
		height: 50px;
		margin: 0 auto;
		padding-top: 80px;
	}

	.toLogin {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		background-color: #0066A1;
		border-radius: 32px;
		text-align: center;
		line-height: 50px;
		color: #FFFFFF;
	}

	.forandreg {
		padding-top: 50px;
		font-size: 12px;
		color: #0066A1;
		text-align: center;
	}

	.for {
		padding-right: 12px;
		border-right-style: solid;
		border-right-color: #BEBEBE;
	}

	.reg {
		padding-left: 12px;
	}
</style>
