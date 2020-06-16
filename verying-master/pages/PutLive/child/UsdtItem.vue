<template>
	<view class="box">
		<view class="box_title">
			<view class="box_title_left">
				<image src="../../../static/img/tran/USDT.png"></image>
				<span class="text">USDT-ERC20</span>
			</view>
			<view class="box_title_right">
				<view v-if="isActive">
					<label class="che">
						<checkbox value="cb" checked="true" disabled color="#0B6294" style="transform:scale(0.6)" />
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
				<view class="box_btm_left_btm">{{list.wallet_address}}</view>
			</view>
			<view class="box_btm_right">
				<image :src="list.usdt_img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {api} from '../../../api/api.js'
	export default {
		name: "UsdtItem",
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
				this.Active("usdt");
				uni.$emit("break");
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
			isActive() {
				if(this.list.is_open_usdt === "0") {
					return false;
				}else if(this.list.is_open_usdt === "1") {
					return true;
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
		height: 40px;
		line-height: 40px;
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
