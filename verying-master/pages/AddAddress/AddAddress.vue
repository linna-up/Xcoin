<template>
	<view class="addAddress" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="back" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/notice/back.png" @click="back"></image>
		</view>
		<view class="addAddress_title">添加USDT地址</view>
		<view class="address_text">地址</view>
		<view class="address_box">
			<input type="text" placeholder="请输入或长按粘贴地址" v-model="address" />
			<view class="address_box_right">
				<image src="../../static/img/collectcoin/scan.png" @click="collectCoin"></image>
			</view>
		</view>
		<view class="address_text">备注</view>
		<view class="address_box">
			<input type="text" v-model="bz" placeholder="USDT (ERC20) Address Name 1" />
		</view>
		<view class="btm" @click="addAddress">添加地址</view>
		<AddMask v-if="maskShow" :address="address" :bz="bz" @close="close"></AddMask>
	</view>
</template>

<script>
	import AddMask from './child/AddressMask.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				maskShow:false,
				address:"",
				bz:""
				
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			addAddress() {
				if(this.address=== '') {
					uni.showToast({
						title:"请输入保存的地址",
						icon:"none"
					})
					return;
				}else if(this.bz=== '') {
					uni.showToast({
						title:"请输入地址备注",
						icon:"none"
					})
					return;
				}
				this.maskShow = !this.maskShow;
			},
			close() {
				this.maskShow = !this.maskShow;
				setTimeout(()=>{
					uni.navigateTo({
						url:'../../../../USDTAddress/USDTAddress'
					})
				},1500)
			},
			collectCoin() {
				uni.scanCode({
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.address = res.result;
					}
				});
			},
			
		},
		components: {
			AddMask
		}
	}
</script>

<style scoped>
	.addAddress {
		
	}
	.back {
		width: 100%;
		margin: 0 auto;
		padding-left: 16px;
		height: 45px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border: 1px solid #F7F7F9;
	}
	
	.back>image {
		width: 18px;
		height: 18px;
	}
	.addAddress_title {
		width: 95%;
		height: 60px;
		line-height: 60px;
		margin: 0 auto;
		font-size: 25px;
		text-indent: 16px;
	}
	.address_text {
		width: 95%;
		height: 20px;
		line-height: 20px;
		margin: 0 auto;
		font-size: 14px;
		text-indent: 8px;
		margin-top: 10px;
	}
	.address_box{
		width: 95%;
		height: 45px;
		line-height: 45px;
		margin: 0 auto;
		font-size: 16px;
		text-indent: 8px;
		border-bottom: 1px solid #A2B0B7;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address_box>input {
		flex: 1;
		height: 45px;
		line-height: 45px;
	}
	.address_box_right {
		justify-content: flex-start;
		width: 40px;
		height: 45px;
	}
	.address_box_right>image {
		width: 20px;
		height: 20px;
	}
	.btm {
		width: 90%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #0066A1;
		border-radius: 8px;
		color: #FFFFFF;
		position: absolute;
		left: 5%;
		right: 5%;
		bottom: 40px;
	}
</style>
