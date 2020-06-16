<template>
	<!-- 资产 -->
	<view class="assets">
		<view class="assets_box">
			<view class="assets_title">
				总资产(CNY)
			</view>
			<view class="assets_number">
				<view class="assets_number_left">
					￥{{number}}
				</view>
				<view class="assets_number_right">
					<view class="assets_number_right_box">
						<image :src="getImg"></image>
					</view>
				</view>
			</view>
			<view class="assets_about_number">
				(含 {{about_number}} X币)
			</view>
		</view>
		<image src="../../../static/img/index/assets.png"></image>
	</view>
</template>

<script>
	export default {
		name:"assets",
		props: {
			number:{
				type:String,
				default:"0"
			},
			about_number: {
				type:String,
				default:"0"
			},
			member_type: {
				type:String,
				default:"1"
			}
			
		},
		created() {
			console.log(this.number);
		},
		data() {
			return {
				
			}
		},
		computed: {
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
			/* getNumber() {
				return this.number.toFixed(4)
			} */
		}
	}
</script>

<style scoped>
	.assets {
		width: 90%;
		height: 80px;
		margin: 0 auto;
	/* 	margin-top: 20px; */
		padding-top: 8px;
		position: relative;
		padding-bottom: 16px;
		border: 1px solid #DBDBDB;
		 box-shadow: 0 0 5px #888888;
	}
	.assets>image {
		width: 80px;
		height: 90px;
		position: absolute;
		left: 5px;
	}
	.assets_box {
		width: 90%;
		height: 100%;
		float: right;
	}
	.content>view {
		width: 90%;
	}
	.assets_title {
		padding-left: 70px;
		height:20px ;
		font-size: 15px;
	}
	.assets_about_number {
		height: 18px;
		font-size: 14px;
		padding-left: 70px;
	}
	.assets_number {
		padding-left: 70px;
		height: 40px;
		font-size: 22px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.assets_number>view {
		flex: 1;
	}
	.assets_number_right {
		display: flex;
		flex-direction: column-reverse;
		justify-content: end;
		align-items:flex-end;
	}
	.assets_number_right_box {
		/* width: 60%;
		height: 30px;
		border: 1.2px solid #010101;
		-webkit-border-top-left-radius: 16px;
		-webkit-border-bottom-left-radius:16px; */
		width: 60px;
		height: 30px;
		background-image: linear-gradient(to right, #0CF2FF, #5DA2FF);
		border-top-left-radius: 16px;
		border-bottom-left-radius: 16px;
		padding-left: 16px;
		position: absolute;
		/* padding-top: 5px; */
		top: 5px;
		right: 0px;
	}
	.assets_number_right_box>image {
		width: 20px;
		height: 20px;
		padding-top: 5px;
		padding-bottom: 5px;
		padding-left: 10px;
	}
</style>
