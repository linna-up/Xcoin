<template>
	<view class="addressmask" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="box">
			<view class="box_title">申购XCoin</view>
			<view class="box_content">
				<view class="num_box">
					<input type="number" v-model="num" placeholder="请输入购买数量" />
					<view class="num_box_right">
						<view @click="buyAll">全部买入</view>
					</view>
				</view>
				<view class="num_boxs">
					<input type="password" v-model="pay_pw" placeholder="请输入资金密码" />
				</view>
				<view class="box_sy">余额: {{xev}}XEV</view>
				<view class="box_fk">
					<view class="box_fk_left">实付款</view>
					<view class="box_fk_right">{{getAll}}XEV</view>
				</view>
				<view class="btm_box">
					<view class="btm_box_left" @click="close">取消</view>
					<view class="btm_box_right" @click="buy">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {api} from '../../../api/api.js'
	export default {
		name:"IdenMask",
		props:{
			list:{},
			crowd_id:"",
			price:""
		},
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				num:"",
				pay_pw:"",
				xev:""
			}
		},
		created() {
			this.getInfo();
		},
		computed:{
			getAll() {
				return Number(this.num)*Number(this.price)
			}
		},
		methods: {
			buyAll() {
				this.num = this.xev;
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
						} else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
			},
			close() {
				this.$emit("close")
			},
			buy() {
				if(this.num === "") {
					uni.showToast({
						title:"请输入购买数量",
						icon:"none"
					})
					return;
				}else if(this.pay_pw === "") {
					uni.showToast({
						title:"请输入交易密码",
						icon:"none"
					})
					return;
				}
				uni.request({
					url:api.add_crowd_funding,
					data: {
						uid:this.uid,
						session_id:this.session_id,
						crowd_id:this.crowd_id,
						paypassword:this.pay_pw,
						num:this.num
					},
					method:"post",
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
								this.$emit("close")
							},2000)
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
		components:{
			
		}
	}
</script>

<style scoped>
	.addressmask {
		background-color: rgb(204,204,204,0.5);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box {
		position: absolute;
		width: 100%;
		height: auto;
		padding-bottom: 8px;
	}
	.box_title {
		width: 100%;
		height: 25%;
		background: linear-gradient(to right,#005FA1,#00ACAE);
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
		height: 75%;
		background-color: #FFFFFF;
		padding-top: 25px;
		padding-bottom: 30px;
	}
	.num_box {
		width: 95%;
		height: 60px;
		line-height: 60px;
		margin: 0 auto;
		border: 0.5px solid #D1D1D1;
		display: flex;
	}
	.num_box>input {
		width: 70%;
		height: 100%;
		text-indent: 16px;
	}
	.num_box_right {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.num_box_right>view {
		width: 80%;
		height: 20px;
		line-height: 20px;
		font-size: 15px;
		text-align: center;
		color: #196999;
		border-left: 0.5px solid #D1D1D1;
	}
	.num_boxs {
		width: 95%;
		height: 60px;
		line-height: 60px;
		margin: 0 auto;
		border: 0.5px solid #D1D1D1;
		margin-top: 12px;
	}
	.num_boxs>input{
		width: 100%;
		height: 100%;
		text-indent: 16px;
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
</style>
