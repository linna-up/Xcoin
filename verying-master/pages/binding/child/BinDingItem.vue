<template>
	<view class="bindingitem" @click="toJump(list.url)">
		<view class="bindingitem_left">
			<image :src="getImg"></image>
		</view>
		<view class="bindingitem_right">
			{{getTypeText}}
			<view class="img">
				<image src="../../../static/img/mine/right.png" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"BinDingItem",
		props: {
			list:null
		},
		methods: {
			toJump(url) {
				uni.navigateTo({
					url:url
				})
			}
		},
		computed:{
			getTypeText() {
				if(this.list.type === 0) {
					return '支付宝'
				}else if(this.list.type === 1) {
					return '微信'
				}else if(this.list.type === 2) {
					return '银行卡'
				}else if(this.list.type === 3) {
					return 'USDT地址'
				}
			},
			getImg() {
				if(this.list.type === 0) {
					return '../../../../../static/img/putlive/zfb.png'
				}else if(this.list.type === 1) {
					return '../../../../../static/img/putlive/wx.png'
				}else if(this.list.type === 2) {
					return '../../../../../static/img/putlive/yl.png'
				}else if(this.list.type === 3) {
					return '../../../../../static/img/putlive/usdt.png'
				}
			}
		}
	}
</script>

<style scoped>
	.bindingitem {
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		display: flex;
		font-size: 15px;
	}
	.bindingitem_left {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bindingitem_left>image {
		width: 18px;
		height: 18px;
	}
	.bindingitem_right {
		flex: 1;
		height: 40px;
		line-height: 40px;
		text-indent: 10px;
		border-bottom: 0.5px solid #E6E6E6;
		position: relative;
	}
	.img{
		width: 30px;
		height: 40px;
		position: absolute;
		right: 0px;
		top: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.img>image {
		width: 16px;
		height: 16px;
	}
</style>
