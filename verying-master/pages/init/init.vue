<template>
	<view class="init" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="progress" v-if="show">
			<view class="progress_item" :style="{width:width+'%'}"></view>
			<view class="progress_text" v-if="show">{{width}}%</view>
		</view>
	</view>
</template>

<script>
	import {login} from '../../commonjs/intercept.js'
	import {api} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				width:0,
				show:false
			}
		},
		methods: {
			
		},
		onLoad: () => {
			
		},
		onShow() {
			plus.runtime.getProperty(plus.runtime.appid, (inf) => {
				var wgtVer = inf.version;
				console.log(wgtVer);
				uni.request({
					url: api.server,
					method: "POST",
					data: {
						ver: wgtVer
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === 1) {
							uni.showModal({ //提醒用户更新
								title: "更新提示",
								content: res.data.upmsg,
								success: (ress) => {
									if (ress.confirm) {
										this.downWgt(res.data.url);
									}else {
										login();
									}
								}
							})
						} else {
							login();
						}
					},
				})
			})
		},
		methods: {
			downWgt(url) {
				uni.showToast({
					title: "下载中",
					icon: "none"
				})
				let downloadTask = uni.downloadFile({
					url: url,
					success: (downloadResult) => {
						console.log(url);
						console.log(downloadResult);
						if (downloadResult.statusCode === 200) {
							console.log(downloadResult.tempFilePath);
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {
								console.log('install success...');
								uni.showToast({
									title: "等待重启",
									icon: "none"
								})
								setTimeout(()=>{
									plus.runtime.restart();
								},1500)
							}, function(e) {
								console.error('install fail...');
							});
						}
					}
				});
				downloadTask.onProgressUpdate((res) => {
					this.show = true;
					console.log('已下载' + res.progress + '%');
					this.width = res.progress;
					if(res.progress === 100) {
						uni.showToast({
							title: "下载完成",
							icon: "none"
						})
						this.show = false;
					}
				});
			
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						
					}, 3000)
				})
			}
		}
	}
</script>

<style scoped>
	.init {
		background-image: url(../../static/img/bg.jpg);
		background-size: 100% 100%;
		/* background: linear-gradient(to bottom,#030C1B,#8CCEDA); */
	}
	.progress_text {
		width: 100%;
		margin-top: 4px;
		text-align: center;
		color: #00A3AC;
		font-size: 16px;
	}
	.progress {
		width: 80%;
		height: 4px;
		border: 1px solid #F7F6FB;
		border-radius: 2px;
		position: fixed;
		left: 10%;
		right: 10%;
		top: 60%;
		color: #00A3AC;
	}
	.progress_item {
		height: 4px;
		background-color: #00A3AC;
		border-radius: 2px;
	}
</style>
