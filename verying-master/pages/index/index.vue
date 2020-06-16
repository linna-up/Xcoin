<template>
	<view class="content" :style="{width:windowWidth+'px',height:(windowHeight-50)+'px'}">
		<mescroll-body class="scroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<nav-bar></nav-bar><!-- 导航 -->
			<swiper-box :list="banners"></swiper-box><!-- 轮播图 -->
			<Notice :notice="notice"></Notice><!-- 公告 -->
			<Lattice></Lattice><!-- 宫格 -->
			<Assets :number="number" :about_number="about_number" :member_type="member_type"></Assets>
			<Jump @click.native="toCon"></Jump>
			<Tab></Tab>
			<List v-for="(item,index) in set" :list="item" :key="index"></List>
			<!-- <Lists :list="xv"></Lists> -->
		</mescroll-body>
	</view>
</template>

<script>
	import NavBar from '../../public/NavigationBar.vue'
	import SwiperBox from './child/SwiperBox.vue'
	import Notice from './child/notice.vue'
	import Lattice from './child/lattice.vue'
	import Assets from './child/assets.vue'
	import Jump from './child/jump.vue'
	import Tab from './child/tab.vue'
	import List from './child/list.vue'
	import Lists from './child/lists.vue'


	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {api} from '../../api/api.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				windowWidth:getApp().globalData.windowWidth,
				windowHeight:getApp().globalData.windowHeight,
				Inotice: 'Hello',
				session_id:uni.getStorageSync("session_id"),
				uid:uni.getStorageSync("uid"),
				banners:[],//轮播图
				notice:'',//公告
				member_type:'',//等级
				about_number:"0.00",//x币
				number:"0",//价格
				/* usdt_money:0,//usdt钱包
				xcoin_use:0,//XEV钱包
				jifen_money:0,//商城钱包
				flat_money:0,//XV钱包,[ */
				result:{},
				set:[],
				mescroll: null, //mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
				},
				// 上拉加载的常用配置
				upOption: {
					use: false, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				xv:{}
			}
		},
		components: {
			NavBar,

			SwiperBox,
			Notice,
			Lattice,
			Assets,
			Jump,
			Tab,
			List,
			Lists
		},
		computed:{
			i18n() {
				return this.$t('message'); 
			}  
		},
		onLoad() {
			this.getIndex();
 			console.log(uni.getStorageSync("uid"));
			console.log(uni.getStorageSync("session_id"));
		},
		onShow() {
			/* this.getAssets(); */
			uni.setTabBarItem({
				index:0,
				text:this.$t('message').tabBar.contract
			})
			uni.setTabBarItem({
				index:1,
				text:this.$t('message').tabBar.trade
			})
			uni.setTabBarItem({
				index:2,
				text:this.$t('message').tabBar.index
			})
			uni.setTabBarItem({
				index:3,
				text:this.$t('message').tabBar.assets
			})
			uni.setTabBarItem({
				index:4,
				text:this.$t('message').tabBar.mine
			})
		},
		methods: {
			toCon() {
				uni.navigateTo({
					url:'../InviteFriends/InviteFriends'
				})
			},
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调*/
			downCallback() {
				setTimeout(()=>{
					this.getIndex();
					this.mescroll.endSuccess();
					/* uni.showToast({
						title:'刷新成功',
						duration:2000
					})
					uni.hideToast(); */
				},3000)
			},
			//上拉加载回调
		/* 	upCallback(page) {
				setTimeout(()=>{
					this.mescroll.endSuccess();
					
				},3000)
			}, */
			getIndex() {
				uni.request({
					url:api.index,
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
						if(res.data.code === 'success') {
							this.banners = res.data.banner;
							if(res.data.gglist.length != 0) {
								this.notice = res.data.gglist[0].title;
							}
							this.member_type = res.data.member_type;
							this.about_number = res.data.about_number;
							this.number = res.data.number;
							this.set = res.data.assets_list;
						}else if(res.data.code === "error") {
							uni.showToast({
								title:res.data.msg,
								icon:"none",
								duration:1500
							})
							uni.navigateTo({
								url:'../login/login'
							})
						}
					}
					
				})
			},
			getInfo() {
				uni.request({
					url:api.info,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method:"post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						this.result = res.data.result;
						Object.keys(res.data.result).forEach((key,value)=>{
							if(key === 'usdt_money' || key === "xcoin_use" || key === "jifen_money" || key === "flat_money") {
								this.set.push({
									type:key,
									value:this.result[key]
								})
							}
						})
					}
				})
			}
		}
		
	}
</script>

<style>
	.content {
		width: 100vw;
		height: calc(100% - 50px);
		margin-bottom: 16px;
	}
</style>
