<template>
	<view class="item">
		<view>{{list.username}}</view>
		<view class="tell">{{list.mobile}}</view>
		<view>{{list.contract_amount}}</view>
		<view class="img">
			<!-- {{getGradeText}} -->
			<image :src="getGrade"></image>
		</view>
		<view>{{list.contract_status_name}}</view>
	</view>
</template>

<script>
	export default {
		name: "ClassAItem",
		props: {
			list: null
		},
		data() {
			return {
				img: ''
			}
		},
		created() {
			console.log(this.list);
		},
		methods: {

		},
		computed: {
			/* getStatu() {
				if(this.list.contract_status_name === 0) {
					return '在线'
				}else if(this.list.contract_status_name === 1) {
					return '离线'
				}
			}, */
			getGrade() {
				if (this.list.member_type === "0") {
					return "../../../../../static/img/team/v.png"
				} else if (this.list.member_type === "1") {
					return "../../../../../static/img/team/v1.png"
				} else if (this.list.member_type === "2") {
					return "../../../../../static/img/team/v2.png"
				} else if (this.list.member_type === "3") {
					return "../../../../../static/img/team/v3.png"
				} else if (this.list.member_type === "4") {
					return "../../../../../static/img/team/v4.png"
				} else if (this.list.member_type === "4") {
					return "../../../../../static/img/team/node.png"
				}
			},
			getGradeText() {
				if (this.list.member_type === "0") {
					return '普通会员'
				} else if (this.list.member_type === "6") {
					/* this.img = ''; */
					return '市场节点'
				} else if (this.list.member_type === "7") {
					/* this.img = ''; */
					return '超级节点'
				}
			}
		}
	}
</script>

<style scoped>
	.item {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		font-size: 14px;
		text-align: center;
		border-bottom: 1px solid #E6E6E6;
	}

	.item>view {
		width: 20%;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.img {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img>image {
		width: 16px;
		height: 16px;
	}
</style>
