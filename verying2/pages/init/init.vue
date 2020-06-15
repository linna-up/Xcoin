<template>
	<view class="init" :style="{width:windowWidth+'px',height:windowHeight+'px'}">
		
	</view>
</template>

<script>
	import {login} from '../../commonjs/intercept.js'
	export default {
		data() {
			return {
				windowWidth: getApp().globalData.windowWidth,
				windowHeight: getApp().globalData.windowHeight,
				top: getApp().globalData.top,
			}
		},
		methods: {
			
		},
		onLoad: () => {
			
		},
		onShow: () => {
			login();
		}
	}
</script>

<style scoped>
	.init {
		background-image: url(../../static/img/bg.jpg);
		background-size: 100% 100%;
		/* background: linear-gradient(to bottom,#030C1B,#8CCEDA); */
	}

</style>
