<template>
	<!-- 格子 -->
	<view class="lattice">
		<view v-for="(item,index) in list" :key="index" class="item" @click="toJump(item.url)">
			<view class="item-img">
				<image :src="item.value"></image>
			</view>
			
			<view class="item-text">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"lattice",
		data() {
			return {
				list:[
					{
						name:"合约中心",
						value:"../../../../../static/img/home/contract.png",
						url:'../../../../contract/contract'
					},
					{
						name:"商城",
						value:"../../../../../static/img/home/shop.png",
						url:"shop"
					},
					{
						name:"ICO众筹",
						value:"../../../../../static/img/home/ICO.png",
						url:"../../../../IdentifyChips/IdentifyChips"
					},
					{
						name:"便民中心",
						value:"../../../../../static/img/home/convenience.png",
						url:'../../../../TellCost/TellCost'
					}
				]
			}
		},
		methods: {
			toJump(url) {
				if(url === "../../../../contract/contract") {
					uni.switchTab({
						url:url
					})
					return;
				}else if(url === "../../../../TellCost/TellCost") {
					uni.showToast({
						title:"未开放",
						icon:"none"
					})
					return;
				}else if(url === "../../../../IdentifyChips/IdentifyChips") {
					/* uni.showToast({
						title:"未开放",
						icon:"none"
					})
					return; */
					uni.navigateTo({
						url:url
					})
				}else if(url === "shop") {
					plus.runtime.openURL("http://shop.oszgs.top/mobile/")
					return;
				}else if(url === "") {
					uni.showToast({
						title:"未开放",
						icon:"none"
					})
					return;
				}
				
			}
		}
	}
</script>

<style scoped>
	.lattice {
		width: 95%;
		height: 80px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item{
		width: 22%;
		height: 65px;
	}
	.item-img {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-img>image {
		width: 40px;
		height: 40px;
	}
	.item-text {
		width: 100%;
		height: 25px;
		text-align: center;
		font-size: 15px;
	}
</style>
