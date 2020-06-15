<template>
	<view class="title" :style="{paddingTop:top+'px'}">
		{{$t('message').mine.information.Property}}
	</view>
</template>

<script>
	export default {
		name:"InfoTitle",
		data() {
			return {
				top:getApp().globalData.top
			}
		}
	}
</script>

<style scoped>
	.title {
		width: 100%;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
