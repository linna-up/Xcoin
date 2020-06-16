<template>
	<view class="infoitem" ><!-- @click="toDetails" -->
		<!-- <view class="title">{{getType}}</view> -->
		<view class="box">
			<view class="box_title_left">
				<view class="top">数量</view>
				<view class="btm">{{list.money}}</view>
			</view>
			<view class="box_title_center">
				<view class="top">备注</view>
				<view class="btm">{{list.remark}}</view>
			</view>
			<view class="box_title_right">
				<view class="top">时间</view>
				<view class="btm">
					{{list.add_time}}
					<image src="../../../static/img/information/more.png" ></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"InfoItem",
		props:{
			list:{}
		},
		methods:{
			toDetails() {
				uni.navigateTo({
					url:'../../../../HistoryDetails/HistoryDetails?id='+this.list.id
				})
			}
		},
		computed:{
			getStatus() {
				if(this.list.jd_status === '0' || this.list.jd_status === "1") {
					return "未完成" 
				}else if(this.list.jd_status === '2') {
					return "已完成"
				}
			},
			getType() {
				if(this.list.admin === '3' ) {
					return "转入"
				}else if(this.list.jd_status === '4') {
					return "提现"
				}else if(this.list.jd_status === '5') {
					return "合约收益"
				}else if(this.list.jd_status === '6') {
					return "邀请收益"
				}else if(this.list.jd_status === '7') {
					return "团队收益"
				}else if(this.list.jd_status === '8') {
					return "节点收益"
				}
			}
		}
	}
</script>

<style scoped>
	.infoitem {
		width: 90%;
		height: 50px;
		margin: 0 auto;
		color: #2C2C2C;
	}
	.title {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
	}
	.box {
		width: 100%;
		height: 60px;
		margin: 0 auto;
		display: flex;
	}
	.box_title_left{
		width: 30%;
	}
	.box_title_center{
		width: 30%;
	}
	.box_title_right{
		width:40%;
		text-align: right;
	}
	.top{
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #C1C1C1;
	}
	.btm {
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		position: relative;
		padding-right: 16px;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.btm>image {
		position: absolute;
		top: 7px;
		right: 0px;
		width: 16px;
		height: 15px;
	}
</style>
