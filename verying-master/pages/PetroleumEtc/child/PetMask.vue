<template>
	<view class="addressmask" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="box">
			<view class="box_title">
				<view class="box_title_left">安全验证</view>
				<view class="box_title_right" @click="close">取消</view>
			</view>
			<view class="box_sx">
				<view class="box_sx_left">充值金额:100元</view>
				<view class="box_sx_right">手续费:10元</view>
			</view>
			<view class="box_sx">
				<input type="number"  placeholder="请输入加油卡号"/>
			</view>
			<view class="box_sx">
				<input type="number"  placeholder="请输入持卡人手机号"/>
			</view>
			<view class="box_sx">
				<input type="number"  placeholder="请输入持卡人姓名"/>
			</view>
			<view class="box_sx">
				<input type="number"  placeholder="请输入资金密码"/>
			</view>
			<view class="box_sx_s">
				<view class="box_sx_left_s">实付款</view>
				<view class="box_sx_right_s">110元</view>
			</view>
			<view class="btm_box">
				<view class="btm">确认充值</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"PetMask",
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
			}
		},
		methods: {
			close() {
				this.$emit("close")
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
	}
	.box {
		position: absolute;
		width: 100%;
		height: auto;
		padding-bottom: 0.01px;
		bottom: 0;
	}
	.box_title {
		width: 100%;
		height: 55px;
		background: linear-gradient(to right,#005FA1,#00ACAE);
		display: flex;
		color: #FFFFFF;
		font-size: 20px;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}
	.box_title_left {
		width: 80%;
		height: 55px;
		line-height: 55px;
		text-indent: 16px;
	}
	.box_title_right {
		flex: 1;
		height: 55px;
		line-height: 55px;
		font-size: 16px;
		text-align: center;
	}
	.box_sx {
		width: 100%;
		height: 55px;
		display: flex;
		background-color: #FFFFFF;
		font-size: 20px;
		border-bottom: 0.3px solid #C9C9C9;
	}
	.box_sx_left {
		width: 50%;
		height: 55px;
		line-height: 55px;
		text-indent: 16px;
	}
	.box_sx_right {
		width: 50%;
		height: 55px;
		line-height: 55px;
		font-size: 14px;
		color: #8A9196;
		text-align: right;
		padding-right: 16px;
	}
	.box_sx>input {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		font-size: 18px;
	}
	.box_sx_s {
		width: 100%;
		height: 40px;
		display: flex;
		background-color: #FFFFFF;
		font-size: 20px;
	}
	.box_sx_left_s {
		width: 50%;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		text-indent: 16px;
	}
	.box_sx_right_s {
		width: 50%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: #005FA1;
		text-align: right;
		padding-right: 16px;
	}
	.btm_box {
		width: 100%;
		height: 95px;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btm {
		width: 90%;
		height: 50px;
		line-height: 50px;
		background-color:#005FA1 ;
		color: #FFFFFF;
		text-align: center;
		border-radius: 5px;
	}
</style>
