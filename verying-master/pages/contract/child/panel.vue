<template>
	<view class="panel">
		<view class="panel_img">
			<image src="../../../static/img/contract/contract.png" />
		</view>
		<view class="panel_box">
			<view class="status">
				<span class="status_title">状态:</span>
				<span class="status_value">
					<!-- {{list.status}} -->{{contract_status_name}}</span>
				<!-- <span class="status_value_on">{{list.status}}在线</span> -->
			</view>
			<view class="money" :style="{marginTop:marginTop}" style="position: relative;">
				<span>投资币种:</span>
				<span style="font-size: 14px!important;" @click="tellCoinTypeMask">
					<span style="font-size: 12px;">{{option}}</span>
				</span>
			</view>
			<view class="money" :style="{marginTop:marginTop}" style="position: relative;">
				<span>合约金额:</span>
				<span style="font-size: 14px!important;" @click="tellCMask">
					{{contract_amount}}
					<span style="font-size: 12px;"><!-- USDT --></span>
					<!-- <xfl-select style="width: 40px;display: inline-block;background-color: transparent;border: 0;" :list="list"
					 :clearable="false" :disabled="getShow" :initValue="str" :selectHideType="'independent'" @change="change">
					 
					</xfl-select> -->
				</span>
			</view>
			<view class="isFalse" v-if="getShow === false">
				<view class="create" @click="create" :style="{marginTop:marginTop}">创建合约</view>
			</view>
			<view class="isFalse" v-else>
				<view class="create" :style="{marginTop:marginTop}" @click="tellSuperToCreate">查看详情</view>
				<view class="create" :style="{marginTop:marginTop}" @click="tellSuperToCreate">申请退本</view>
			</view>
		</view>
		<!-- 开关 -->
		<!-- <view class="switch">
			<view class="switch_item" @click="chanbeSwitch" :style="{float:LeftOrRight}"></view>
		</view> -->
	</view>
</template>

<script>
	import {
		api
	} from '../../../api/api.js'
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	export default {
		name: "panel",
		props: {
			list: {},
			contract_amount: 0,
			contract_status_name: "",
			contract_status: 0,
			option: "",
			optionIndex: 0
		},
		data() {
			return {
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				switch: false,
				isShow: false,
				str: "100",
				val: 100,
				super_node:"",
				is_real:""
			}
		},
		created() {
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
					if(res.data.code === "success") {
						console.log(res.data.result.super_node);
						this.super_node = res.data.result.super_node;
						this.is_real = res.data.result.is_real;
					}else {
						uni.showToast({
							title: res.data.msg,
							duration: 1500,
							icon: "none"
						})
					}
				}
			})
		},
		beforeMount: () => {
			console.log(this.list);

		},
		methods: {
			tellCMask() {
				if (this.contract_status === 1) {
					uni.showToast({
						title: "已有合约,合约锁定中",
						icon: "none"
					})
					return;
				}
				uni.$emit("CMask")
			},
			create() {
				/* if(this.is_real === "0") {
					uni.showToast({
						title:"未认证,请先认证",
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../../../../Real/Real'
						},2000)
					})
					return;
				}
				if(!(this.super_node === '1' || this.super_node === '2' || this.super_node === '3')) {
					console.log(this.super_node);
					uni.showToast({
						title:"非超级节点不可购买合约!",
						icon:"none"
					})
					return;
				} */
				uni.request({
					url: api.create,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						is_repeat: this.is_repeat,
						amount: this.contract_amount,
						money_type: this.optionIndex + 1
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.code === "success") {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
							this.$emit("refsher")
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					},
				})
			},
			change(e) {
				this.val = e.newVal;
			},
			chanbeSwitch() {
				this.switch = !this.switch;
				this.isShow = !this.isShow;
				/* console.log("点击了");
				console.log(this.switch); */
			},
			tellSuperToCreate() {
				this.$emit("tellSuperToCreate");
			},
			tellCoinTypeMask() {
				this.$emit("tellCoinTypeMask")
			}
		},
		computed: {
			getShow() {
				if (this.contract_status === 1) {
					return true;
				} else {
					return false;
				}
			},
			LeftOrRight() {
				if (this.switch == false) {
					return "left";
				} else {
					return "right";
				}
			},
			marginTop() {
				if (this.getShow == false) {
					return 30 + 'px';
				} else {
					return 12 + 'px';
				}
			},
			getStatus() {
				if (this.list.status === "在线") {
					return true;
				} else {
					return false;
				}
			},
			is_repeat() {
				if (this.switch == false) {
					return 0;
				} else {
					return 1;
				}
			}
		},
		components: {
			xflSelect
		}
	}
</script>

<style scoped>
	.panel {
		width: 80%;
		height: 50vh;
		margin: 0 auto;
		margin-left: 10%;
		margin-right: 10%;
		/* background-image: linear-gradient(to right, #1DA9FE , #058AFF); */
		background-color: transparent;
		border: 1px solid #36F2E9;
		border-radius: 5px;
		margin-top: 50px;
		padding-bottom: 30px;
		position: relative;
	}

	.panel_img {
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.panel_img>image {
		width: 55%;
		height: 100%;
	}

	.panel_box {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.status {
		width: 70%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin: 0 auto;
		background-color: transparent;
		border: 1px solid #36F2E9;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.status>span {
		flex: 1;
		text-align: center;
	}

	.status_title {
		color: #FFFFFF;
	}

	.status_value {
		color: #B7AFA7;
	}

	.status_value_on {
		color: #05954B;
	}

	.money {
		width: 70%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin: 0 auto;
		background-color: transparent;
		border: 1px solid #36F2E9;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
	}

	.money {
		color: #FFFFFF;
		text-align: center;
	}

	.money>span {
		flex: 1;
	}

	.isFalse {
		width: 100%;
	}

	.create {
		width: 70%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin: 0 auto;
		color: #FFFFFF;
		background-color: transparent;
		border: 1px solid #36F2E9;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
	}

	.create_btm {
		width: 70%;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		margin: 0 auto;
		color: #FFFFFF;
		border: 1px solid #0284F5;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;
	}

	.switch {
		width: 32px;
		height: 16px;
		background-color: #1196DB;
		border-radius: 16px;
		padding: 1px;
		position: absolute;
		top: 35px;
		right: 20px;
	}

	.switch_item {
		width: 15px;
		height: 15px;
		background-color: #00040F;
		border-radius: 50%;
	}
</style>
