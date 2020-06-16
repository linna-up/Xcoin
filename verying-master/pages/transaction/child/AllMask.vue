<template>
	<view class="mask" :style="{width:width+'px',height:height+'px'}">
		<view class="mask_box">
			<view class="box_title">发布订单</view>
			<view class="box_content">
				<view class="box_content_operation">
					<view class="box_content_operation_left" :class="{buy:activeIndex === 0}" @click="changeIndex(0)">发布出售</view>
					<view class="box_content_operation_right" :class="{sell:activeIndex === 1}" @click="changeIndex(1)">发布购买</view>
				</view>
				<view class="bx_1">
					<view class="bz_text">交易币种</view>
					<view class="bz_right">
						<!-- <picker   :value="index" :range="coinType">@change="bindPickerChange" -->
						<view class="uni-input">
							<!-- <image class="img" :src="img"></image> -->
							X币/usdt
							<!-- {{coinType[index]}} -->
						</view>
						<!-- </picker> -->
					</view>
				</view>
				<view class="bx">
					<input class="price" type="number" placeholder="请输入单价" disabled="true"  v-model="unit_price" />
					<view class="price_right">
						<span>单价</span>
					</view>
				</view>
				<view class="bx">
					<input class="num" type="number" placeholder="请输入数量" v-model="num" />
					<view class="num_right">
						<span class="num_right_left">{{getCoinTypeText}}</span>
						<span class="num_right_right" @click="allBuySell">全部售出</span>
					</view>
				</view>
				<view class="bx">
					<view class="xe">
						<input type="number" placeholder="数量" v-model="s_money"/>
						<view class="xe_center">—</view>
						<input type="number" placeholder="数量" v-model="l_money" />
					</view>
					<view class="num_right">
						<span class="num_right_left">{{getCoinTypeText}}</span>
						<span class="num_right_right">交易限额</span>
					</view>
				</view>
				<view class="bx">
					<input class="price" type="password" placeholder="请输入交易密码" v-model="pay_password" />
				</view>
				<view class="box_sy">交易总量: {{this.allnum}}{{getCoinTypeText}}</view>
				<view class="box_fk">
					<view class="box_fk_left">实付款</view>
					<view class="box_fk_right">{{this.allnum}}{{getCoinTypeText}}</view>
				</view>
				<view class="btm_box">
					<!-- <view class="btm_box_left" >{{time}}s后自动取消</view> -->
					<view class="btm_box_right" @click="submitTran">确定</view>
				</view>
				<view class="chose">
					<image src="../../../static/img/transaction/chose.png" @click.stop="ChoseMask"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {api} from '../../../api/api.js'
	export default {
		name: "AllMask",
		props: {
			/* showType:null */
		},
		data() {
			return {
				width: getApp().globalData.windowWidth,
				height: getApp().globalData.windowHeight,
				activeIndex: 0,
				coinType: ['币', 'USDT'],
				show: false,
				index: 0,
				img:"../../../../../static/img/team/v.png",
				unit_price:"",
				num:"",
				pay_password:"",
				s_money:"",
				l_money:"",
				xev:"",
				usdt:"",
				allnum:0.00,
				time:60,
				tips:"",
				timeing:null,
				buy:"",
				sell:""
			}
		},
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
		created() {
			this.getInfo();
			this.get_price();
		},
		methods: {
			get_price() {
				uni.request({
					url: api.get_buysell_price,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.code === "success") {
							this.buy = res.data.list.buy;
							this.unit_price = res.data.list.sell;
							this.sell = res.data.list.sell;
						} else {
							console.log(res);
						}
					}
				})
			},
			/* mydestroy() {
				clearInterval(this.timeing);
			}, */
			timer() {
				this.timeing = setInterval(()=>{
					this.time--;
					if(this.time === 1) {
						clearInterval(this.timeing);
						uni.$emit("close")
						return;
					}
				},1000);
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
						if (res.data.code === "success") {
							this.xev = res.data.result.xcoin_use;
							this.usdt = res.data.result.usdt_money;
						} else {
							console.log(res);
						}
					}
				})
			},
			allBuySell() {
				if(this.index === 0) {
					this.num = this.xev;
				}else if(this.index === 1) {
					this.num = this.usdt;
				}
			},
			changeIndex(index) {
				this.activeIndex = index;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			ChoseMask() {
				this.$emit("close");
			},
			submitTran() {
				console.log("发布类型："+this.getTransactionType);
				console.log("币种类型"+this.getCoinType);
				uni.request({
					url: api.add_jiaoyi,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id:uni.getStorageSync('session_id'),
						money_type:this.getCoinType,
						num:Number(this.num),
						unit_price:Number(this.unit_price),
						type:this.getTransactionType,
						pay_password:this.pay_password,
						s_money:Number(this.s_money),
						l_money:Number(this.l_money)
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if(res.data.code === "success") {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							setTimeout(()=>{
								this.$emit("close");
							},1500)
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						
					}
				})
			}
		},
		computed: {
			getCoinType() {
				if(this.index === 0) {
					return "xcoin_use";
				}else if(this.index === 1) {
					return "usdt_money";
				}
			},
			getCoinTypeText() {
				if(this.index === 0) {
					return "X币";
				}else if(this.index === 1) {
					return "USDT";
				}
			},
			getTransactionType() {
				if(this.activeIndex === 0) {
					return 2;
				}else if(this.activeIndex === 1) {
					return 1;
				}
			}
		},
		components: {
			
		},
		watch: {
			index(val) {
				if(val === 0) {
					this.img = '../../../../../static/img/logo/XEV.png'
				} else if(val === 1) {
					this.img = '../../../../../static/img/home/USDT.png'
				}
			},
			num(newVal) {
				this.allnum = newVal;
			},
			activeIndex(newVal) {
				if(newVal === 0) {
					this.unit_price = this.sell;
				}else if(newVal === 1) {
					this.unit_price = this.buy;
				}
			}
		}
	}
</script>

<style scoped>
	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(127, 127, 127, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;
	}
	.mask_box {
		width: 100%;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.box_title {
		width: 100%;
		height: 40px;
		background: linear-gradient(to right, #005FA1, #00ACAE);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 20px;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	.box_content {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		padding-bottom: 10px;
	}

	.box_content_operation {
		width: 90%;
		height: 50px;
		line-height: 50px;
		margin: 0 auto;
		padding-top: 20px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.box_content_operation>view {
		width: 45%;
		height: 45px;
		line-height: 45px;
		background-color: #E6E6E6;
		text-align: center;
		font-size: 18px;
		border-radius: 6px;
	}

	.buy {
		color: #FFFFFF;
		background-color: #1BA27A !important;
	}

	.sell {
		color: #FFFFFF;
		background-color: #0066A1 !important;
	}

	.bx {
		width: 90%;
		height: 35px;
		line-height: 35px;
		margin: 0 auto;
		margin-top: 8px;
		border: 1px solid #C9C9C9;
		display: flex;
	}

	.bx_1 {
		width: 90%;
		height: 35px;
		line-height: 35px;
		margin: 0 auto;
		margin-top: 8px;
		border: 1px solid #C9C9C9;
		display: flex;
	}

	.bz_text {
		width: 50%;
		font-size: 16px;
		text-align: center;
	}

	.bz_right {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-input{
		font-size: 16px;
	}
	.img {
		width: 20px;
		height: 20px;
		display: inline-block;
	}
	.uni-input {
		width: 150px;
		height: 35px;
		line-height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.price{
		width: 70%;
		height: 35px;
		line-height: 35px;
		text-indent: 16px;
	}
	.num {
		width: 60%;
		height: 35px;
		line-height: 35px;
		text-indent: 16px;
	}
	.price_right {
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.price_right>span {
		width: 60px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		font-size: 16px;
		color: #0569A4;
		border-left: 1px solid #C9C9C9;
		display: inline-block;
	}
	.num_right {
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		text-align: center;
	}
	.num_right_left {
		width: 40%;
		height: 18px;
		line-height: 18px;
		border-right: 1px solid #C9C9C9;
		display: inline-block;
	}
	.num_right_right {
		width: 60%;
		display: inline-block;
		color: #0569A4;
	}
	.xe {
		width: 60%;
		height: 35px;
		line-height: 35px;
		text-indent: 16px;
		display: flex;
	}
	.xe>input {
		width: 60px;
		height: 100%;
	}
	.xe_center {
		width: 55px;
		height: 35px;
		line-height: 35px;
		text-align: center;
	}
	.box_sy {
		width: 95%;
		height: 25px;
		line-height: 25px;
		margin: 0 auto;
		margin-top: 8px;
		font-size: 15px;
		text-align: right;
		color: #878E94;
	}
	.box_fk {
		width: 95%;
		height: 25px;
		line-height: 25px;
		margin: 0 auto;
		margin-top: 8px;
		color: #878E94;
		display: flex;
	}
	.box_fk>view {
		width: 50%;
	}
	.box_fk_left {
		font-size: 16px;
		color: #878E94;
	}
	.box_fk_right {
		font-size: 18px;
		color: #196999;
		text-align: right;
	}
	.btm_box {
		width: 95%;
		height: 45px;
		line-height:45px;
		margin: 0 auto;
		margin-top: 16px;
		display: flex;
		justify-content: space-around;
	}
	.btm_box>view {
		width: 45%;
		text-align: center;
		color: #FFFFFF;
		border-radius: 6px;
	}
	.btm_box_left {
		background-color: #96ABBC;
	}
	.btm_box_right {
		background-color: #0066A1;
	}
	.chose {
		width: 95%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 15px;
	}
	.chose>image {
		width: 30px;
		height: 30px;
	}
</style>
