<template>
	<view class="node" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="node_title" :style="{paddingTop:top+'px'}">
			<view class="node_title_img">
				<image src="../../static/img/notice/back.png" @click="back"></image>
			</view>
			节点规则
		</view>
		<scroll-view scroll-y="true" class="content" >
			<view v-html="content">
			</view>
		</scroll-view>
		<view class="btm" @click="toApply">申请节点</view>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth:getApp().globalData.windowWidth,
				windowHeight:getApp().globalData.windowHeight,
				top:getApp().globalData.top,
				content:null
			}
		},
		onLoad(){
			this.getNodeRules()
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			toApply() {
				uni.navigateTo({
					url:"../ApplyNode/ApplyNode"
				})
			},
			getNodeRules() {
				uni.request({
					url:api.node_rule,
					data: {
						
					},
					method:"post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						this.content = res.data.result.content;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.node {
		background-image: url(../../static/img/contract/bg.jpg);
		background-size: 100% 100%;
		position: relative;
	}
	
	.node_title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		color: #FFFFFF;
		text-align: center;
		font-size: 16px;
		position: relative;
	}
	.node_title_img{
		width: 45px;
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
	}
	.node_title_img>image {
		width: 18px;
		height: 18px;
	}
	.content {
		width: 80%;
		height: 70%;
		color: #FFFFFF;
		margin: 0 auto;
		font-size: 16px;
		line-height: 30px;
	}
	
	.btm {
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin: 0 auto;
		font-size: 18px;
		color: #FFFFFF;
		background-color: #0066A1;
		border-radius: 5px;
		margin-top: 30px;
	}
</style>
