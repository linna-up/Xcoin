<template>
	<view class="item">
		<view class="item_btm" :class="{active:index === activeIndex}">
			<view class="item_btm_top"><image :src="getImg"></image></view>
			<view class="item_btm_btm">usdt</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NodeItem",
		props:{
			index:0,
			activeIndex:0,
			my:null
		},
		created() {
			console.log(this.my);
		},
		computed: {
			getImg() {
				if(this.my === 1) {
					return "../../../../../static/img/node/v"+(this.index+1) + ".png"
				}else if(this.my === 2) {
					return "../../../../../static/img/node/v"+(this.index+this.my) + ".png"
				}else if(this.my === 3) {
					return "../../../../../static/img/node/v3.png"
				}
			}
		}
	}
</script>

<style scoped>
	.item {
		width: 30%;
		height: 150px;
	}
	.item_top {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item_btm_top>image {
		width: 60px;
		height: 30px;
	}
	.item_btm{
		border-radius: 15px;
		width: 100%;
		height: 100px;
		text-align: center;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-content: center;
	}
	.item_btm_top {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size:25px;
	}
	.item_btm_btm {
		width: 100%;
		height: 20px;
		line-height:20px;
		font-size: 16px;
	}
	.active {
		background: linear-gradient(to bottom,#00A3AD,#0067A2);
		color: #FFFEFE;
	}
</style>
