<template>
	<view class="contract">
		<mescroll-body class="scroll" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption">
			<Title></Title>
			<Cumulative :leiji_invest="leiji_invest" :leiji_earnings="leiji_earnings"></Cumulative>
			<Top></Top>
			<!-- <scroll-view scroll-x="true" class="box"> -->
				<Panel @tellSuperToCreate="tellSuperToCreate" :list="list" :contract_amount="contract_amount" :contract_status_name="contract_status_name"
				 :contract_status="contract_status" @refsher="refsher" 
					:option="option[optionIndex]" :optionIndex="optionIndex" @tellCoinTypeMask="tellCoinTypeMask"
				 ></Panel>
			<!-- </scroll-view> -->
			<!-- <Detailed :day_yq_earnings="day_yq_earnings" :all_yq_earnings="all_yq_earnings" :day_td_earnings="day_td_earnings"
			 :all_td_earnings="all_td_earnings" :day_jd_earnings="day_jd_earnings" :all_jd_earnings="all_jd_earnings"></Detailed> -->
		</mescroll-body>
		<CMask v-if="isShow" :list="list" @operation="operation"></CMask>
		<TypeMask v-if="MaskShow" :list="option" @operationType="operationType"></TypeMask>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'

	import Title from './child/ctitle.vue'
	import Cumulative from './child/cumulative.vue'
	import Top from './child/top.vue'
	import Panel from './child/panel.vue'
	import Detailed from './child/detailed.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import CMask from './child/CMask.vue'
	import TypeMask from './child/TypeMask.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				leiji_invest: "0", //累计投资
				leiji_earnings: "0", //累计收益
				day_yq_earnings: "0", //今日邀请收益
				all_yq_earnings: "0", //累计个人收益
				day_td_earnings: "0", //今日团队收益
				all_td_earnings: "0", //累计团队收益
				day_jd_earnings: "0", //节点收益
				all_jd_earnings: "0", //超级节点收益
				money_list: [],
				contract_amount: 0,
				contract_status_name: "",
				contract_status: 0,
				isShow: false,
				lists:[100,300,500,1000,3000,5000],

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
				option:["USDT","X币"],
				optionIndex:0,
				MaskShow:false
			}
		},
		computed: {
			list() {
				let arr = [];
				for (let i = 0; i < this.money_list.length; i++) {
					arr.push(Number(this.money_list[i].value));
				}
				return arr;
			},
			getId() {
				for (let i = 0; i < this.money_list.length; i++) {
					if (this.contract_amount === this.money_list[i].value) {
						return this.money_list[i].id
					}
				}
			}
		},
		onLoad() {
			uni.$on('CMask', (data) => {
				uni.showTabBar();
				this.isShow = !this.isShow;
			})
		},
		onShow() {
			this.getContraInfo();
		},
		components: {
			Title,
			Cumulative,
			Top,
			Panel,
			Detailed,
			CMask,
			TypeMask
		},
		methods: {
			operation(val) {
				console.log(val);
				this.isShow = !this.isShow;
				this.contract_amount= this.list[val];
			},
			downCallback() {
				this.getContraInfo();
				setTimeout(() => {
					this.mescroll.endSuccess();
				}, 3000)
			},
			refsher() {
				this.getContraInfo();
			},
			tellSuperToCreate() {
				uni.navigateTo({
					url: '../contractualing/contractualing?id=' + this.contract_status
				});
			},
			tellCoinTypeMask() {
				this.MaskShow = !this.MaskShow;
			},
			operationType(index) {
				this.optionIndex = index;
				this.MaskShow = !this.MaskShow;
			},
			getContraInfo() {
				uni.request({
					url: api.contract_info,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id")
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.code === "success") {
							this.leiji_invest = res.data.result.leiji_invest;
							this.leiji_earnings = res.data.result.leiji_earnings;
							this.day_yq_earnings = res.data.result.day_yq_earnings;
							this.all_yq_earnings = res.data.result.all_yq_earnings;
							this.day_td_earnings = res.data.result.day_td_earnings;
							this.all_td_earnings = res.data.result.all_td_earnings;
							this.day_jd_earnings = res.data.result.day_jd_earnings;
							this.all_jd_earnings = res.data.result.all_jd_earnings;
							this.money_list = res.data.result.money_list;
							this.contract_amount = res.data.result.contract_amount;
							this.contract_status_name = res.data.result.contract_status_name;
							this.contract_status = res.data.result.contract_status;
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
		}
	}
</script>

<style scoped>
	.contract {
		width: 100vw;
		height: 100vh;
		background-image: url("../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
		/* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif */
	}

	.box {
		width: 100vw;
		height: 45vh;
		white-space: nowrap;
	}
</style>
