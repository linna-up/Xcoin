<template>
	<view class="addressmask" :style="{width:windowWidth+'px',height:(windowHeight-50)+'px'}">
		<view class="box">
			<view class="box_item" v-for="(item,index) in list" :key="index" @click="operation(index)">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CMask",
		props: {
			list: null
		},
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top
			}
		},
		methods: {
			operation(index) {
				if(index === 4 || index === 5) {
					uni.showToast({
						title:"暂未开放",
						icon:"none"
					})
					return;
				}
				this.$emit("operation", index)
			}
		},
		components: {

		}
	}
</script>

<style scoped>
	.addressmask {
		background-color: rgb(204, 204, 204, 0.8);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		background-color: #00040F;
	}

	.box_item {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-bottom: 1px solid #0CF2FF;
		color: #0CF2FF;
	}
</style>
