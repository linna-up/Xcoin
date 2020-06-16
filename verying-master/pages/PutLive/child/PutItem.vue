<template>
	<view class="box">
		<view class="box_title">
			<view class="box_title_left">
				<image :src="getImg"></image>
				<span class="text">{{getTypeText}}</span>
			</view>
			<view class="box_title_right">
				<view v-if="getActive">
					<label class="che">
						<checkbox value="cb" checked="true" disabled="" color="#0B6294" style="transform:scale(0.6)" />
					</label>
					<span class="acti">已激活</span>
				</view>
				<view v-else>
					<label class="che">
						<checkbox value="cb" @click="toActive"  color="#0B6294" style="transform:scale(0.6)" />
					</label>
					<span style="color: #CCCCCC;">未激活</span>
				</view>
			</view>
		</view>
		
		<view class="box_btm">
			<view class="box_btm_left">
				<view class="box_btm_left_top">{{getName}}</view>
				<view class="box_btm_left_btm">{{getCode}}</view>
			</view>
			<view class="box_btm_right" >
				<image  :src="ewmImg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {api} from '../../../api/api.js'
	export default {
		name: "PutItem",
		props: {
			list:null
		},
		data() {
			return {
				active:false
			}
		},
		methods: {
			toActive() {
				if(this.list.hasOwnProperty("is_open_wx")) {
					this.Active("wx");
					uni.$emit("break");
					return;
				}else if(this.list.hasOwnProperty("is_open_alipay")) {
					this.Active("alipay");
					uni.$emit("break");
					return;
				}else if(this.list.hasOwnProperty("is_open_bank")) {
					this.Active("bank");
					uni.$emit("break");
					return;
				}
			},
			Active(type) {
				uni.request({
					url: api.active,
					method: "post",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id:uni.getStorageSync('session_id'),
						set_type:type,
						open_status:1
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
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					},
				})
			}
		},
		computed: {
			getTypeText() {
				if(this.list.hasOwnProperty("is_open_wx")) {
					return '微信'
				}else if(this.list.hasOwnProperty("is_open_alipay")) {
					return '支付宝'
				}else if(this.list.hasOwnProperty("is_open_bank")) {
					return this.list.bank_name;
				}
			},
			getImg() {
				if(this.list.hasOwnProperty("is_open_wx")) {
					return '../../../../../static/img/tran/wx.png'
				}else if(this.list.hasOwnProperty("is_open_alipay")) {
					return '../../../../../static/img/tran/zfb.png'
				}else if(this.list.hasOwnProperty("is_open_bank")) {
					return '../../../../../static/img/tran/yl.png'
				}
			},
			getName() {
				if(this.list.hasOwnProperty("is_open_wx")) {
					return this.list.wx_name;
				}else if(this.list.hasOwnProperty("is_open_alipay")) {
					return this.list.alipay_name;
				}else if(this.list.hasOwnProperty("is_open_bank")) {
					return this.list.bank_names;
				}
			},
			getCode() {
				if(this.list.hasOwnProperty("is_open_wx")) {
					return this.list.wx;
				}else if(this.list.hasOwnProperty("is_open_alipay")) {
					return this.list.alipay;
				}else if(this.list.hasOwnProperty("is_open_bank")) {
					return this.list.bank_code;
				}
			},
			getActive() {
				if(this.list.hasOwnProperty("is_open_wx")) {
					if(this.list.is_open_wx === "0") {
						return false;
					}else {
						return true;
					}
				}else if(this.list.hasOwnProperty("is_open_alipay")) {
					if(this.list.is_open_alipay === "0") {
						return false;
					}else {
						return true;
					}
				}else if(this.list.hasOwnProperty("is_open_bank")) {
					if(this.list.is_open_bank === "0") {
						return false;
					}else {
						return true;
					}
				}
			},
			ewmImg() {
				if(this.list.hasOwnProperty("is_open_bank")) {
					return "";
				}else if(this.list.hasOwnProperty("is_open_alipay")) {
					return this.list.alipay_img;
				}else if(this.list.hasOwnProperty("is_open_wx")) {
					return this.list.wx_img;
				}
			}
		}
		//0:支付宝  1:微信  2:银行卡
	}
</script>

<style scoped>
	.box {
		width: 100%;
		height: 100px;
		border-bottom: 6px solid #009EAA;
		font-size: 14px;
	}

	.box_title {
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.box_title>view {
		width: 45%;
	}

	.box_title_left {
		display: flex;
		align-items: center;
	}

	.box_title_left>image {
		width: 16px;
		height: 16px;
	}

	.text {
		width: 80%;
		padding-left: 8px;
	}

	.box_title_right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.acti {
		color: #0B6294;
	}
	/* .che {
		width: 14px;
		height: 14px;
	} */
	.box_btm {
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		margin-top: 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.box_btm>view {
		width: 45%;
	}
	.box_btm_left {
		height: 100%;
	}
	.box_btm_left_top {
		height: 18px;
		line-height: 18px;
		color: #808080;
	}
	.box_btm_left_btm {
		height: 18px;
		line-height: 18px;
	}
	.box_btm_right {
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 16px;
	}
	.box_btm_right>image {
		width: 25px;
		height: 25px;
	}
</style>
