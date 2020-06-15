<template>
	<view class="Transfer" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/transfer/back_.png" @click="toBack"></image>
		</view>
		<view class="Transfer_title">{{i18n.Exchange}}</view>
		<view class="Transfer_box">
			<view class="Transfer_box_left">
				<view class="Transfer_box_left_center">
					<view class="Transfer_box_left_center_top"></view>
					<view class="Transfer_box_left_center_center"></view>
					<view class="Transfer_box_left_center_btm"></view>
				</view>
			</view>
			<view class="Transfer_box_center">
				<view class="Transfer_box_center_top">
					<view class="left">{{i18n.From}}</view>
					<view class="right">{{i18n.XCoin}}{{i18n.Usable}}</view>
				</view>
				<view class="Transfer_box_center_btm">
					<view class="left">{{i18n.To}}</view>
					<view class="right" @click="showMask">
						{{toArr[activeIndex]}}
						<view class="mask" v-if="isShow">
							<view class="mask_item" @click.stop="changeIndex(0)">{{toArr[0]}}</view>
							<view class="mask_item" @click.stop="changeIndex(1)">{{toArr[1]}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="Transfer_box_right">
				<image src="../../static/img/tabbar/transaction_a.png"></image>
			</view>
		</view>
		<view class="coin_text">{{i18n.Type}}</view>
		<view class="coin_type">
			<view class="coin_left">{{i18n.XCoin}}</view>
			<view class="coin_img">
				<image src="../../static/img/mine/right.png"></image>
			</view>
		</view>
		<view class="coin_text">{{i18n.Nubmer}}</view>
		<view class="Transfer_inputBox">
			<view class="Transfer_inputBox_input">
				<input type="number" v-model="num" :placeholder="i18n.InputNumber" />
			</view>
			<view class="Transfer_inputBox_right">
				<view class="Transfer_inputBox_right_left">{{i18n.XCoin}}</view>
				<view class="Transfer_inputBox_right_right" @click="all">{{i18n.All}}</view>
			</view>
		</view>
		<view class="keyong">{{i18n.Usable}} {{float_use}}<span></span>{{i18n.XCoin}}</view>
		<view class="tips">
			{{i18n.Text}}
		</view>
		<view class="btm" @click="trans">{{i18n.Exchange}}</view>
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
				num: '',
				float_use:"",
				isShow:false,
				activeIndex:0,
				toArr:[
					this.$t('message').transfer.Voting,
					this.$t('message').transfer.Mall,
				]
			}
		},
		onShow() {
			this.getInfo()
		},
		computed:{
			i18n(){
				return this.$t('message').transfer
			}
		},
		methods: {
			showMask() {
				this.isShow = !this.isShow;
			},
			changeIndex(index) {
				this.activeIndex = index;
				this.isShow = !this.isShow;
			},
			toBack() {
				uni.navigateBack();
			},
			all() {
				this.num = this.float_use;
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
							this.float_use = res.data.result.xcoin_use;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			},
			trans() {
				if (this.num === '') {
					uni.showToast({
						title: this.$t('message').transfer.Roll,
						icon: "none"
					})
					return;
				}
				if(this.activeIndex === 0) {
					uni.request({
						url: api.exchange,
						data: {
							uid: this.uid,
							session_id: this.session_id,
							amount: this.num
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								/* this.allList = res.data.result; */
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
								this.getInfo();
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.activeIndex === 1) {
					uni.request({
						url: api.exchangejifen,
						data: {
							uid: this.uid,
							session_id: this.session_id,
							amount: this.num
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
								this.getInfo();
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
	}
</script>

<style scoped>
	.Transfer {}

	.NoticeDetails_top {
		width: 100%;
		height: 40px;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}

	.NoticeDetails_top>image {
		width: 16px;
		height: 16px;

	}

	.Transfer_title {
		width: 90%;
		height: 70px;
		line-height: 70px;
		margin: 0 auto;
		font-size: 25px;
	}

	.Transfer_box {
		width: 90%;
		height: 81px;
		margin: 0 auto;
		font-size: 18px;
		border: 1px solid #E8EBED;
		display: flex;
	}

	.Transfer_box_left {
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.Transfer_box_left_center {
		width: 8px;
		height: 50px;
		display: flex;
		flex-direction: column;
	}

	.Transfer_box_left_center_top {
		width: 8px;
		height: 8px;
		background-color: #0068F7;
		border-radius: 50%;
	}

	.Transfer_box_left_center_center {
		width: 8px;
		height: 34px;
		background-image:url(../../static/img/transfer/slh.png);
		background-size: 100% 100%;
	}

	.Transfer_box_left_center_btm {
		width: 8px;
		height: 8px;
		background-color: #E33E62;
		border-radius: 50%;
	}

	.Transfer_box_center {
		width: 70%;
	}

	.Transfer_box_center_top,
	.Transfer_box_center_btm {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
	}
	.Transfer_box_center_btm {
		position: relative!important;
	}

	.Transfer_box_center_top {
		border-bottom: 1px solid #E8EBED;
	}

	.left {
		width: 10%;
		font-size: 16px;
		color: #8A9FAA;
	}

	.right {
		width: 90%;
		text-align: center;
		font-size: 17px;
		position: relative;
	}

	.Transfer_box_right {
		width: 20%;
		background-color: #F7F6FB;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Transfer_box_right>image {
		width: 25px;
		height: 25px;
	}

	.coin_text {
		width: 90%;
		height: 16px;
		line-height: 16px;
		font-size: 15px;
		margin: 0 auto;
		padding-top: 25px;
	}

	.coin_type {
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		padding-top: 8px;
		border-bottom: 1px solid #E8EBED;
		display: flex;
	}

	.coin_left {
		flex: 1;
	}

	.coin_img {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.coin_img>image {
		width: 20px;
		height: 20px;
	}

	.Transfer_inputBox {
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		padding-top: 8px;
		border-bottom: 0.8px solid #155E91;
		display: flex;
	}

	.Transfer_inputBox_input {
		width: 70%;
	}

	.Transfer_inputBox_input>input {
		width: 100%;
		height: 100%;
	}

	.Transfer_inputBox_right {
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}

	.Transfer_inputBox_right>view {
		width: 50%;
		height: 20px;
		line-height: 20px;
		text-align: center;
	}

	.Transfer_inputBox_right_left {
		color: #889FAE;
		border-right: 1px solid #C7CED4;
	}

	.keyong {
		width: 90%;
		height: 25px;
		line-height: 25px;
		font-size: 16px;
		margin: 0 auto;
		color: #C7CED4;
	}

	.keyong>span {
		width: 100px;
		display: inline-block;
	}

	.tips {
		width: 90%;
		line-height: 20px;
		font-size: 15px;
		margin: 0 auto;
		color: #8BA0AC;
		background-color: #F7F6FB;
		margin-top: 30px;
		padding: 10px;
		padding-top: 16px;
		padding-bottom: 16px;
	}

	.btm {
		width: 90%;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		border-radius: 8px;
		color: #FFFFFF;
		background-color: #0067CE;
		position: absolute;
		text-align: center;
		left: 5%;
		right: 5%;
		bottom: 40px;
	}
	.mask {
		width: 100%;
		height: 82px;
		position: absolute;
		top: 40px;
		left: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 16px;
		background-color: rgb(204, 204, 204, 0.8);
	}
	.mask>view {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-bottom: 1px solid #C7CED4;
	}
</style>
