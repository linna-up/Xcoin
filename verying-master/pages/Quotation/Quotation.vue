<template>
	<view class="Quotation" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<mescroll-body class="scroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption">
			<view class="title" :style="{paddingTop:top+'px'}">
				<view class="title_left">
				</view>
				<view class="title_center">行情</view>
				<view class="title_right">
					<!-- <image src="../../static/img/quotation/search.png"></image> -->
					<view class="title_right_time" @click="toJump">服务中心</view>
				</view>
			</view>
			<view class="box_title">
				<view class="box_title_left"><span>名称</span><span class="bg"></span></view>
				<view class="box_title_center"><span>最新价</span><span class="bg"></span></view>
				<view class="box_title_right"><span>涨跌幅</span><span class="bg"></span></view>
			</view>
			<view class="box" :style="{width:windowWidth+'px',height:(windowHeight-90-top)+'px'}">
				<Item v-for="(item,index) in message" :key="index" :message="item"></Item>
			</view>
			<!-- <Lists :list="xv"></Lists> -->
		</mescroll-body>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import Item from './child/QuotationItem.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				message: [],
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
				}
			}
		},
		onLoad() {
			/* setInterval(()=>{
				this.getDetail();
			},3000) */
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			/*下拉刷新的回调*/
			downCallback() {
				this.getDetail();
			},
			toJump() {
				uni.navigateTo({
					url: '../transaction/transaction'
				})
			},
			getDetail() {
				uni.request({
					url: api.hangqin,
					data: {

					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.message = res.data.result;
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
						this.mescroll.endSuccess();
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
	.Quotation {}

	.title {
		width: 100%;
		height: 45px;
		display: flex;
	}

	.title>view>image {
		width: 20px;
		height: 20px;
	}

	.title_left,
	.title_right {
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title_center {
		flex: 1;
		line-height: 45px;
		text-align: center;
	}

	.title_right_time {
		width: 85px;
		height: 25px;
		background: linear-gradient(to right, #0066A1, #00A9AC);
		font-size: 16px;
		line-height: 25px;
		text-align: center;
		border-radius: 16px;
		color: #FFFFFF;
	}

	.box_title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		display: flex;
		position: relative;
	}

	.box_title>view {
		text-align: center;
		font-size: 14px;
		color: #C4CFD8;
	}

	.bg {
		width: 14px;
		height: 14px;
		display: inline-block;
		background-image: url(../../static/img/transaction/UpsAndDowns.png);
		background-size: 100% 100%;
	}

	.box_title_left {
		width: 40%;
	}

	.box_title_center,
	.box_title_right {
		width: 30%;
	}

	.box {
		background-color: #FAF9F7;
	}

	/* .box_title>view>span::before {
		content: '     ';
		width: 16px;
		height: 16px;
		background-image: url(../../static/img/transaction/UpsAndDowns.png);
		background-size: 16px 16px;
	/* .title_left {
		padding-left: ;
	} */
</style>
