<template>
	<view class="pay" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="title" :style="{paddingTop:top+'px'}">
			<view class="title_left" :style="{top:top}" @click="back">
				<image src="../../static/img/notice/back.png"></image>
			</view>
			实名认证
		</view>
		<view class="two_item">
			<view class="two_item_left">真实姓名</view>
			<view class="two_item_right">
				<input type="text" placeholder="请输入真实姓名" maxlength="4" v-model="username" />
			</view>
		</view>
		<view class="two_item">
			<view class="two_item_left">身份证号</view>
			<view class="two_item_right">
				<input type="text" placeholder="请输入身份证号" v-model="cardId" />
			</view>
		</view>
		<view class="box">
			<image class="img" :src="img" @click="getImg"></image>
			<image class="img" :src="imgs" @click="getImgs"></image>
		</view>
		<view class="btm" @click="id_card">提交</view>

	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				username: "",
				cardId: "",
				img: "../../static/img/ass/zm.png",
				imgs:"../../static/img/ass/fm.png",
				base1:"",
				base2:""
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			getImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.img = res.tempFilePaths[0];
						console.log(res.tempFilePaths[0]);
						pathToBase64(res.tempFilePaths[0]) 
							.then(base64 => {
								this.base1 = base64;
							})
							.catch(error => {
								console.error(error)
							})
					}
				})
			},
			getImgs() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgs = res.tempFilePaths[0];
						pathToBase64(res.tempFilePaths[0]) //转base64
							.then(base64 => {
								this.base2 = base64;
							})
							.catch(error => {
								console.error(error)
							})
					}
				})
			},
			zip(src) {
				plus.zip.compressImage({ //压缩图片 参数
					src: entry.fullPath,
					dst: "_doc/imgs.jpg",
					quality:80,
					overwrite: true,
					width: "1080",
					height: "1920"
				}, () => {
					pathToBase64("_doc/imgs.jpg") //转base64
						.then(base64 => {
							this.base2 = base64 /* .split("base64,")[1] */ ;
							this.imgs = base64;
						})
						.catch(error => {
							console.error(error)
						})
				}, () => {});
			},
			IsCard(str) {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (reg.test(str)) {
					return true;
				} else {
					return false;
				}
			},
			id_card() {
				if (this.username === "") {
					uni.showToast({
						title: "请输入您的姓名",
						icon: "none"
					})
					return;
				}
				else if (this.cardId === "") {
					uni.showToast({
						title: "请输入您的身份证号",
						icon: "none"
					})
					return;
				}else if( !(this.IsCard(this.cardId)) ) {
					uni.showToast({
						title: "您的身份证号有误",
						icon: "none"
					})
					return;
				}else if(this.base1 === "") {
					uni.showToast({
						title: "请上传正面身份证照片",
						icon: "none"
					})
					return;
				}else if(this.base2 === "") {
					uni.showToast({
						title: "请上传反面身份证照片",
						icon: "none"
					})
					return;
				}
				uni.request({
					url: api.id_card,
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						name: this.username,
						idcard: this.cardId,
						idcard_img:this.base1,
						idcard_img_f:this.base2
						
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(this.username);
						console.log(this.cardId);
						console.log(res);
						if(res.data.code === "success") {
							uni.showToast({
								title: "认证成功!",
								icon: "none"
							})
							setTimeout(()=>{
								uni.navigateBack();
							},1500)
						}else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					},
				})
			}
		},
		onLoad: () => {

		}
	}
</script>

<style scoped>
	.pay {}

	.title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-bottom: 15px;
	}

	.title_left {
		position: absolute;
		width: 60px;
		height: 50px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title_left>image {
		width: 18px;
		height: 18px;
	}

	.two_item {
		width: 100%;
		height: 35px;
		line-height: 35px;
		display: flex;
		font-size: 16px;
	}

	.two_item_left {
		width: 30%;
		height: 35px;
		text-align: center;
	}

	.two_item_right {
		flex: 1;
		height: 35px;
	}

	.two_item_right>input {
		width: 100%;
		height: 35px;
	}

	.btm {
		width: 90%;
		height: 50px;
		position: fixed;
		bottom: 30px;
		left: 5%;
		background-color: #0066A1;
		border-radius: 3px;
		text-align: center;
		line-height: 50px;
		color: #FFFFFF;
		font-size: 16px;
	}
	.box {
		width: 100%;
		height: auto;
		margin-top: 8px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.img {
		width: 316px;
		height: 200px;
	}
</style>
