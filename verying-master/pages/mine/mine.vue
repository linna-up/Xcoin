<template>
	<view class="mine" :style="{width:windowWidth+'px',height:(windowHeight-50)+'px'}">
		<view class="top" :style="{paddingTop:top+'px'}">
			<view class="logo">
				<image src="../../static/img/login/login.png"></image>
			</view>
			<view class="new_btm">
				<view class="new_btm_left">{{nickname}}</view>
				<view class="new_btm_center">{{i18n.mine.tell}}: {{mobile}}</view>
				<view class="new_btm_right">{{i18n.mine.Invitation}}: {{invite_code}}</view>
			</view>
			<view class="new_img">
				<image :src="getImg"></image>
			</view>
		</view>
		<scroll-view style="width: 100%;"  class="scroll" scroll-y="true" :style="{width:windowWidth+'px',height:(windowHeight-200-50-top)+'px'}">
			<Item v-for="(item,index) in list" :key="index" :list="item" :is_real="is_real"></Item>
		</scroll-view>
		<!-- <view class="break">
			<view @click="Break">退出登录</view>
		</view> -->
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'

	import Item from './child/MyItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				invite_code: "",
				nickname: "",
				mobile: "",
				is_real:"",
				member_type: "",
				super_node:"",
				list: [{
						img: "../../../../../static/img/my/sm.png",
						text: this.$t('message').mine.RealName,
						jump: "../../../../Real/Real"
					},
					{
						img: "../../../../../static/img/my/gg.png",
						text: this.$t('message').mine.SystemNotice,
						jump: "../../../../notice/notice"
					},
					{
						img: "../../../../../static/img/my/sk.png",
						text: this.$t('message').mine.OnlinePayment,
						jump: 'pay'
					},
					{
						img: "../../../../../static/img/my/td.png",
						text: this.$t('message').mine.MyTeam,
						jump: '../../../../MyTeam/MyTeam'
					},
					/* {
						img: "../../../../../static/img/my/fx.png",
						text: "分享链接",
						jump: "../../../../InviteFriends/InviteFriends"
					}, */
					{
						img: "../../../../../static/img/my/order.png",
						text: this.$t('message').mine.TradeOrder,
						jump:"../../../../OrderList/OrderList"
					},
					{
						img: "../../../../../static/img/my/fk.png",
						text: this.$t('message').mine.ProblemFeedback,
						jump: "../../../../Problem/Problem"
					},
					{
						img: "../../../../../static/img/my/node.png",
						text: this.$t('message').mine.ServiceNode,
						jump: "../../../../NodeRules/NodeRules"
					},
					{
						img: "../../../../../static/img/my/sz.png",
						text: this.$t('message').mine.SetFocus,
						jump: "../../../../SetUp/SetUp"
					},
				]
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getInfo();
		},
		methods: {
			Break() {
				
			},
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
							this.mobile = res.data.result.mobile;
							this.nickname = res.data.result.nickname;
							this.invite_code = res.data.result.invite_code;
							this.member_type = res.data.result.member_type;
							this.super_node = res.data.result.super_node;
							this.is_real = res.data.result.is_real;
						} else {
							console.log(res);
						}
					}
				})
			}
		},
		watch: {
			super_node(newVal) {
				if(newVal === "1" ||newVal === "2" || newVal === "3") {
					this.list.splice(7,0,{
						img: "../../../../../static/img/my/jd.png",
						text: this.$t('message').mine.SuperNode,
						jump: "../../../../Supernode/Supernode"
					});
				}
			}
			
		},
		components: {
			Item
		},
		computed: {
			i18n () {
				return this.$t('message'); 
			},
			getImg() {
				if(this.member_type === "0") {
					return "../../../../../static/img/team/v.png"
				}else if(this.member_type === "1") {
					return "../../../../../static/img/team/v1.png"
				}else if(this.member_type === "2") {
					return "../../../../../static/img/team/v2.png"
				}else if(this.member_type === "3") {
					return "../../../../../static/img/team/v3.png"
				}else if(this.member_type === "4") {
					return "../../../../../static/img/team/v4.png"
				}else if(this.member_type === "4") {
					return "../../../../../static/img/team/node.png"
				}
			}
		}
	}
</script>

<style scoped>
	.mine {
		background-image: url("../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
	}

	.top {
		width: 100%;
		height: 200px;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.logo {
		width: 80px;
		height: 80px;
	}

	.logo>image {
		width: 100%;
		height: 100%;
	}

	.new_btm {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 0px;
		font-size: 14px;
		text-align: center;
		color: #0CF2FF!important;
	}

	.new_btm_left {
		width: 20%;
	}

	.new_btm_center {
		width: 50%;

	}

	.new_btm_right {
		width: 30%;
	}

	.new_img {
		width: 60px;
		height: 30px;
		background-image: linear-gradient(to right, #0CF2FF, #5DA2FF);
		border-top-left-radius: 16px;
		border-bottom-left-radius: 16px;
		padding-left: 16px;
		position: absolute;
		right: 0px;
	}

	.new_img>image {
		margin-top: 5px;
		width: 20px;
		height: 20px;

	}

	.top_top {
		width: 100%;
		height: 65%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.top_btm {
		width: 100%;
		height: 35%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 15px;
	}

	.top_btm_item {
		width: 30%;
		height: 100%;
		text-align: center;
	}

	.top_top_left {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.top_top_left>image {
		width: 80px;
		height: 80px;
	}

	.top_top_center {
		width: 40%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 17px;
	}

	.top_top_center_box {
		width: 100%;
	}

	.top_top_right {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.top_top_right_box {
		width: 80px;
		height: 30px;
		background-image: linear-gradient(to right, #0CF2FF, #5DA2FF);
		border-top-left-radius: 16px;
		border-bottom-left-radius: 16px;
		padding-left: 16px;
		position: relative;
	}

	.top_top_right_box>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 5px;
		bottom: 5px;
	}

	.break {
		width: 100%;
		height: 45px;
		line-height: 45px;
		position: absolute;
		bottom: 30px;
	}

	.break>view {
		width: 90%;
		height: 45px;
		margin: 0 auto;
		background-color: #0066A1;
		color: #FFFFFF;
		font-size: 18px;
		text-align: center;
		border-radius: 8px;
	}
	.scroll {
		height: calc(100% - 200px - 16px);
	}
</style>
