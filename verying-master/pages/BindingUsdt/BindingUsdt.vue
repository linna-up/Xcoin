<template>
	<view class="usdt" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		<view class="NoticeDetails_top" :style="{paddingTop:top+'px'}">
			<image src="../../static/img/public/back.png" @click="toBack"></image>
		</view>
		<view class="text">USDT地址</view>
		<view class="addresstext">地址</view>
		<view class="address">
			<input type="text" placeholder="请输入ERC20钱包地址" v-model="address" />
		</view>
		<view class="texts">添加收款二维码(选填)</view>
		<view class="add">
			<image src="../../static/img/mine/add.png" @click="getImg"></image>
			<image :src="img"></image>
		</view>
		<view class="btm" @click="updata">保存</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	import {
		api
	} from '../../api/api.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				img: "",
				address: "",
				base: ""
			}
		},
		methods: {
			
			updata() {
				if (this.address === "" || this.address === null || this.address === undefined) {
					uni.showToast({
						title: "请输入usdt地址",
						icon: "none"
					})
					return;
				}
				uni.request({
					url: api.updata_pay_live,
					method: "POST",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id: uni.getStorageSync('session_id'),
						set_type: "usdt",
						bank_names: "",
						bank_code: "",
						bank_address: "",
						images:this.base,
						alipay: "",
						alipay_name: "",
						wx: "",
						wx_name: "",
						address: this.address
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							setTimeout(()=>{
								uni.navigateBack();
							},1500)
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
				
			},
			toBack() {
				uni.navigateBack();
			},
			getImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.img = res.tempFilePaths[0];
						pathToBase64(res.tempFilePaths[0]) //转base64
							.then(base64 => {
								this.base = base64 /* .split("base64,")[1] */ ;
								console.log(base64);
							})
							.catch(error => {
								console.error(error)
							})
						/* uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径  
							encoding: 'base64', //编码格式  
							success: v => { //成功的回调  
								this.base = v.data // 返回的是没有 'data:image/jpeg;base64,'头的数据, 有需要可自行追加上                                 
							}
						}) */
					}
				});
			}
		}
	}
</script>

<style scoped>
	.usdt {
		background-color: #1D0F4A;
		position: relative;
		color: #FFFFFF !important;
	}

	.NoticeDetails_top {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 16px;
	}

	.NoticeDetails_top>image {
		width: 16px;
		height: 16px;

	}

	.text {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-indent: 20px;
		font-size: 25px;
		font-weight: 600;
	}

	.addresstext {
		width: 90%;
		height: 25px;
		line-height: 25px;
		font-size: 16px;
		margin: 0 auto;
	}

	.address {
		width: 90%;
		height: 35px;
		line-height: 35px;
		font-size: 18px;
		margin: 0 auto;
		border-bottom: 0.5px solid #E6E6E6;
	}

	.address>input {
		width: 100%;
		height: 100%;
	}

	.texts {
		width: 90%;
		height: 25px;
		line-height: 25px;
		font-size: 16px;
		margin: 0 auto;
		margin-top: 25px;
	}

	.add {
		width: 90%;
		height: 80px;
		margin: 0 auto;
		margin-top: 20px;
	}

	.add>image {
		width: 80px;
		height: 80px;
	}

	.yl {
		width: 90%;
		height: 150px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		background-color: #E7E7E7;
	}

	.yl>image {
		width: 60%;
		height: 150px;
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
		position: absolute;
		left: 10%;
		right: 10%;
		bottom: 10%;
	}
</style>
