<template>
	<view class="setup" :style="{width:windowWidth+'px',height:(windowHeight-45)+'px'}">
		<MyItem v-for="(item,index) in list" :key="index" :list="item"></MyItem>
	</view>
</template>

<script>
	import MyItem from './child/SetUpItem.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				list:[
					/* {
						img:"../../../../../static/img/my/lan.png",
						text:"语言",
						rightText:"简体中文"
					}, */
					/* {
						img:"../../../../../static/img/my/jj.png",
						text:"计价方式",
						rightText:"CNY"
					},
					{
						img:"../../../../../static/img/my/zd.png",
						text:"涨跌色",
						rightText:"红涨绿跌"
					}, */
					{
						img:"../../../../../static/img/my/sk.png",
						text:this.$t('message').SetUp.Way,
						rightText:this.$t('message').SetUp.MGMT,
						jump:'../PutLive/PutLive'
					},
					{
						img:"../../../../../static/img/my/aq.png",
						text:this.$t('message').SetUp.Center,
						rightText:this.$t('message').SetUp.Modify,
						jump:'../SecurityCenter/SecurityCenter'
					},
					{
						img:"../../../../../static/img/my/bb.png",
						text:this.$t('message').SetUp.Version,
						rightText:this.$t('message').SetUp.New
					},
					{
						img:"../../../../../static/img/my/break.png",
						text: this.$t('message').SetUp.Logout,
						jump:"break"
					}
				]
			}
		},
		methods: {
			
		},
		components: {
			MyItem
		},
		onLoad() {
			plus.runtime.getProperty(plus.runtime.appid, (inf) => {
				console.log(inf.version);
				this.list[2].text += inf.version;
			})
		}
	}
</script>

<style scoped>
	.setup {
		
	}
</style>
