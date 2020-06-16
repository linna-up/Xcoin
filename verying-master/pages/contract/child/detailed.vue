<template>
	<view class="detailed">
		<view class="title">团队</view>
		<view class="detailed_box" >
			<view class="detailed_item" v-for="(item,index) in earnings" :key="index" :style="{width:showWidth}">
				<h3>{{item.name}}</h3>
				<p>{{item.value}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"detailed",
		props: {
			day_yq_earnings:{
				type:String,
				default:"0.00"
			}, //今日邀请收益
			all_yq_earnings:{
				type:String,
				default:"0.00"
			}, //累计个人收益
			day_td_earnings: {
				type:String,
				default:"0.00"
			}, //今日团队收益
			all_td_earnings: {
				type:String,
				default:"0.00"
			}, //累计团队收益
			day_jd_earnings: {
				type:String,
				default:"0.00"
			}, //节点收益
			all_jd_earnings: {
				type:String,
				default:"0.00"
			} //超级节点收益
		},
		data() {
			return {
				isShow:true
			}
		},
		computed:{
			earnings() {
				if(this.isShow) {
					return [
						{
							name:"今日邀请收益",
							value:this.day_yq_earnings
						},
						{
							name:"今日团队收益",
							value:this.day_td_earnings
						},
						{
							name:"累计个人收益",
							value:this.all_yq_earnings
						},
						{
							name:"累计团队收益",
							value:this.all_td_earnings
						},
						{
							name:"节点收益",
							value:this.day_jd_earnings
						},
						{
							name:"超级节点收益",
							value:this.all_jd_earnings
						}
					]
				}else {
					return [
						{
							name:"今日邀请收益",
							value:this.day_yq_earnings
						},
						{
							name:"今日团队收益",
							value:this.day_td_earnings
						},
						{
							name:"累计个人收益",
							value:this.all_yq_earnings
						},
						{
							name:"累计团队收益",
							value:this.all_td_earnings
						}
					]
				}
			},
			showWidth() {
				if(this.isShow==true) {
					return 30+'%';
				}else {
					return 45+'%';
				}
			}
		}
	}
</script>

<style scoped>
	.detailed {
		width: 100vw;
		height: 25vh;
	}
	.title {
		width: 90%;
		height: 25px;
		font-size: 16px;
		color: #FFFFFF;
		margin: 0 auto;
		margin-top: 20px;
	}
	.detailed_box {
		width: 100%;
		height: 15vh;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	}
	.detailed_item {
		width: 45%;
		height: 55px;
		color: #FFFFFF;
		background-color: transparent;
		border: 0.5px solid #36F2E9;
		text-align: center;
		border-radius: 8px;
		margin-top: 8px;
	}
	.detailed_item>h3 {
		font-size: 13px;
		height: 30px;
		line-height: 30px;
	}
	.detailed_item>p{
		font-size: 12px;
		height: 25px;
		line-height: 25px;
	}
</style>
