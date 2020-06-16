<template>
	<view class="live"  :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/notice/back.png" @click="toBack"></image>
		</view>
		<view class="text">收款方式</view>
		<!-- <Item v-show="allList.is_open_alipay != null" :list="zfb" ></Item>
		<Item v-show="allList.is_open_wx != null" :list="wx" ></Item>
		<Item v-show="allList.is_open_bank != null" :list="yl"></Item> -->
		<UItem v-show="allList.is_open_usdt != null" :list="usdt" ></UItem><!-- usdt -->
		<view class="btm" @click="toBinding">绑定</view>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	
	import Item from './child/PutItem.vue'
	import UItem from './child/UsdtItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				allList:{}
			}
		},
		onLoad() {
			this.getUserPayList();
			 uni.$on('break',function(data){
			        console.log('监听到事件来自 update ，携带参数 msg 为：' );
			    })
		},
		onShow() {
			this.getUserPayList();
		},
		methods: {
			break() {
				this.getUserPayList();
			},
			toBack() {
				uni.navigateBack();
			},
			toBinding() {
				uni.navigateTo({
					url:'../binding/binding'
				})
			},
			getUserPayList() {
				uni.request({
					url: api.user_pay_list,
					method: "post",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id:uni.getStorageSync('session_id')
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							this.allList = res.data.list;
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
		components: {
			Item,
			UItem
		},
		computed: {
			zfb() {
				return {
					alipay_name:this.allList.alipay_name,
					alipay:this.allList.alipay,
					alipay_img:this.allList.alipay_img,
					is_open_alipay:this.allList.is_open_alipay
				}
			},
			wx() {
				return {
					wx:this.allList.wx,
					wx_name:this.allList.wx_name,
					wx_img:this.allList.wx_img,
					is_open_wx:this.allList.is_open_wx
				}
			},
			yl() {
				return {
					bank_code:this.allList.bank_code,
					bank_name:this.allList.bank_name,
					bank_names:this.allList.bank_names,
					is_open_bank:this.allList.is_open_bank
				}
			},
			usdt() {
				return {
					wallet_address:this.allList.wallet_address,
					usdt_img:this.allList.usdt_img,
					is_open_usdt:this.allList.is_open_usdt
				}
			}
		}
	}
</script>

<style scoped>
	.live {
		position: relative;
	}
	.NoticeDetails_top {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}
	.NoticeDetails_top>image {
		width: 16px;
		height: 16px;
		
	}
	.text {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-indent: 20px;
		font-size: 25px;
		font-weight: 600;
		border-bottom: 6px solid #009EAA;
	}
	.btm {
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin: 0 auto;
		font-size: 18px;
		color: #FFFFFF;
		background-color: #009EAA;
		border-radius: 5px;
		position: absolute;
		left: 10%;
		right: 10%;
		bottom: 10%;
	}
</style>
