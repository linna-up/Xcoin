<template>
	<view class="tellcost" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			充值中心
		</view>
		<view class="tellcost_title">
			<view class="tellcost_title_img">
				<image src="../../static/img/tellcost/tell.png"></image>
			</view>
			<view class="tellcost_title_right">
				<input type="number" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="text">
			<span>充值话费</span> (三网通用)
		</view>
		<view class="box">
			<tell-item v-for="(item,index) in list" :item="item" :key="index" :class="{active:thisIndex === index}" @click.native="changeIndex(index)"></tell-item>
		</view>
		<view class="ye">账户余额: <span>100XCoin</span></view>
		<view class="btm" @click="toShow">立即充值</view>
		<view class="type">
			<view class="type_left">
				<image src="../../static/img/tellcost/petroleum.png" @click="toPetro"></image>
				<view>油卡充值</view>
			</view>
			<view class="type_right">
				<image src="../../static/img/tellcost/flow.png" @click="toFlow"></image>
				<view>流量充值</view>
			</view>
		</view>
		<TellMask v-if="isShow" @close="close"></TellMask>
	</view>
</template>

<script>
	import TellItem from './child/TellItem.vue'
	import TellMask from './child/TellMask.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				thisIndex:0,
				list:['10元','20元','30元','50元','100元','200元'],
				isShow:false
			}
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			changeIndex(index) {
				this.thisIndex = index;
			},
			toShow() {
				this.isShow = !this.isShow;
			},
			close() {
				this.isShow = !this.isShow;
			},
			toPetro() {
				uni.navigateTo({
					url:'../PetroleumEtc/PetroleumEtc'
				})
			},
			toFlow() {
				uni.showToast({
					title:"未开放",
					duration:1500,
					icon:'none'
				})
			}
		},
		components: {
			TellItem,
			TellMask
		}
	}
</script>

<style scoped>
	.tellcost {
		
	}
	.notice_title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #FFFFFF;
	}
	.notice_title_left {
		position: absolute;
		width: 60px;
		height: 50px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.notice_title_left>image {
		width: 16px;
		height:16px;
	}
	.tellcost_title {
		width: 100%;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #CBCBCB;
		display: flex;
		justify-content: flex-end;
	}
	.tellcost_title_img {
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tellcost_title_img>image {
		width: 35px;
		height: 35px;
	}
	.tellcost_title_right {
		width:80%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tellcost_title_right>input {
		width: 100%;
		height: 100%;
		font-size: 18px;
	}
	.text {
		width: 90%;
		height: 30px;
		margin: 0 auto;
		font-size: 15px;
		padding-top: 8px;
		text-indent: 30px;
	}
	.text>span {
		font-size: 18px;
		font-weight: 800;
	}
	.box {
		width: 90%;
		height: 142px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
	.active {
		border: 1px solid #0066A1;
		color: #0066A1;
	}
	.ye {
		width: 90%;
		height: 25px;
		line-height: 25px;
		margin: 0 auto;
		text-align: right;
		font-size: 15px;
	}
	.ye>span {
		color: #0066A1;
	}
	.btm {
		width: 90%;
		height: 45px;
		line-height: 45px;
		margin: 0 auto;
		background-color: #0066A1;
		text-align: center;
		color: #FFFFFF;
		margin-top: 8px;
		border-radius: 6px;
	}
	.type {
		width: 90%;
		height: 120px;
		margin: 0 auto;
		display: flex;
		padding-top: 30px;
	}
	.type>view {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.type>view>view {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #0066A1;
		font-size: 17px;
	}
	.type>view>image {
		width: 60px;
		height: 60px;
	}
</style>
