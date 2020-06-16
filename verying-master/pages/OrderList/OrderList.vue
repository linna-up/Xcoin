<template>
	<view class="list" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			订单列表
		</view>

		<view class="nav">
			<OrItem v-for="(item,index) in list" :item="item" :key="index" :class="{active:index === activeIndex}" @click.native="changeIndex(index)"></OrItem>
		</view>
		<scroll-view scroll-y="true" :style="{width:windowWidth+'px',height:(windowHeight-top-80)+'px'}">
			<ListItem v-show="activeIndex === 0" v-for="(item,index) in AllList" :key="index + 0.01" :list="item"></ListItem>
			<ListIteming v-show="activeIndex === 1" v-for="(item,index) in ListIteming" :key="index +0.02" :list="item"></ListIteming>
			<FinBox v-show="activeIndex === 2" v-for="(item,index) in FinBox" :key="index +0.03" :list="item"></FinBox>
			<OffBox v-show="activeIndex === 3" v-for="(item,index) in OffBox" :key="index +0.04" :list="item"></OffBox>
		</scroll-view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import OrItem from '../order/child/NavItem.vue'
	import ListItem from './child/ListItem.vue'
	import ListIteming from './child/ListIteming.vue'
	import FinBox from './child/FinListItem.vue'
	import OffBox from './child/OffListItem.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				list: ['全部', '交易中', '已完成', '已取消'],
				activeIndex: 0,
				AllList:[],
				ListIteming:[],
				FinBox:[],
				OffBox:[],
				mescroll: null, //mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 15 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无数据'
					}
				},
				allId:0,
				ingId:0,
				finId:0,
				offId:0
			}
		},
		onShow() {
			this.getUser_jiao_yi_list();
		},
		methods: {
			downCallback() {
				this.getUser_jiao_yi_list();
				setTimeout(() => {
					this.mescroll.endSuccess();
				}, 1000)
				console.log("下拉刷新");
			},
			//上拉加载回调
			upCallback(page) {
				this.getUser_jiao_yi_lists();
				this.mescroll.endSuccess();
			},
			toBack() {
				uni.navigateBack();
			},
			changeIndex(index) {
				this.activeIndex = index;
				this.getUser_jiao_yi_list();
			},
			getUser_jiao_yi_list() {
				if(this.activeIndex === 0) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							status:-1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.AllList = res.data.list;
								this.allId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.activeIndex === 1) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							status:1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.ListIteming = res.data.list;
								this.ingId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.activeIndex === 2) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							status:3
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.FinBox = res.data.list;
								this.finId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.activeIndex === 3) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							status:4
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.OffBox = res.data.list;
								this.offId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}
			},
			getUser_jiao_yi_lists() {
				if(this.activeIndex === 0) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: this.allId,
							status:-1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.AllList.push(res.data.list[i]);
								}
								this.allId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.activeIndex === 1) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid:this.ingId,
							status:1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.ListIteming.push(res.data.list[i]);
								}
								this.ingId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.activeIndex === 2) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: this.finId,
							status:3
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.FinBox.push(res.data.list[i]);
								}
								this.finId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}else if(this.activeIndex === 3) {
					uni.request({
						url: api.user_order_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid:this.offId,
							status:3
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.OffBox.push(res.data.list[i]);
								}
								this.offId = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
				}
			}
		},
		components: {
			OrItem,
			ListItem,
			ListIteming,
			FinBox,
			OffBox
		}
	}
</script>

<style scoped>
	.list {}

	.notice {
		background-color: #FAF9F7;
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
		height: 16px;
	}

	.nav {
		width: 98%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		border-bottom: 0.5px solid #D4D4D4;
		display: flex;
	}

	.nav>view {
		width: 20%;
	}
</style>
