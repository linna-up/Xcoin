<template>
	<view class="password" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			加油卡充值
		</view>
		<PerTabItem @changeIndex="changeTabIndex"></PerTabItem>
		<view class="box">
			<Item v-for="(item,index) in list" :item="item" :key="index" :class="{active:thisIndex === index}" @click.native="changeIndex(index)"></Item>
		</view>
		<view class="ye">账户余额: <span>100XCoin</span></view>
		<view class="btm" @click="toShow">确认提交</view>
		<view class="type">
			<view class="type_left">
				<image src="../../static/img/tellcost/tell.png" @click="toTell"></image>
				<view>话费充值</view>
			</view>
			<view class="type_right">
				<image src="../../static/img/tellcost/flow.png" @click="toFlow"></image>
				<view>流量充值</view>
			</view>
		</view>
		<PetMask v-if="isShow" @close="close"></PetMask>
	</view>
</template>

<script>
	import Item from "../TellCost/child/TellItem.vue"
	import PerTabItem from './child/PerTabItem.vue'
	
	import PetMask from './child/PetMask.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				thisIndex:0,
				list:['100元','200元','500元','1000元','更多'],
				isShow:false
			}
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			changeTabIndex(index) {
				console.log(index);
			},
			changeIndex(index) {
				if(index === 4) {
					uni.showToast({
						title:"待增加",
						duration:1500,
						icon:'none'
					})
					return;
				}
				this.thisIndex = index;
			},
			toTell() {
				uni.navigateTo({
					url:'../TellCost/TellCost'
				})
			},
			toShow() {
				this.isShow = !this.isShow;
			},
			close() {
				this.isShow = !this.isShow;
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
			PerTabItem,
			Item,
			PetMask
		}
	}
</script>

<style scoped>
	.password {
		
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
		padding-bottom: 15px;
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
		height: 16px;
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
		margin-top: 32px;
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
