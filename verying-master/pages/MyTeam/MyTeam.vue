<template>
	<view class="team" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			我的团队
		</view>
		<view class="yq" @click="toTeamList">
			<view class="yq_box">
				<view class="yq_box_left">
					<image src="../../static/img/team/team.png"></image>
					<span>团队人数</span>
				</view>
				<view class="yq_box_right">{{result.team_num}}人
					<view class="img">
						<image src="../../static/img/mine/right.png" ></image>
					</view>
				</view>
			</view>
		</view>
		<view class="yqs" @click="toClassAList">
			<view class="yq_box">
				<view class="yq_box_left">
					<image src="../../static/img/team/yq.png"></image>
					<span>引导人数</span>
				</view>
				<view class="yq_box_right">{{result.rec_num}}人
					<view class="img">
						<image src="../../static/img/mine/right.png" ></image>
					</view>
				</view>
			</view>
		</view>
		<view class="yj">
			<view class="yj_box">邀请人数</view>
		</view>
		<view class="title">
			<view>用户名</view>
			<view>手机号</view>
			<view>合约金额</view>
			<view>等级</view>
			<view>状态</view>
		</view>
		<!-- <TeamItem v-for="(item,index) in list " :item="item" :key="index"></TeamItem> -->
		<ItemList v-for="(item,index) in itemIist " :list="item" :key="index"></ItemList>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'

	import TeamItem from './child/TeamItem.vue'
	import ItemList from './child/TeamClassAItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				num: 0,
				result:{},
				list: [{
						value: 100,
						text: "当日直推佣金"
					},
					{
						value: 100,
						text: "累计直推佣金"
					},
					{
						value: 100,
						text: "当日团队佣金"
					},
					{
						value: 100,
						text: "累计团队佣金"
					},
					{
						value: 100,
						text: "累计佣金"
					}
				],
				llist: [{
						value: 100,
						text: "团队入金"
					},
					{
						value: 100,
						text: "团队提现"
					},
					{
						value: 100,
						text: "沉淀资金"
					}
				],
				page: 1,
				itemIist: []
			}
		},
		onLoad() {
			this.getTeamList();
			this.getZtList();
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			toClassAList() {
				uni.navigateTo({
					url: '../ClassAList/ClassAList'
				})
			},
			toTeamList() {
				uni.navigateTo({
					url: '../TeamList/TeamList'
				})
			},
			getZtList() {
				uni.request({
					url: api.team_list,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						page: this.page
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.itemIist = res.data.list;
							console.log(this.itemIist);
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					}
				})
			},
			getTeamList() {
				uni.request({
					url: api.team_all,
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
							this.result = res.data.result;
							this.list[0].value = res.data.result.day_rec_jin;
							this.list[1].value = res.data.result.all_rec_jin;
							this.list[2].value = res.data.result.day_team_jin;
							this.list[3].value = res.data.result.all_team_jin;
							this.list[4].value = res.data.result.all_zongjin;
							this.llist[0].value = res.data.result.team_rujin;
							this.llist[1].value = res.data.result.team_tixian;
							this.llist[2].value = res.data.result.team_zijin;
						}else {
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
			TeamItem,
			ItemList
		}
	}
</script>

<style scoped>
	.team {}

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

	.yq {
		width: 100%;
		line-height: 40px;
		height: 40px;
		border-bottom: 1px solid #E6E6E6;
		margin-top: 15px;
	}

	.yqs {
		width: 100%;
		line-height: 40px;
		height: 40px;
		border-bottom: 1px solid #E6E6E6;
	}

	.yq_box {
		width: 85%;
		height: 40px;
		margin: 0 auto;
		font-size: 16px;
		display: flex;
	}

	.yj_box>image {
		width: 30px;
		height: 20px;
	}

	.yq_box_left {
		width: 50%;
		display: flex;
		align-items: center;
	}

	.yq_box_left>image {
		width: 16px;
		height: 16px;
	}

	.yq_box_left>span {
		width: 100px;
		padding-left: 8px;
		display: inline-block;
	}

	.yq_box_right {
		width: 50%;
		text-align: right;
		padding-right: 40px;
		position: relative;
	}

	.img {
		width: 30px;
		height: 40px;
		position: absolute;
		top: 0px;
		right: 0px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.img>image {
		width: 16px;
		height: 16px;
	}

	.yj {
		width: 100%;
		line-height: 50px;
		height: 50px;
		background-color: #E6E6E6;
	}

	.yj_box {
		width: 85%;
		height: 50px;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.yj_box>span {
		margin-right: 8px;
	}
	.title {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		font-size: 14px;
		text-align: center;
		border-bottom: 1px solid #E6E6E6;
	}
	
	.title>view {
		width: 20%;
	}
</style>
