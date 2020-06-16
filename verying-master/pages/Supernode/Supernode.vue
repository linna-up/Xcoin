<template>
	<view class="node" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			超级节点
		</view>
		<view class="yj">
			<view class="yj_box"><span>超级节点</span>
				<image v-for="(item,index) in Num" :key="index" src="../../static/img/team/vip.png"></image>
			</view>
		</view>
		<TeamItems v-for="(item,index) in llist " :item="item" :key="index"></TeamItems>
		<view class="yj">
			<view class="yj_box"><span>为下级开通节点</span>
				<!-- <image src="../../static/img/team/node.png"></image> -->
			</view>
		</view>
		<view class="team">
			<view class="team_box">
				<view class="team_box_left"><input placeholder="请输入手机号" v-model="tell" @input="searchPhone" /></view>
				<view class="team_box_right">
					<image src="../../static/img/my/serch.png"></image>
					搜素
				</view>
			</view>
		</view>
		<view class="box" v-if="list != null" >
			<view class="box_item">{{list.nickname}}</view>
			<view class="box_item">{{list.mobile}}</view>
			<view class="box_item box_items"><view @click="toStart">开通SVIP</view></view>
		</view>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	import TeamItems from './child/TeamItems.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				llist: [/* {
						value: 100,
						text: "团队入金"
					},
					{
						value: 100,
						text: "团队提现"
					}, */
					{
						value: 0,
						text: "沉淀池"
					}
				],
				list:null,
				tell:"",
				super_node:"",
				super_nodes:0
			}
		},
		onLoad() {
			this.getTeamList();
			this.getInfo();
		},
		methods: {
			getInfo() {
				uni.request({
					url: api.info,
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
							this.super_nodes = Number(res.data.result.super_node);
						} else {
							console.log(res);
						}
					}
				})
			},
			toStart() {
				uni.navigateTo({
					url:'../StartSuperNode/StartSuperNode?my='+this.super_node+"&it="+this.list.super_node+"&up_uid="+this.list.id
				})
			},
			toBack() {
				uni.navigateBack();
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
						console.log(res);
						if (res.data.code === "success") {
							/* this.llist[0].value = res.data.result.team_rujin;
							this.llist[1].value = res.data.result.team_tixian;
							this.llist[2].value = res.data.result.team_zijin; */
							this.llist[0].value = res.data.result.team_zijin; 
						}else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					}
				})
			},
			searchPhone(event) {
				if(event.detail.value.length === 11) {
					uni.request({
						url: api.superTeam,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id"),
							mobile:this.tell
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code === "success") {
								if(res.data.result.userinfo.length === 0) {
									this.list = null;
								}else {
									this.list = res.data.result.userinfo;
								}
								this.super_node = res.data.result.super_node;
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
			}
		},
		computed:{
			Num() {
				if(this.super_nodes === 1) {
					return 3;
				}else if(this.super_nodes === 2) {
					return 2;
				}else if(this.super_nodes === 3) {
					return 1;
				}
			}
		},
		components: {
			TeamItems
		},
		watch:{
			tell(newVal) {
				if(newVal.length !=11) {
					this.list = null;
				}
			}
		}
	}
</script>

<style scoped>
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
	.yj_box>image {
		width: 30px;
		height: 25px;
	}
	.team {
		width: 100%;
		line-height: 40px;
		height: 40px;
		border-bottom: 1px solid #E6E6E6;
	}
	.team_box {
		width: 85%;
		height: 40px;
		margin: 0 auto;
		font-size: 16px;
		display: flex;
	}
	.team_box>view {
		width: 50%;
		font-size: 16px;
	}
	.team_box>view>input {
		width: 100%;
		height: 40px;
		font-size: 16px;
	}
	.team_box_right {
		padding-right: 40px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 16px;
		line-height: 40px;
		color: #AFAFAF;
	}
	.team_box_right>image {
		width: 18px;
		height: 18px;
	}
	.box{
		width: 85%;
		line-height: 40px;
		height: 40px;
		margin: 0 auto;
		font-size: 16px;
		border-bottom: 1px solid #E6E6E6;
		display: flex;
	}
	.box_item{
		flex: 1;
		height: 40px;
		line-height: 40px;
		text-align: left;
	}
	.box_items {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box_items>view {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 2px;
		color: #FFFEFE;
		background: linear-gradient(to right,#005BA1,#01B1AE);
	}
</style>
