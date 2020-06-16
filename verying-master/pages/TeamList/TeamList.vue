<template>
	<view class="list" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			团队列表
		</view>
		<ListItem :list="list.v0" @click.native="to(0)"></ListItem><!-- @click.native="to(0)" -->
		<v1 :list="list.v1" @click.native="to(1)"></v1><!-- @click.native="to(1)" -->
		<v2 :list="list.v2" @click.native="to(2)"></v2><!-- @click.native="to(2)" -->
		<v3 :list="list.v3" @click.native="to(3)"></v3><!-- @click.native="to(3)" -->
		<v4 :list="list.v4" @click.native="to(4)"></v4><!-- @click.native="to(4)" -->
		<v5 :list="list.v5" @click.native="to(5)"></v5>
		<!-- <vip :list="list.vip" ></vip> --><!-- @click.native="to(6)" -->
		<!-- <svip :list="list.svip" ></svip> --><!-- @click.native="to(7)" -->
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import ListItem from './child/ListItem.vue'
	import V1 from "./child/V1.vue"
	import V2 from "./child/V2.vue"
	import V3 from "./child/V3.vue"
	import V4 from "./child/V4.vue"
	import V5 from "./child/V5.vue"
	import Vip from "./child/Vip.vue"
	import Svip from "./child/Svip.vue"

	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list: []

			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			to(num) {
				uni.navigateTo({
					url:'../../../../ClassALists/ClassALists?type='+num
				})
			},
			toBack() {
				uni.navigateBack();
			},
			getList() {
				uni.request({
					url: api.team,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.list = res.data.result;
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					}
				})
			}
		},
		components: {
			ListItem,
			V1,
			V2,
			V3,
			V4,
			V5,
			Vip,
			Svip
		}
	}
</script>

<style scoped>
	.list {}

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
</style>
