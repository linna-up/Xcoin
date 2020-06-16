<template>
	<view class="pro" :style="{width:windowWidth+'px',height:(windowHeight)+'px'}">
		<ProNav></ProNav>
		<textarea placeholder="请详细说明您要反馈的内容" v-model="content"></textarea>
		<view class="tell">
			<view style="font-size: 16px;">联系方式</view>
			<input type="text" :value="mobile" />
		</view>
		<!-- <view class="btm">
			<view class="text">上传凭证(选填)</view>
			<image src="../../static/img/putlive/add.png" @click="getImg"></image>
			<image :src="img"></image>
			<image :src="imgs"></image>
			<image :src="imgss"></image>
		</view> -->
		<view class="btn" @click="upProblem">确定提交</view>
	</view>
</template>

<script>
	import {api} from '../../api/api.js'
	import ProNav from './child/ProNav.vue'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
				img:"",
				imgs:"",
				imgss:"",
				mobile:"",
				content:""
			}
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				uni.request({
					url: api.info,
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
							this.mobile = res.data.result.mobile;
						} else {
							console.log(res);
						}
					}
				})
			},
			getImg() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						this.img = res.tempFilePaths[0];
						this.imgs = res.tempFilePaths[1];
						this.imgss = res.tempFilePaths[2];
					}
					/* uni.uploadFile({
						url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data);
						}
					}); */
				});
			},
			upProblem() {
				if(this.content === "") {
					uni.showToast({
						title:"请输入您要反馈的问题",
						icon:"none"
					})
					return;
				}
				uni.request({
					url: api.message_add,
					method: "post",
					data: {
						uid: uni.getStorageSync('uid'),
						session_id:uni.getStorageSync('session_id'),
						content:this.content,
						mobile:this.mobile
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === "success") {
							this.content = "";
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					},
				})
			}
		},
		components: {
			ProNav
		}
	}
</script>

<style scoped>
	.pro {
		
	}
	textarea {
		width: 90%;
		margin: 0 auto;
		height: 200px;
		line-height: 20px;
		padding: 8px;
		border:0.5px solid #C9C9C9 ;
		border-radius: 3px;
		text-indent: 16px;
	}
	.tell {
		width: 90%;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.tell>input {
		width: 100%;
		height: 30px;
		color: #E8E7E7;
	}
	.btm {
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
		height: 60px;
		display: flex;
		align-items: center;
	}
	.text {
		width: 60px;
		height: 60px;
		line-height: 30px;
		font-size: 15px;
		text-align: center;
	}
	.btm>image {
		width: 60px;
		height: 60px;
		margin-left: 8px;
	}
	.btn {
		width: 90%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		margin: 0 auto;
		color: #FFFEFE;
		margin-top: 30px;
		font-size: 16px;
		background-color: #0066A1;
		border-radius: 6px;
	}
</style>
