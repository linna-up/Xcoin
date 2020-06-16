<template>
	<view class="top">
		<view id="navbar" :style="{paddingTop:top+'px'}">
			<view class="left">
				<image src="../../../static/img/public/back.png" @click="toBack"></image>
			</view>
			<view class="center">
				<!-- <span>订单列表</span> -->
			</view>
			<view class="right">
				<!-- <image src="../../static/img/public/mx.png" @click="toOrderList"></image> -->
			</view>
		</view>
		<view class="btm" :style="{height:(140 -top -44)+'px'}">
			<view class="btm_left">
				<view class="btm_left_top">{{list.status_name}}</view>
				<view class="btm_left_btm" v-if="list.end_time_text != ''">{{list.end_time_text}}{{formatSeconds}}</view>
			</view>
			<view class="btm_right" @click="toTell" v-if="status != '0'">
				<image src="../../../static/img/ass/lx.png"></image>
				<view>联系对方</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "OrderTitle",
		props: {
			list: {},
			status:""
		},
		data() {
			return {
				top: getApp().globalData.top,
				time:0
			}
		},
		created() {
			setInterval(()=>{
				if(this.list.end_time != 0) {
					this.list.end_time--;
					this.time = this.list.end_time;
				}
			},1000)
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			toTell() {
				/* alipay */
				/* if(this.list.buy_type === 2) {
					uni.makePhoneCall({
					    phoneNumber: this.list.cuser_phone 
					});
				}else if(this.list.buy_type === 1) {
					uni.makePhoneCall({
					    phoneNumber: this.list.buser_phone 
					});
				} */
				uni.makePhoneCall({
				    phoneNumber: this.list.contact_phone 
				});
			}
		},
		computed:{
			formatSeconds() {
			
			    var theTime = parseInt(this.time);// 秒
			    var middle= 0;// 分
			    var hour= 0;// 小时
			
			    if(theTime > 60) {
			        middle= parseInt(theTime/60);
			        theTime = parseInt(theTime%60);
			        if(middle> 60) {
			            hour= parseInt(middle/60);
			            middle= parseInt(middle%60);
			        }
			    }
			    var result = ""+parseInt(theTime)+"秒";
			    if(middle > 0) {
			        result = ""+parseInt(middle)+"分"+result;
			    }
			    if(hour> 0) {
			        result = ""+parseInt(hour)+"小时"+result;
			    }
			    return result;
			}
		}
	}
</script>

<style scoped>
	.top {
		width: 100%;
		height: 140px;
		background-color: green;
	}

	#navbar {
		width: 100vw;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left,
	.right {
		width: 60px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left>image {
		width: 18px;
		height: 18px;
	}

	.right>image {
		width: 18px;
		height: 18px;
	}

	.center {
		flex: 1;
		height: 44px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center>span {
		font-size: 16px;
	}

	.nav {
		width: 98%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		border-bottom: 0.5px solid #7149A7;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btm {
		width: 80%;
		height: 90px;
		margin: 0 auto;
		display: flex;
		color: #FFFEFE;
	}

	.btm_left {
		width: 70%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.btm_left_top {
		width: 100%;
		height: 60%;
		display: flex;
		align-items: center;
		font-size: 25px;
	}

	.btm_left_btm {
		width: 100%;
		height: 40%;
		display: flex;
		align-items: center;
		font-size: 16px;
	}

	.btm_right {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.btm_right>image {
		width: 30px;
		height: 30px;
	}

	.btm_right>view {
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		text-align: center;
	}
</style>
