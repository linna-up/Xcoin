<template>
	<view class="invi" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<InviNav></InviNav>
		<view class="nav_text">邀好友 赚收益</view>
		<view class="nav_texts">邀请码</view>
		<view class="nav_textss">{{address}}</view>
		<view class="qrCode">
			<image :src="img"></image>
		</view>
		<view class="btm">
			<view class="btm_item" @click="capture">保存至相册</view>
			<view class="btm_item" @click="copy(address)">复制邀请码</view>
		</view>
	</view>
</template>

<script>
	/* import {
		handleClipboard
	} from '../../commonjs/clipboard.js'
 */

	import TkiQrcode from ".../../components/tki-qrcode/tki-qrcode.vue"
	import {api} from '../../api/api.js'
	import InviNav from './child/InviNav.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				address:"",
				img:""
			}
		},
		onLoad() {
			uni.request({
				url: api.share_qrcode,
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
						this.address = res.data.result.invite_code;
						this.img = res.data.result.qrcode;
					} else {
						uni.showToast({
							title: res.data.msg,
							duration: 1500,
							icon: "none"
						})
					}
				},
			})
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
					bitmap.save("_doc/b.jpg", {}, function(i) {
						console.log('保存图片成功：' + JSON.stringify(i));
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								bitmap.clear(); //销毁Bitmap图片  
								uni.showToast({
									title: '保存图片成功',
									mask: false,
									duration: 1500,
									icon:"none"
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
			copy(data) {
				uni.setClipboardData({
					data: this.address,
					success: function() {
						console.log('success');
					}
				});
				// #ifdef H5
				uni.setClipboardData({
					data:this.address,
					success: function(data) {
						uni.showToast({
							title:"资源复制成功",
							icon:"none"
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				})
				// #endif
			}
		},
		components: {
			InviNav,
			TkiQrcode
		}
	}
</script>

<style>
	.invi {
		background-image:url(../../static/img/contract/bg.jpg);
		background-size: 100% 100%;

	}

	.nav_text {
		width: 90%;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
		font-size: 30px;
		text-align: center;
		color: #FFFEFE;
		margin-top: 15%;
		margin-bottom: 30px;
	}

	.nav_texts {
		width: 90%;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
		font-size: 20px;
		text-align: center;
		color: #EBE2ED;
	}

	.nav_textss {
		width: 90%;
		margin: 0 auto;
		height: 40px;
		line-height: 40px;
		font-size: 25px;
		text-align: center;
		color: #FFFEFE;
	}

	.qrCode {
		width: 154px;
		height: 154px;
		padding-top:  2px;
		padding-left: 2px;
		padding-bottom: 2px;
		padding-right: 2px;
		margin: 0 auto;
		background-color: #FFFEFE;
		margin-top: 30px;
		/* border: 1px solid #1B1A1C; */
	}
	.qrCode>image {
		width: 150px;
		height: 150px;
	}

	.btm {
		width: 90%;
		margin: 0 auto;
		margin-top: 30px;
		height: 40px;
		color: #FFFEFE;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.btm>view {
		width: 45%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #FFFEFE;
		font-size: 16px;
		/* background: linear-gradient(to right, #BC40A2, #F47356); */
		background-color: #0067CE;
		border-radius: 6px;
	}
</style>
