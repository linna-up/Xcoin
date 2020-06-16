<template>
	<view class="contractualing">
		<Title @back="back"></Title>
		<Panel :list="list" :id="id" @Show="Show" @reset="reset"></Panel>
		<ConMask v-if="isShow" @TellSuper="TellSuper" ></ConMask>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/api.js'
	import Title from './child/title.vue'
	import Panel from './child/panel.vue'
	import ConMask from './child/ContranMask.vue'
	export default {
		data() {
			return {
				session_id: uni.getStorageSync("session_id"),
				uid: uni.getStorageSync("uid"),
				list: {},
				id: 0,
				isShow: false
			}
		},
		components: {
			Title,
			Panel,
			ConMask
		},
		onLoad(option) {
			console.log(option.id);
			this.id = option.id;
			
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			reset() {
				this.getDetail();
			},
			TellSuper(val) {
				console.log(val);
				if(val === "no"){
					this.isShow = !this.isShow;
				}else {
					uni.request({
						url: api.to_quit,
						data: {
							uid: uni.getStorageSync("uid"),
							session_id: uni.getStorageSync("session_id")
							/* id: 1 */
						},
						method: "post",
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(this.session_id);
							console.log(res);
							if (res.data.code === "success") {
								uni.showToast({
									title: res.data.msg,
									duration: 1500,
									icon: "none"
								})
							} else {
								uni.showToast({
									title: res.data.msg,
									duration: 1500,
									icon: "none"
								})
							}
						}
					})
					this.isShow = !this.isShow;
				}
			},
			Show() {
				this.isShow = !this.isShow;
			},
			back() {
				uni.switchTab({
					url: '../contract/contract'
				});
			},
			getDetail() {
				uni.request({
					url: api.createing,
					data: {
						uid: this.uid,
						session_id: this.session_id
					},
					method: "post",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === "success") {
							this.list = res.data.result;
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon: "none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.contractualing {
		width: 100vw;
		height: 100vh;
		background-image: url("../../static/img/contract/bg.jpg");
		background-size: 100% 100%;
	}
</style>
