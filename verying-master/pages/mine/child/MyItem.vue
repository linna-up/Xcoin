<template>
	<view class="myItem" @click="toJump">
		<view class="myItem_left">
			<image :src="list.img"></image>
		</view>
		<view class="myItem_center">
			{{list.text}}
		</view>
		<view class="myItem_right" >
			<image src="../../../static/img/mine/rights.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MyItem",
		props: {
			list:null,
			is_real:""
		},
		methods: {
			toJump() {
				if(this.list.jump === "../../../../Real/Real") {
					if(this.is_real === "1") {
						uni.showToast({
							title:"已认证",
							icon:"none"
						})
						return;
					}else {
						uni.navigateTo({
							url:this.list.jump
						});
					}
				}else if(this.list.jump === "pay") {
					uni.scanCode({
					    success: function (res) {
					        console.log('条码类型：' + res.scanType);
					        console.log('条码内容：' + res.result);
							if(res.result.search('wxp://') === 0) {
								uni.showToast({
									title:"请扫描支付宝收款码",
									icon:'none'
								})
								return;
							}
							uni.navigateTo({
								url:'../../../../Pay/Pay?result='+res.result
							})
					    }
					});
				}else {
					uni.navigateTo({
						url:this.list.jump
					});
				}
			}
		}
	}
</script>

<style scoped>
	.myItem {
		width: 100%;
		height: 55px;
		line-height: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 0.5px solid #0CF2FF;
		color: #0CF2FF!important;
	}
	.myItem_left {
		width: 20%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.myItem_left>image {
		width: 30px;
		height: 30px;
	}
	.myItem_center {
		width: 70%;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
	}
	.myItem_right {
		width: 10%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.myItem_right>image {
		width: 16px;
		height: 16px;
	}
</style>
