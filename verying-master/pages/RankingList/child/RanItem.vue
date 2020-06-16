<template>
	<view class="item">
		<view>{{list.nickname}}</view>
		<view>{{list.mobile}}</view>
		<view class="img">
			<image v-if="getImg != null" :src="getImg"></image>
			<span v-else-if="getImg === null">{{index+1}}</span>
		</view>
	</view>
</template>

<script>
	export default {
		name:"RanItem",
		props: {
			list:null,
			index:0
		},
		data() {
			return {
				img:''
			}
		},
		created() {
			console.log(this.list);
		},
		methods: {
			
		},
		computed: {
			getImg(){
				if(this.index === 0) {
					return "../../../../../static/img/ranl/top1.png"
				}else if(this.index === 1) {
					return "../../../../../static/img/ranl/top2.png"
				}else if(this.index === 2) {
					return "../../../../../static/img/ranl/top3.png"
				}else {
					return null;
				}
			}
		}
	}
</script>

<style scoped>
	.item {
		width: 100%;
		height: 50px;
		line-height: 50px;
		display: flex;
		font-size: 14px;
		text-align: center;
		border-bottom: 1px solid #E6E6E6;
	}
	.item>view {
		width: 33%;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.img {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.img>image {
		width: 16px;
		height: 16px;
	}
</style>
