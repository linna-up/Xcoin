<template>
	<view class="notice" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			系统公告
		</view>
		<Item v-for="(item,index) in list" :key="index" :list="item"></Item>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	
	import Item from './child/NoticeItem.vue'
	export default {
		data() {
			return {
				windowWidth:getApp().globalData.windowWidth,
				windowHeight:getApp().globalData.windowHeight,
				top:getApp().globalData.top,
				list:[]
			}
		},
		onLoad() {
			this.getNoticeList()
		},
		methods: {
			toBack() {
				uni.switchTab({
				    url:'../mine/mine'
				});
			},
			getNoticeList() {
				uni.request({
					url:api.notice_list,
					data: {
						page:1
					},
					method:"post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							this.list = res.data.result;
							
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								duration:1500
							})
						}
					}
				})
			}
		},
		components: {
			Item
		}
	}
</script>

<style scoped>
	.notice {
		background-color:#FAF9F7;
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
</style>
