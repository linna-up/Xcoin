<template>
	<view class="mask" :style="{width:width+'px',height:height+'px'}">
		<view class="mask_box">
			<view class="mask_title">
				<view class="mask_title_left">
					申诉
				</view>
				<!-- <view class="mask_title_right">
					<image :src="showType.img"></image>
				</view> -->
			</view>
			<view class="box">
				<textarea placeholder-style="color:#ffffff;" v-model="shens" placeholder="请详细说明你要申诉的内容" />
				<view class="box_btm">
				 	<view class="add" @click="getImg">
						<image src="../../../static/img/mine/add.png"></image>
					</view>
					<image :src="img1"></image>
					<image :src="img2"></image>
					<image :src="img3"></image>
				 </view>
			</view>
			<view class="maskBtm_text" @click="shensu">提交申诉</view>
			<view class="maskBtm_btm" @click="cancel">取消</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../../api/api.js'
	import {
		pathToBase64,
		base64ToPath
	} from '../../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		name: "mask",
		props: {
			showType: null,
			order_id:""
		},
		data() {
			return {
				width: getApp().globalData.windowWidth,
				height: getApp().globalData.windowHeight,
				img1:"",
				img2:"",
				img3:"",
				shens:"",
				base1:"",
				base2:"",
				base3:"",
				images:""
			}
		},

		components: {},
		methods: {
			htmlEncode(value){
			    return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
			},
			shensu() {
				if(this.shens === "") {
					uni.showToast({
						title:"请输入申诉内容",
						icon:"none"
					})
					return;
				}
				this.images = "[";
				if(this.base1 != "") {
					this.images+= '{"id":"0","value":"'+this.base1+'"},'
					console.log("1");
				}
				if(this.base2 != "") {
					this.images+= '{"id":"1","value":"'+this.base2+'"},'
					console.log("2");
				}
				if(this.base3 != "") {
					this.images+= '{"id":"2","value":"'+this.base3+'"}'
					console.log("3");
				}
				this.images += "]";
				this.str = this.images;
				uni.request({
					url: api.up_check,
					method: "post",
					data: {
						uid: uni.getStorageSync("uid"),
						session_id: uni.getStorageSync("session_id"),
						order_id: this.order_id,
						images:this.images,
						remark:this.shens
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if(res.data.code === "success") {
							uni.showToast({
								title:"申诉成功",
								icon:"none"
							})
						}else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
						
						this.$emit("close");
					},
				})
			},
			getImg() {
				uni.chooseImage({
				    count: 3, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success:  (res)=> {
				       this.img1 = res.tempFilePaths[0];
					   this.img2 = res.tempFilePaths[1];
					   this.img3 = res.tempFilePaths[2];
					   pathToBase64(res.tempFilePaths[0]) //转base64
					   	.then(base64 => {
					   		this.base1 = base64 /* .split("base64,")[1] */ ;
					   	})
					   	.catch(error => {
					   		console.log("出错了");
					   	})
						pathToBase64(res.tempFilePaths[1]) //转base64
							.then(base64 => {
								this.base2 = base64 /* .split("base64,")[1] */ ;
							})
							.catch(error => {
								console.log("出错了");
							})
						pathToBase64(res.tempFilePaths[2]) //转base64
								.then(base64 => {
									this.base3 = base64 /* .split("base64,")[1] */ ;
								})
								.catch(error => {
									console.log("出错了");
								})
				    }
				});
			},
			cancel() {
				this.$emit("close");
			}

		},
		computed: {
			
		}
	}
</script>

<style scoped>
	.mask {
		position: fixed;
		z-index: 99999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(13,7,35, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mask_box {
		width: 100%;
		height: auto;
		padding-bottom: 8px;
		border-radius: 10px;
		background-color: #1D0F4A;
	}

	.mask_title {
		width: 100%;
		background-color: #91155E;
		height: 60px !important;
		text-align: center !important;
		line-height: 60px !important;
		color: #FFFEFE;
	}
	.box {
		width: 100%;
		height:280px;
	}
	.box>textarea {
		width: 80%;
		margin: 0 auto;
		height: 200px;
		padding: 8px;
		text-indent: 16px;
		border: 1px solid #BDBAC9;
		margin-top: 10px;
		color: #FFFEFE;
	}
	.box_btm {
		width: 80%;
		height: 70px;
		margin:  0 auto;
		display: flex;
		align-items: center;
	}
	.box_btm>view {
		width: 50px;
		height:50px;
	}
	.box_btm>view>image {
		width: 50px;
		height: 50px;
	}
	.box_btm>image {
		width: 50px;
		height: 50px;
		margin-left: 8px;
	}
	
	.maskBtm {
		width: 95%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #FFFFFF;
		margin-top: 8px;
	}

	.maskBtm>view {
		width: 45%;
		text-align: center;
		font-size: 16px;
	}

	.maskBtm_text {
		width: 95%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #FFFFFF;
		margin: 0 auto;
		margin-top: 8px;
		border-radius: 2px;
		background: linear-gradient(to right,#462470,#5F2A84);
	}

	.maskBtm_btm {
		width: 95%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		margin: 0 auto;
		color: #FFFEFE;
		margin-top: 8px;
		background-color:transparen;
		border-radius: 2px;
	}

	.chose {
		width: 95%;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 16px;
	}

	.chose>image {
		width: 30px;
		height: 30px;
	}
</style>
