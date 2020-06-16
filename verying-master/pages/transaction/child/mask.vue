<template>
	<view class="mask" :style="{width:width+'px',height:height+'px'}" >
		<view class="mask_box">
			<view class="mask_title">
				<view class="mask_title_left">
					<view class="mask_title_left_top">{{showType.title}}{{showType.type}}</view>
					<view class="mask_title_left_btm">单价 {{AllList.unit_price}}usdt</view>
				</view>
				<view class="mask_title_right">
					<image :src="showType.img"></image>
				</view>
			</view>
			<view class="maskTab">
				<MaskTab v-for="(item,index) in textList" :key="item" :name="item" :class="{thisactive:activeIndex===index}" @click.native="itemClick(index)"></MaskTab>
			</view>
			<view class="maskInput">
				<input type="number" :placeholder="getTips" v-model="num"/>
				<view class="maskInput_center">{{showType.type}}</view>
				<view class="maskInput_right">
					<view class="maskInput_right_item" v-if="showType.all === 0" @click="allBuySell">全部买入</view>
					<view class="maskInput_right_item" v-else @click="allBuySell">全部售出</view>
				</view>
			</view>
			<view class="maskText">限额: {{AllList.s_money}} - {{AllList.l_money}}</view>
			<view class="maskTextRight">交易数量: {{jiao_shuliang}}{{showType.type}}</view>
			<view class="maskNum">
				<view class="maskNum_text">实付款</view>
				<view class="maskNum_right">{{Number(AllList.unit_price)*Number(num)}}usdt</view>
			</view>
			<view class="maskBtm">
				<view class="maskBtm_text">{{time}}s后自动取消</view>
				<view class="maskBtm_btm" @click="confirmBuySell">下单</view>
			</view>
			<view class="chose">
				<image src="../../../static/img/transaction/chose.png" @click.stop="ChoseMask"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {api} from '../../../api/api.js'
	import MaskTab from './MaskTab.vue'
	export default {
		name:"mask",
		props: {
			showType:null,
			AllList:null
		},
		data() {
			return {
				width:getApp().globalData.windowWidth,
				height:getApp().globalData.windowHeight,
				num:"",
				jiao_shuliang:0.00,
				textList:['按数量'+this.showType.title],
				activeIndex:0,
				time:60,
				tips:"",
				timeing:null
			}
		},
		/* beforeMount:function() {
			this.changeTips();
		}, */
		mounted:function() {
			this.timer();
		},
		/* beforeUpdate:function() {
			this.changeTips();
		}, */
		beforeDestroy: () => {
			/* clearInterval(this.timeing); */
			console.log("销毁");
		},
		components: {
			MaskTab
		}, 
		watch:{
			num(newVal) {
				this.jiao_shuliang = newVal;
			}
		},
		methods: {
			confirmBuySell() {
				uni.request({
					url: api.confirm_jiaoyi,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id: uni.getStorageSync('session_id'),
						buyhelp__id:this.AllList.id,
						num:this.num
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(this.num);
						console.log(res);
						if (res.data.code === "success") {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							setTimeout(()=>{
								uni.$emit("ChoseMask")
							},1000)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
				
					}
				})
			},
			allBuySell() {
				if(Number(this.AllList.sy_money)>Number(this.AllList.l_money)) {
					this.num = this.AllList.l_money;
				}else {
					this.num = this.AllList.sy_money;
				}
			},
			itemClick(index) {
				this.activeIndex = index;
			},
			ChoseMask() {
				uni.$emit("ChoseMask")
			},
			mydestroy() {
				clearInterval(this.timeing);
			},
			timer() {
				this.timeing = setInterval(()=>{
					this.time--;
					if(this.time === 1) {
						clearInterval(this.timeing);
						uni.$emit("ChoseMask")
						return;
					}
				},1000);
			}
			/* changeTips() {
				this.tips = "";
				if(this.showType.type === 0) {
					this.tips += "请输入出售数量"
				}else if(this.showType.type === 1) {
						this.tips += "请输入出售数量"
				}
			} */
		},
		computed: {
			getTips() {
				return "请输入"+this.showType.title+"数量";
			}/* ,
			getImg(){
				console.log(this.showType);
				if(this.showType.coinType === 0) {
					return '../../../static/img/home/USDT.png';
				}else if(this.showType.coinType === 1) {
					return '../../../static/img/logo/XEV.png';
				}
			} */
		}
	}
</script>

<style scoped>
	.mask{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(127,127,127,0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;
	}
	.mask_box {
		width: 80%;
		height:52vh;
		border-radius: 10px;
		background-color: #FFFFFF;
	}
	.mask_title {
		width: 100%;
		height: 100px;
		background-color: #0066A1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mask_title_left {
		flex: 1;
		height: 100px;
		color: #FFFFFF;
		padding-left: 16px;
	}
	.mask_title_left_top {
		height: 55px;
		line-height: 55px;
		font-size: 20px;
	}
	.mask_title_left_btm {
		height: 45px;
		height: 45px;
		font-size: 16px;
	}
	
	.mask_title_right {
		width: 30%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mask_title_right>image {
		width: 50px;
		height: 50px;
	}
	.maskTab {
		width: 80%;
		height: 40px;
		line-height: 40px;
		margin-left: 16px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #F6F6F6;
	}
	.maskTab>view {
		width: 45%;
	}
	.thisactive {
		color: #0F5F90;
		border-bottom: 1px solid #0F5F90;
	}
	.maskInput {
		width: 95%;
		height: 60px;
		line-height: 60px;
		margin: 0 auto;
		border: 1px solid #CACACA;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.maskInput>input {
		width: 55%;
		height: 60px;
		text-indent: 16px;
	}
	.maskInput_center {
		width: 15%;
		height: 60px;
		font-size: 16px;
		text-align: center;
	}
	.maskInput_right {
		width: 30%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.maskInput_right_item {
		height: 16px;
		width: 100%;
		color: #3186BA;
		font-size: 16px;
		line-height: 16px;
		text-align: center;
		border-left: 1px solid #C9C9C9;
	}
	.maskText {
		width: 95%;
		height: 30px;
		line-height: 30px;
		margin:  0 auto;
		font-size: 16px;
		color: #8B9298;
	}
	.maskTextRight {
		width: 95%;
		height: 30px;
		line-height: 30px;
		margin:  0 auto;
		font-size: 12px;
		color: #8B9298;
		text-align: right;
	}
	.maskNum {
		width: 95%;
		height: 30px;
		line-height: 30px;
		margin:  0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.maskNum>view {
		flex:1;
	}
	.maskNum_text {
		font-size: 16px;
		color: #8B9298;
	}
	.maskNum_right {
		font-size: 18px;
		color: #02629E;
		text-align: right;
	}
	.maskBtm {
		width: 95%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #FFFFFF;
		margin-top: 8px;
	}
	.maskBtm>view {
		width: 45%;
		text-align: center;
		font-size: 16px;
	}
	.maskBtm_text {
		background-color: #96ABBC;
		border-radius: 6px;
	}
	.maskBtm_btm {
		background-color: #0066A1;
		border-radius: 6px;
	}
	.chose {
		width: 95%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 16px;
	}
	.chose>image {
		width: 30px;
		height: 30px;
	}
</style>
