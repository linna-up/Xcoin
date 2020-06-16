<template>
	<view class="order" :style="{width:width+'px',height:(height)+'px'}">
		<view id="navbar" :style="{paddingTop:top+'px'}">
			<view class="left">
				<image src="../../static/img/notice/back.png" @click="toBack"></image>
			</view>
			<view class="center">
				<span>发布列表</span>
			</view>
			<view class="right">
				<image src="../../static/img/transaction/history.png" @click="toOrderList"></image>
			</view>
		</view>
		
		<view class="nav">
			<OrItem v-for="(item,index) in list" :item="item" :key="index" :class="{active:index === activeIndex}" @click.native="changeIndex(index)"></OrItem>
		</view>
		<!-- <scroll-view  scroll-y="true" :style="{width:width+'px',height:(height-top-74)+'px'}" > -->
		<mescroll-body class="scroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption">
			<Box v-show="activeIndex === 0" v-for="(item,index) in AllList" :key="(index + 0.01)" :list="item"></Box>
			<SellBox v-show="activeIndex === 1" v-for="(item,index) in SellList" :key="(index +0.02)" :list="item"></SellBox>
			<BuyBox v-show="activeIndex === 2" v-for="(item,index) in BuyList" :key="(index +0.03)" :list="item"></BuyBox>
			<FinBox v-show="activeIndex === 3" v-for="(item,index) in FinList" :key="(index +0.04)" :list="item"></FinBox>
			<OffBox v-show="activeIndex === 4" v-for="(item,index) in OffList" :key="(index +0.05)" :list="item"></OffBox>
		<!-- </scroll-view> -->
		</mescroll-body>
		
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	import OrItem from "./child/NavItem.vue"
	import Box from './child/OrItem.vue'
	import SellBox from './child/SellOrItem.vue'
	import BuyBox from './child/BuyOrItem.vue'
	import FinBox from './child/FinOrItem.vue'
	import OffBox from './child/OffOrItem.vue'
	
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				width: getApp().globalData.windowWidth,
				height: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
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
				list:['全部','出售','买入','已完成','已取消'],
				activeIndex:0,
				AllList:[],
				SellList:[],
				BuyList:[],
				FinList:[],
				OffList:[],
				allBigid:0,
				sellBigid:0,
				buyBigid:0,
				finBigid:0,
				offBigid:0
			}
		},
		onLoad() {
			 uni.$on('refersh',()=>{
			     this.mescroll.triggerDownScroll();
			 })
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
			getUser_jiao_yi_list() {
				if(this.activeIndex === 0) {
					uni.request({
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							type:"all",
							status: -1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.AllList = res.data.list;
								this.allBigid = res.data.last_id;
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
					url: api.user_jiao_yi_list,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id: uni.getStorageSync('session_id'),
						bigid: 0,
						type:"2",
						status: -1
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.SellList = res.data.list;
							this.sellBigid = res.data.last_id;
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
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							type:"1",
							status: -1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.BuyList = res.data.list;
								this.buyBigid = res.data.last_id;
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
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							type:"all",
							status: 2
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.FinList = res.data.list;
								this.finBigid = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
								
						}
					})
				}else if(this.activeIndex === 4) {
					uni.request({
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: 0,
							type:"all",
							status: 3
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								this.OffList = res.data.list;
								this.offBigid = res.data.last_id;
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
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: this.allBigid,
							type:"all",
							status: -1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.AllList.push(res.data.list[i]);
								}
								this.allBigid = res.data.last_id;
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
					url: api.user_jiao_yi_list,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id: uni.getStorageSync('session_id'),
						bigid: this.sellBigid,
						type:"2",
						status: -1
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.code === "success") {
							for(let i=0; i<res.data.list.length;i++) {
								this.SellList.push(res.data.list[i]);
							}
							this.sellBigid = res.data.last_id;
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
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: this.buyBigid,
							type:"1",
							status: -1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.BuyList.push(res.data.list[i]);
								}
								this.buyBigid = res.data.last_id;
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
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: this.finBigid,
							type:"all",
							status: 2
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.FinList.push(res.data.list[i]);
								}
								this.finBigid = res.data.last_id;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
								
						}
					})
				}else if(this.activeIndex === 4) {
					uni.request({
						url: api.user_jiao_yi_list,
						method: "POST",
						data: {
							uid: uni.getStorageSync('uid'),
							session_id: uni.getStorageSync('session_id'),
							bigid: this.offBigid,
							type:"all",
							status: 3
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.code === "success") {
								for(let i=0; i<res.data.list.length;i++) {
									this.OffList.push(res.data.list[i]);
								}
								this.offBigid = res.data.last_id;
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
			toBack() {
				uni.navigateBack();
			},
			toOrderList() {
				uni.navigateTo({
					url:'../OrderList/OrderList'
				})
			},
			changeIndex(index){
				this.activeIndex = index;
				this.getUser_jiao_yi_list();
			}
		},
		components: {
			OrItem,
			Box,
			SellBox,
			BuyBox,
			FinBox,
			OffBox
		},
		watch:{
			/* activeIndex() {
				this.getUser_jiao_yi_list();
			} */
		}
	}
</script>

<style scoped>
	.order {
		
	}
	#navbar {
		width: 100vw;
		height:44px ;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left,.right {
		width: 60px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left>image {
		width: 18px;
		height: 18px;
	}
	.right>image {
		width: 18px;
		height: 18px;
	}
	.center {
		flex: 1;
		height: 44px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.center>span {
		font-size: 16px;
	}
	.nav {
		width: 98%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		border-bottom: 0.5px solid #D4D4D4;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.active {
		
	}
</style>
