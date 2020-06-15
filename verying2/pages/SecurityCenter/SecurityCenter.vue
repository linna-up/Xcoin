<template>
	<view class="center" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="notice_title" :style="{paddingTop:top+'px'}">
			<view class="notice_title_left" @click="toBack">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			{{$t('message').SecurityCenter.Center}}
		</view>
		<SetUpItem v-for="(item,index) in list" :key="index" :list="item"></SetUpItem>
	</view>
</template>

<script>
	import SetUpItem from '../SetUp/child/SetUpItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				list:[
					{
						img:"../../../../../static/img/my/us.png",
						text:this.$t('message').SecurityCenter.LoginPw,
						rightText:this.$t('message').SecurityCenter.Update,
						jump:'../PasswordUpdate/PasswordUpdate'
					},
					{
						img:"../../../../../static/img/my/pwd.png",
						text:this.$t('message').SecurityCenter.TradingPw,
						rightText:this.$t('message').SecurityCenter.Set,
						jump:'../CapitalUpdate/CapitalUpdate'
					}
				]
			}
		},
		methods: {
			toBack() {
				uni.navigateBack();
			}
		},
		components:{
			SetUpItem
		}
	}
</script>

<style scoped>
	.center {
		
	}
	.notice_title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #FFFFFF;
		padding-bottom: 15px;
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
</style>
