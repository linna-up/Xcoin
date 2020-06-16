<template>
	<view class="coincharging" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<view class="back" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/notice/back.png" @click="back"></image>
		</view>
		<view class="content" :style="{width:windowWidth+'px',height:(windowHeight-top-46)+'px'}">
			<view class="content_title">充币</view>
			<view class="content_type">
				<view class="content_type_img">
					<image src="../../static/img/home/USDT.png"></image>
				</view>
				<view class="content_type_text">USDT(ERC20)</view>
			</view>
			<view class="content_box">
				<view class="qrCode">
					<image :src="img"></image>
					<!-- <tki-qrcode
					    ref="qrcode"
					    :val="val"
					    :size="size"
					    :unit="unit"
					    :loadMake="loadMake"
					    @result="toBase" /> -->
				</view>
				<view class="save" @click="capture">保存二维码到相册</view>
				<view class="text">充币地址</view>
				<view class="to"><p>{{val}}</p></view>
				<view class="copy" @click="copy">复制</view>
			</view>
			<view class="Explain">
				<p>请勿向上述地址充值任何ERC20_USDT资产,否则资产将不可找回。</p>
				<p>您充值到上述地址后,需要整个网络节点的确认,十二次网络确认后到账,十二次网络确认后可体现。</p>
				<p>最小充值金额: 1USDT,小于最小金额的充值将不会到账且不会退回。</p>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				img: "",
				size: 120,
				unit: "px",
				show: true,
				loadMake: false,
				val: "",
				base64: ""
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.getQr();
		},
		methods: {
			capture() {
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				console.log("当前页" + pages.length - 1);
				var bitmap = null;
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中  
				currentWebview.draw(bitmap, function() {
					console.log('截屏绘制图片成功');
					bitmap.save("_doc/a.jpg", {}, function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({
									title: '保存图片成功',
									mask: false,
									duration: 1500,
									icon: "none"
								});
							}
						});
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
			},
			getQr() {
				uni.request({
					url: api.qrCode,
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
							this.val = res.data.result.account_address;
							this.img = res.data.result.qrcode;
						} else {
							console.log(res);
						}
						/* this.$refs.qrcode._makeCode(res.data.result.account_address);
						this.$forceUpdate(); */
					}
				})
			},
			back() {
				uni.navigateBack();
			},
			copy(data) {
				uni.setClipboardData({
					data: this.val,
					success: function() {
						console.log('success');
					}
				});
				// #ifdef H5
				/* uni.setClipboardData({
					data: this.val,
					success: function(data) {
						uni.showToast({
							title: "资源复制成功",
							icon: "none"
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				}) */
				// #endif
			}
		},
		components: {

		}
	}
</script>

<style scoped>
	.coincharging {}

	.back {
		width: 100%;
		margin: 0 auto;
		padding-left: 16px;
		height: 45px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border: 1px solid #F7F7F9;
	}

	.back>image {
		width: 18px;
		height: 18px;
	}

	.content {}

	.content_title {
		width: 100%;
		height: 60px;
		font-weight: 400;
		line-height: 60px;
		text-indent: 30px;
		font-size: 25px;
	}

	.content_type {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
		padding-left: 30px;
	}

	.content_type_img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
	}

	.content_type_img>image {
		width: 30px;
		height: 30px;
	}

	.content_type_text {
		color: #0067D1;
		text-indent: 16px;
	}

	.content_box {
		width: 100%;
		background-color: #F7F6FB;
		padding-top: 30px;
		padding-bottom: 40px;
	}

	.qrCode {
		width: 150px;
		height: 150px;
		margin: 0 auto;
		/* border: 1px solid #1B1A1C; */
	}

	.qrCode>image {
		width: 150px;
		height: 150px;
	}

	.save {
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin: 0 auto;
		margin-top: 30px;
		font-size: 16px;
		color: #77A1CC;
		border: 1px solid #77A1CC;
		background-color: #E7F0F9;
	}

	.text {
		width: 150px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin: 0 auto;
		margin-top: 20px;
		font-size: 14px;
		color: #92A4B0;
	}

	.to {
		width: 300px;
		height: 60px;
		line-height: 30px;
		text-align: center;
		margin: 0 auto;
		/* margin-top: 20px; */
		font-size: 15px;
	}
	.to>p {
		width: 300px;
		height: 60px;
		line-height: 30px;
		display: inline-block;
		word-wrap: break-word;
		word-break: break-all;
	}

	.copy {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin: 0 auto;
		margin-top: 30px;
		font-size: 16px;
		color: #92A4B0;
		background-color: #E7F0F9;
	}

	.Explain {
		width: 90%;
		line-height: 20px;
		font-size: 14px;
		margin: 0 auto;
		color: #92A4B0;
		padding-top: 30px;
	}
</style>
