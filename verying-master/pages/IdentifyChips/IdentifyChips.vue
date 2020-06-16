<template>
	<view class="IdentifyChips" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			ICO众筹
		</view>
		<IndetItem @click.native="show(item)" v-for="(item,index) in list" :list="item" :key="index"></IndetItem>
		<IndenMask v-if="isShow" :crowd_id="crowd_id" :price="price" @close="close" ></IndenMask>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	import IndenMask from './child/IdenMask.vue'
	import IndetItem from './child/IndetItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				value:50,
				isShow:false,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list:[],
				crowd_id:"",
				price:""
			}
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			show(item) {
				this.crowd_id = item.id;
				this.price = item.price;
				this.isShow = !this.isShow;
			},
			close() {
				this.isShow = !this.isShow;
			},
			getIndet() {
				uni.request({
					url:api.indet,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method:"post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							this.list = res.data.list;
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
		onLoad() {
			this.getIndet()
		},
		components: {
			IndenMask,
			IndetItem
		}
	}
</script>

<style scoped>
	.IdentifyChips {
		
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
	.item {
		width: 95%;
		height: 30%;
		margin: 0 auto;
		background-color: #F4F8FB;
		padding-top: 8px;
	}
	.bg {
		width: 95%;
		height: 45%;
		margin: 0 auto;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url("../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
		border-radius: 5px;
	}
	.cen {
		margin-top: 8px;
		width: 95%;
		height: 16px;
		margin: 0 auto;
		color: #00AEAC;
		font-size: 14px;
		text-align: center;
	}
	.slider {
		width: 95%;
		height: 8px;
		margin: 0 auto;
		background-color: #E6E6E6;
		margin-top: 8px;
		border-radius: 16px;
	}
	.slider_item {
		background-color:#00AEAC ;
		height: 8px;
		border-radius: 16px;
	}
	.box {
		width: 95%;
		height: 35%;
		margin: 0 auto;
		margin-top: 8px;
		border-radius: 16px;
		display: flex;
	}
	.box_left {
		width: 45%;
	}
	.box_right {
		width: 55%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.box_right_btm {
		width: 80%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: linear-gradient(to right,#0160A0,#00A9AC);
		font-size: 16px;
		color: #FFFFFF;
		margin: 0 auto;
		border-radius: 8px;
	}
	.box_right_text {
		font-size: 14px;
		height: 20px;
		line-height: 20px;
		text-align: center;
	}
	.box_left>view {
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
	}
</style>
