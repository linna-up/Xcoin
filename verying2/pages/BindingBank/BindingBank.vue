<template>
	<view class="usdt" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/public/back.png" @click="toBack"></image>
		</view>
		<view class="text">{{$t('message').mine.BindingBank.BindBankCard}}</view>
		<scroll-view scroll-y="true" class="scro">
			<view class="addresstext">{{$t('message').mine.BindingBank.Name}}</view>
			<view class="address">
				<input type="text" v-model="username" :placeholder="$t('message').mine.BindingBank.AutoGain" />
			</view>
			<view class="addresstext">{{$t('message').mine.BindingBank.BankCard}}</view>
			<view class="address">
				<input type="number" v-model="account" :placeholder="$t('message').mine.BindingBank.AccountInput" />
			</view>
			<view class="addresstext">{{$t('message').mine.BindingBank.DepositBank}}</view>
			<view class="address">
				<input type="text" v-model="bank" :placeholder="$t('message').mine.BindingBank.BankInput" />
			</view>
			<view class="addresstext">{{$t('message').mine.BindingBank.BankAddress}}</view>
			<view class="address">
				<input type="text" v-model="bank_item" :placeholder="$t('message').mine.BindingBank.BankAddressInput" />
			</view>
			<!-- <view class="texts">添加收款二维码(选填)</view>
			<view class="add">
				<image src="../../static/img/mine/add.png" @click="getImg"></image>
				<image :src="img"></image>
				<image :src="imgs"></image>
			</view> -->
		</scroll-view>
		<view class="btm" @click="updata">{{$t('message').mine.BindingBank.Save}}</view>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				img: "",
				imgs:'',
				username:"",
				account:"",
				bank:"",
				bank_item:""
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				uni.request({
					url: api.info,
					method: "post",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id:uni.getStorageSync('session_id')
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if(res.data.code === "success") {
							this.username = res.data.result.name;
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
			},
			updata() {
				if (this.username === "" || this.username === null || this.username === undefined) {
					uni.showToast({
						title: this.$t('message').mine.BindingBank.NameInput,
						icon: "none"
					})
					return;
				}else if (this.account === "" || this.account === null || this.account === undefined) {
					uni.showToast({
						title: this.$t('message').mine.BindingBank.BankCardInput,
						icon: "none"
					})
					return;
				}else if (this.bank === "" || this.bank === null || this.bank === undefined) {
					uni.showToast({
						title: this.$t('message').mine.BindingBank.BankInput,
						icon: "none"
					})
					return;
				}
				uni.request({
					url: api.updata_pay_live,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id: uni.getStorageSync('session_id'),
						set_type: "bank",
						bank_name: this.bank.toString(),
						bank_code: this.account,
						bank_address: this.bank_item,
						alipay: "",
						alipay_name:"",
						wx: "",
						wx_name: "",
						address: ""
					},
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
							setTimeout(()=>{
								uni.navigateBack();
							},1500)
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
				
			},
			toBack() {
				uni.navigateBack();
			},
			getImg() {
				uni.chooseImage({
					count: 2, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						this.img = res.tempFilePaths[0];
						this.imgs = res.tempFilePaths[1];
					}
					/* uni.uploadFile({
						url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data);
						}
					}); */
				});
			}
		}
	}
</script>

<style scoped>
	.usdt {
		background-color: #1D0F4A;
		position: relative;
		color: #FFFFFF!important;
	}

	.NoticeDetails_top {
		width: 100%;
		height: 40px;
		background-color: #1D0F4A;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}

	.NoticeDetails_top>image {
		width: 16px;
		height: 16px;

	}
	.scro {
		width: 100%;
		height: 70%;
	}

	.text {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-indent: 20px;
		font-size: 25px;
		font-weight: 600;
	}

	.addresstext {
		width: 90%;
		height: 25px;
		line-height: 25px;
		font-size: 16px;
		margin: 0 auto;
		margin-top: 10px;
	}

	.address {
		width: 90%;
		height: 35px;
		line-height: 35px;
		font-size: 18px;
		margin: 0 auto;
		border-bottom: 0.5px solid #E6E6E6;
	}

	.address>input {
		width: 100%;
		height: 100%;
	}

	.texts {
		width: 90%;
		height: 25px;
		line-height: 25px;
		font-size: 16px;
		margin: 0 auto;
		margin-top: 25px;
	}

	.add {
		width: 90%;
		height: 80px;
		margin: 0 auto;
		margin-top: 20px;
	}

	.add>image {
		width: 80px;
		height: 80px;
	}

	.yl {
		width: 90%;
		height: 150px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		background-color: #E7E7E7;
	}

	.yl>image {
		width: 60%;
		height: 150px;
	}
	.btm {
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin: 0 auto;
		font-size: 18px;
		color: #FFFFFF;
		background-color: #0066A1;
		border-radius: 5px;
		position: absolute;
		left: 10%;
		right: 10%;
		bottom: 5%;
	}
</style>
